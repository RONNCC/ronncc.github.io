import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { networkGate } from './network-gate.mjs';

function through(proxy, target) {
  return new Promise((resolve, reject) => {
    const request = http.get(proxy, { path: target }, response => {
      let text = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { text += chunk; });
      response.on('end', () => resolve(text));
      response.on('error', reject);
    });
    request.on('error', reject);
  });
}

test('network gate forwards only the audited origin, then disconnects it', async () => {
  const origin = http.createServer((request, response) => response.end('real origin response'));
  await new Promise(resolve => origin.listen(0, '0.0.0.0', resolve));
  const url = `http://127.0.0.1:${origin.address().port}/civilizations/index.html`;
  const gate = await networkGate(url);
  try {
    assert.equal(await through(gate.url, url), 'real origin response');
    await assert.rejects(through(gate.url, 'http://example.invalid/not-the-audited-origin'));
    gate.disconnect();
    await assert.rejects(through(gate.url, url));
  } finally {
    await gate.close();
    await new Promise(resolve => origin.close(resolve));
  }
});
