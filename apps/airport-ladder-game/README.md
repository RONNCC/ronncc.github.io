# Airport Ladder Game

Find paths between major airports where each step changes only one letter in the airport's three-letter IATA code (a word-ladder twist on airport connections).

A self-contained static port of the Next.js app originally built with [v0.dev](https://v0.dev) (deployed on Vercel), rebuilt as a single HTML file so it can run statically on GitHub Pages.

## How it works

1. Search and select a **start** airport and an **end** airport (by IATA code, name, or city).
2. Click **Find Path**.
3. The path finder builds an undirected graph over all large airports, connecting any two airports whose codes differ by exactly one letter, then runs a **breadth-first search** to find the shortest route.
4. The world map draws the route (with letter-change breakdown) and auto-focuses on it.

## Rule

You can travel between airports only if their three-letter codes differ by **exactly one letter** (e.g. `LAX → LAS`). Multiple-letter differences (e.g. `LAX → SFO`) are invalid.

## Files

- `index.html` — the entire app (UI, CSS, logic, and BFS engine) in one file.

## Data & dependencies (loaded at runtime)

- Airports dataset: [ourairports-data/airports.csv](https://davidmegginson.github.io/ourairports-data/airports.csv) (the same source the original uses), filtered to `large_airport` type with a 3-letter IATA code.
- World map geometry: [`world-atlas@2/countries-110m.json`](https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json).
- Libraries: [d3](https://d3js.org), [topojson-client](https://github.com/topojson/topojson-client), and [Tailwind CSS (Play CDN)](https://tailwindcss.com/docs/installation/play-cdn).

## Local usage

Open `index.html` in a browser (or serve the folder with e.g. `npx serve .`). It requires network access for the airports and map data.

## License

MIT. See the repository root `LICENSE`.