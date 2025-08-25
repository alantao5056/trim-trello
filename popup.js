// Predefined Trello element selector mapping
const ELEMENT_SELECTORS = {
  islandNav: [
    '#island-nav'
  ],
  cardNav: [
    'div[data-focus-lock="cardback"] > div > div > div > nav'
  ]
};

// Initialize popup interface
// Use both DOMContentLoaded and immediate execution for reliability
function initializePopup() {
  console.log('Trim Trello: Popup initializing...');
  loadSettings();
  setupEventListeners();
  console.log('Trim Trello: Popup initialized successfully');
}

// Try multiple event listeners for maximum compatibility
document.addEventListener('DOMContentLoaded', initializePopup);
document.addEventListener('load', initializePopup);

// Also try immediate execution as fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePopup);
} else {
  // DOM is already ready, initialize immediately
  initializePopup();
}

// Setup event listeners
function setupEventListeners() {
  // Save button
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  
  // Add custom selector button
  document.getElementById('addSelector').addEventListener('click', addCustomSelector);
  
  // Custom selector input field enter key
  document.getElementById('customSelector').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addCustomSelector();
    }
  });
}

// Load settings
function loadSettings() {
  chrome.storage.sync.get(['hiddenElements', 'customSelectors'], function(result) {
    // Load predefined element settings
    if (result.hiddenElements) {
      Object.keys(result.hiddenElements).forEach(key => {
        const checkbox = document.getElementById(key);
        if (checkbox) {
          checkbox.checked = result.hiddenElements[key];
        }
      });
    }
    
    // Load custom selectors
    if (result.customSelectors) {
      result.customSelectors.forEach(selector => {
        addCustomSelectorToList(selector);
      });
    }
  });
}

// Save settings
function saveSettings() {
  const hiddenElements = {};
  
  // Initialize all predefined elements as false (not hidden)
  Object.keys(ELEMENT_SELECTORS).forEach(key => {
    hiddenElements[key] = false;
  });
  
  // Update with actual checkbox states
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if (checkbox.id && checkbox.id !== 'customSelector') {
      hiddenElements[checkbox.id] = checkbox.checked;
    }
  });
  
  // Collect custom selectors
  const customSelectors = [];
  const customSelectorItems = document.querySelectorAll('.custom-selector-item span');
  customSelectorItems.forEach(item => {
    customSelectors.push(item.textContent);
  });
  
  // Save to Chrome storage
  chrome.storage.sync.set({
    hiddenElements: hiddenElements,
    customSelectors: customSelectors
  }, function() {
    showStatus('Settings saved!', 'success');
    
    // Notify current tab to apply settings
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('trello.com')) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applySettings',
          hiddenElements: hiddenElements,
          customSelectors: customSelectors
        });
      }
    });
  });
}

// Add custom selector
function addCustomSelector() {
  const input = document.getElementById('customSelector');
  const selector = input.value.trim();
  
  if (!selector) {
    showStatus('Please enter a valid CSS selector', 'error');
    return;
  }
  
  // Validate if selector is valid
  try {
    document.querySelector(selector);
  } catch (e) {
    showStatus('Invalid CSS selector', 'error');
    return;
  }
  
  addCustomSelectorToList(selector);
  input.value = '';
  showStatus('Selector added', 'success');
}

// Add custom selector to list
function addCustomSelectorToList(selector) {
  const list = document.getElementById('customSelectorsList');
  const item = document.createElement('div');
  item.className = 'custom-selector-item';
  
  const span = document.createElement('span');
  span.textContent = selector;
  
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', function() {
    item.remove();
  });
  
  item.appendChild(span);
  item.appendChild(removeBtn);
  list.appendChild(item);
}

// Show status message
function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';
  
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}
