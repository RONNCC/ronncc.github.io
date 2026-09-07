# Snoopy deck artwork

These are real Peanuts illustrations, animation frames, and credited photographs,
not generated lookalikes. `sources.json` records the source page, original URL,
retrieved dimensions, and shipped dimensions for every image.

- Character drawings: Peanuts Worldwide, via the official Peanuts site and Peanuts Wiki.
- Molly and Rover: separate labeled frames from *Snoopy’s Reunion* (1991), via Peanuts Wiki.
- Doghouse illustration: Peanuts Worldwide / Charles M. Schulz Museum.
- Charles Schulz photo: Ben Margot / AP Images, via Encyclopaedia Britannica.
- Artemis I photo: NASA, via Space.com / collectSPACE.com.

Third-party images retain their owners’ copyrights. They are included for
educational commentary about the characters and their history. The repository’s
code license is **not** a license to the Peanuts artwork or these photographs.

## Preparing images

Only empty white margins were trimmed from character drawings. The full drawings
(including feet, hats, and other distinguishing features) are preserved. No image
was upscaled; white padding does not add source detail. Illustrations use lossless
WebP. Photographs and TV frames use WebP at quality 90.

The deck uses `object-fit: contain`, opaque white art surfaces, explicit image
sizes, and a keyboard/touch-accessible viewer. Small originals are not used as
wide cover-cropped banners. Source links are available in the viewer and in each
slide’s Notes & sources.

The optional maintenance tool `python scripts/snoopy-qa/refresh-assets.py` fetches
originals from the recorded URLs (requires Pillow). Source sites can change, so
inspect all refreshed artwork, update the recorded dimensions, and rerun the
browser checks before publishing. Assets are not downloaded at runtime.
