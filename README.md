# Trim Trello - Chrome Extension

A Chrome browser extension for hiding unwanted elements in Trello web pages.

## Features

- 🎯 **Predefined Element Hiding**: Supports hiding common Trello elements such as top navigation bar, sidebar, Power-ups, etc.
- 🔧 **Custom Selectors**: Supports adding custom CSS selectors to hide specific elements
- 💾 **Persistent Settings**: Uses Chrome Storage API to save user settings
- 🔄 **Dynamic Content Support**: Automatically detects and hides dynamically loaded new elements
- 🎨 **Beautiful Interface**: Modern user interface design

## Installation

### Method 1: Install from the Chrome Web Store (Recommended)

1. Go to the Chrome Web Store link []() and press "Add to Chrome".

By installing it this way, you are supporting me and it keeps this project running. 

### Method 2: Developer Mode Installation

1. Download or clone this project to your local machine
2. Open Chrome browser and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked extension"
5. Select the project folder
6. Extension installation complete!

### Method 3: Packaged Installation

1. In developer mode, click "Pack extension"
2. Select the project folder
3. Generate .crx file
4. Drag and drop the .crx file to the extensions page to install

## Usage

1. After installing the extension, click the extension icon in the browser toolbar on Trello web pages
2. In the popup configuration interface, select elements to hide:
   - **Common Elements**: Check the predefined elements you want to hide
3. Click "Save Settings" button
4. Settings will take effect immediately, and selected elements will be hidden

## Predefined Elements

The extension predefines the following Trello elements:

- **Island Nav**: island-nav element in the page (div with id island-nav)
- **something else**: 

## Troubleshooting

### Extension not working?

1. Confirm the extension is properly installed and enabled
2. Check if you're on a Trello website
3. Check browser console for error messages
4. Try refreshing the page

### Elements not hidden?

1. Confirm the selector is correct
2. Check if elements appear after page load
3. Try adding more specific selectors

### Other Problems?
Please contact alantao.dev@gmail.com by email. 

## Development Notes

This is an open source project, contributions and improvement suggestions are welcome.

### Development Environment Setup

1. Clone the project
2. Load the extension in Chrome
3. After modifying code, click "Reload" on the extensions page
4. Refresh Trello page to test effects

## License

MIT License
