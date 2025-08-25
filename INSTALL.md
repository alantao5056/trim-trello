# Trim Trello Extension Installation Guide

## Quick Installation Steps

### 1. Download Extension Files
Make sure you have downloaded the complete extension folder containing the following files:
- `manifest.json`
- `popup.html`
- `popup.js`
- `content.js`
- `background.js`
- `icons/` folder
- `README.md`

### 2. Open Chrome Extensions Page
In Chrome browser address bar, enter: `chrome://extensions/`

### 3. Enable Developer Mode
Find the "Developer mode" toggle in the top right corner and click to enable

### 4. Load Extension
Click "Load unpacked extension" button and select the folder containing the extension files

### 5. Confirm Installation
If installation is successful, you will see the "Trim Trello" extension appear in the extensions list

## Detailed Installation Instructions

### System Requirements
- Google Chrome 88.0 or higher
- Chrome version that supports Manifest V3

### Pre-Installation Check
1. Confirm Chrome browser version
2. Confirm extension file integrity
3. Close all Trello-related tabs

### Post-Installation Configuration
1. After the extension is installed, the extension icon will appear in the Chrome toolbar
2. Visit [Trello](https://trello.com) website
3. Click the extension icon to open the configuration interface
4. Select the Island Nav element to hide and save settings

## Common Problem Solutions

### Problem 1: Extension Cannot Load
**Symptoms**: Error occurs after clicking "Load unpacked extension"
**Solutions**:
- Check if files are complete
- Confirm folder structure is correct
- Restart Chrome browser

### Problem 2: Extension Icon Not Displayed
**Symptoms**: Extension is installed but no icon in toolbar
**Solutions**:
- Click the extensions icon in Chrome toolbar
- Find "Trim Trello" and click the pin icon
- Or restart Chrome browser

### Problem 3: Extension Not Working on Trello
**Symptoms**: Extension is installed but cannot hide elements
**Solutions**:
- Confirm you're on the correct Trello page
- Refresh the page
- Check browser console for error messages
- Reconfigure extension settings

### Problem 4: Settings Cannot Save
**Symptoms**: Settings don't take effect after configuration
**Solutions**:
- Check Chrome storage permissions
- Try reinstalling the extension
- Clear browser cache

## Uninstall Extension

### Method 1: Through Extensions Page
1. Visit `chrome://extensions/`
2. Find "Trim Trello" extension
3. Click "Remove" button

### Method 2: Through Extension Icon
1. Right-click the extension icon
2. Select "Remove from Chrome..."

## Update Extension

### Manual Update
1. Download new version extension files
2. Click "Reload" on the extensions page
3. Or uninstall first then reinstall

### Auto Update
Currently the extension doesn't support auto-update, manual update is required

## Technical Support

If you encounter other issues, you can:
1. Check the README.md file
2. Check browser console error messages
3. Confirm Chrome version compatibility
4. Reinstall the extension

## Security Notes

- The extension only runs on Trello websites
- Does not collect or transmit user data
- All settings are saved in local Chrome storage
- Extension code is completely open source and auditable
