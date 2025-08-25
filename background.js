// Plugin initialization when installed
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    // First installation, set default configuration
    chrome.storage.sync.set({
      hiddenElements: {
        islandNav: false
      },
      customSelectors: []
    });
    
    console.log('Trim Trello plugin installed and initialized');
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSettings') {
    // Get settings
    chrome.storage.sync.get(['hiddenElements', 'customSelectors'], function(result) {
      sendResponse(result);
    });
    return true; // Keep message channel open
  }
});

// When tab updates, check if content script injection is needed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('trello.com')) {
    // Delay a bit to ensure page is fully loaded
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, {action: 'pageLoaded'}).catch(() => {
        // If message sending fails, it means content script hasn't loaded yet, which is normal
      });
    }, 1000);
  }
});

// When plugin icon is clicked
chrome.action.onClicked.addListener(function(tab) {
  if (tab.url && tab.url.includes('trello.com')) {
    // On Trello page, open popup
    // No need to do anything here as popup will open automatically
  } else {
    // Not on Trello page, show prompt
    chrome.tabs.create({
      url: 'https://trello.com'
    });
  }
});
