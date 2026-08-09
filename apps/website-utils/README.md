# Website Utils

A small suite of client-side browser tools, each a self-contained static HTML page (no build step). These are ports of the four tools from the v0.dev "Website Utils" app (deployed on Vercel at `https://v0-website-utils.vercel.app`), rebuilt so everything runs statically on GitHub Pages with behavior equivalent to the originals.

## Tools

| Page | Tool | How it works |
|---|---|---|
| `index.html` | Landing page | Links to the four tools below. |
| `tool1.html` | **Image Collage Creator** | Paste or drop in images, arrange them, choose a Horizontal/Vertical layout, then generate a downloadable/copyable PNG collage. Runs entirely in the browser. |
| `tool2.html` | **Video to GIF Converter** | Convert a video to an animated GIF in-browser using FFmpeg WASM (loaded from unpkg CDN). Choose frame rate, width, start time, and duration. |
| `tool3.html` | **Log Sanitizer** | Paste terminal logs and scrub PII/secrets with 37 built-in regex patterns plus custom rules, whole-word/case toggles, a line-diff view, and localStorage persistence. 100% client-side. |
| `tool4.html` | **MMS Image Resizer** | Paste, drag/drop, or browse an image, pick a size target under 1 MB, and downscale in-browser so it fits carrier MMS attachment limits. Copy to clipboard, download as JPG, or send via mailto/sms links. |

## How to serve

Open `index.html` in a browser, or serve the folder with e.g. `npx serve .`. No build tooling or package installs required.

### tool2 (Video to GIF) dependency

`tool2.html` loads `@ffmpeg/ffmpeg` and `@ffmpeg/core` from the unpkg CDN at runtime. It needs network access for that one load; the rest of the conversion runs entirely in the browser via WebAssembly.

## Files

- `index.html` — landing page linking the four tools.
- `tool1.html`, `tool2.html`, `tool3.html`, `tool4.html` — each tool in a single file (UI, CSS, and logic together).
- `metadata.json` — simple metadata for the tools suite.

## License

MIT. See the repository root `LICENSE`.