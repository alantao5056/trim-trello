// Predefined Trello element selector mapping
const ELEMENT_SELECTORS = {
  islandNav: [
    '#island-nav'
  ],
  cardNav: [
    'div[data-focus-lock="cardback"] > div > div > div > nav'
  ]
};

// Initialize
function initializeContentScript() {
  console.log('Trim Trello: Content script initializing...');
  
  // Apply settings immediately and set up observer
  loadAndApplySettings();
  setupMutationObserver();
  
  console.log('Trim Trello: Content script initialized successfully');
}

// Try multiple event listeners for maximum compatibility
document.addEventListener('DOMContentLoaded', initializeContentScript);
document.addEventListener('load', initializeContentScript);

// Also try immediate execution as fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContentScript);
} else {
  // DOM is already ready, initialize immediately
  initializeContentScript();
}

// Setup MutationObserver to watch for new elements
function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node matches any of our selectors
            checkAndHideElement(node);
            // Also check child elements
            if (node.querySelectorAll) {
              node.querySelectorAll('*').forEach(child => {
                checkAndHideElement(child);
              });
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Check and hide element if it matches our selectors
function checkAndHideElement(element) {
  // Get current settings to check what should be hidden
  chrome.storage.sync.get(['hiddenElements'], function(result) {
    const hiddenElements = result.hiddenElements || {};
    
    // Check predefined selectors
    Object.keys(ELEMENT_SELECTORS).forEach(key => {
      if (hiddenElements[key]) { // Only hide if user has selected this element
        ELEMENT_SELECTORS[key].forEach(selector => {
          if (element.matches && element.matches(selector)) {
            hideElement(element);
          }
        });
      }
    });
  });
}

// Load and apply settings
function loadAndApplySettings() {
  console.log('Trim Trello: Loading settings...');
  chrome.storage.sync.get(['hiddenElements', 'customSelectors'], function(result) {
    console.log('Trim Trello: Settings loaded:', result);
    if (result.hiddenElements || result.customSelectors) {
      applySettings(result.hiddenElements || {}, result.customSelectors || []);
    } else {
      console.log('Trim Trello: No settings found, using defaults');
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'applySettings') {
    applySettings(request.hiddenElements, request.customSelectors);
    sendResponse({success: true});
  }
});

// Apply settings
function applySettings(hiddenElements, customSelectors) {
  // First, show all predefined elements
  Object.keys(ELEMENT_SELECTORS).forEach(key => {
    ELEMENT_SELECTORS[key].forEach(selector => {
      showElementsBySelector(selector);
    });
  });
  
  // Then hide only the elements that should be hidden
  Object.keys(hiddenElements).forEach(key => {
    if (hiddenElements[key] && ELEMENT_SELECTORS[key]) {
      hideElementsBySelectors(ELEMENT_SELECTORS[key]);
    }
  });
  
  // Hide custom selector elements
  customSelectors.forEach(selector => {
    hideElementsBySelector(selector);
  });
}

// Hide elements by selector array
function hideElementsBySelectors(selectors) {
  selectors.forEach(selector => {
    hideElementsBySelector(selector);
  });
}

// Hide elements by single selector
function hideElementsBySelector(selector) {
  try {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      hideElement(element);
    });
  } catch (error) {
    console.warn(`Trim Trello: Cannot apply selector ${selector}:`, error);
  }
}

// Show elements by single selector
function showElementsBySelector(selector) {
  try {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      showElement(element);
    });
  } catch (error) {
    console.warn(`Trim Trello: Cannot apply selector ${selector}:`, error);
  }
}

// Hide single element
function hideElement(element) {
  if (!element) {
    return;
  }
  
  // Hide element
  element.style.display = 'none';
}

// Show single element
function showElement(element) {
  if (!element) {
    return;
  }
  
  // Show element by removing display:none
  element.style.display = '';
}
