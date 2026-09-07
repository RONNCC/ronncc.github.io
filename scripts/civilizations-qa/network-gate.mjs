import http from 'node:http';
import https from 'node:https';
import net from 'node:net';

// A real network disconnect, not browser request interception or WebKit's
// virtual offline flag (which can reject navigation before consulting a worker).
// Forward only the audited origin. HTTPS is an opaque CONNECT tunnel: no TLS
// interception, custom certificate, response rewriting, or open proxy.
export async function networkGate(origin) {
  const target = new URL(origin);
  const authority = `${target.hostname}:${target.port || (target.protocol === 'https:' ? 443 : 80)}`;
  const sockets = new Set();
  let online = true, closing;
  const track = socket => {
    sockets.add(socket);
    socket.on('error', () => {});
    socket.once('close', () => sockets.delete(socket));
    return socket;
  };
  const server = http.createServer((request, response) => {
    let url;
    try { url = new URL(request.url); } catch { request.socket.destroy(); return; }
    if (!online || url.origin !== target.origin) { request.socket.destroy(); return; }
    const forward = (url.protocol === 'https:' ? https : http).request(url, {
      method: request.method,
      headers: { ...request.headers, host: url.host }
    }, incoming => {
      response.writeHead(incoming.statusCode, incoming.headers);
      incoming.on('error', () => response.destroy());
      incoming.pipe(response);
    });
    forward.on('socket', track);
    forward.on('error', () => response.destroy());
    request.on('error', () => forward.destroy());
    request.pipe(forward);
  });
  server.on('connection', track);
  server.on('connect', (request, client, head) => {
    if (!online || target.protocol !== 'https:' || request.url !== authority) { client.destroy(); return; }
    const upstream = track(net.connect(Number(target.port || 443), target.hostname));
    upstream.once('connect', () => {
      if (!online) { client.destroy(); upstream.destroy(); return; }
      client.write('HTTP/1.1 200 Connection Established\r\n\r\n');
      if (head.length) upstream.write(head);
      client.pipe(upstream).pipe(client);
    });
    upstream.once('error', () => client.destroy());
    client.once('close', () => upstream.destroy());
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '0.0.0.0', resolve);
  });
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    disconnect() {
      online = false;
      for (const socket of sockets) socket.destroy();
    },
    close() {
      this.disconnect();
      return closing ||= new Promise(resolve => server.close(resolve));
    }
  };
}
