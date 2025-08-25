# Icons for Trim Trello Chrome Extension

## Current Status
The icons folder currently contains placeholder files for the required PNG icons. To make the extension work properly, you need to create actual PNG icon files.

## Required Icon Files
- `icon16.png` - 16x16 pixels (for toolbar icon)
- `icon48.png` - 48x48 pixels (for extension management page)
- `icon128.png` - 128x128 pixels (for Chrome Web Store and installation)

## How to Generate PNG Icons

### Option 1: Online SVG to PNG Converters
1. Use online tools like:
   - [Convertio](https://convertio.co/svg-png/)
   - [CloudConvert](https://cloudconvert.com/svg-to-png)
   - [SVG to PNG](https://svgtopng.com/)

2. Upload the `icon.svg` file
3. Set the desired dimensions (16x16, 48x48, 128x128)
4. Download the converted PNG files
5. Replace the placeholder files with the actual PNG files

### Option 2: Image Editing Software
1. Open `icon.svg` in software like:
   - Adobe Illustrator
   - Inkscape (free)
   - GIMP (free)
   - Photoshop

2. Export/Save as PNG with the required dimensions
3. Ensure the background is transparent or matches your design

### Option 3: Command Line Tools (for developers)
If you have ImageMagick installed:
```bash
# Convert SVG to different PNG sizes
magick convert icon.svg -resize 16x16 icon16.png
magick convert icon.svg -resize 48x48 icon48.png
magick convert icon.svg -resize 128x128 icon128.png
```

## Icon Design Guidelines
- Keep the design simple and recognizable at small sizes
- Ensure good contrast for visibility
- Test how the icon looks in the Chrome toolbar
- The icon should represent the extension's purpose (trimming/hiding elements)

## Current SVG Icon
The `icon.svg` file contains a scissors design with "TT" text, representing "Trim Trello". This design should work well when converted to the required PNG sizes.

## After Creating PNG Icons
1. Replace the placeholder files with actual PNG files
2. Ensure the file names match exactly: `icon16.png`, `icon48.png`, `icon128.png`
3. Test the extension to make sure the icons display correctly
4. The extension should now load without icon-related errors
