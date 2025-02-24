// Function to get the current time
function getCurrentTime() {
  return Date.now();
}

// Set or retrieve the start time
chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started. Resetting timer.");
  const startTime = getCurrentTime();
  chrome.storage.local.set({ startTime: startTime });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Setting start time.");
  const startTime = getCurrentTime();
  chrome.storage.local.set({ startTime: startTime });
});

// Handle messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getElapsedTime") {
    chrome.storage.local.get(['startTime'], (result) => {
      const currentTime = getCurrentTime();
      const elapsedTime = currentTime - (result.startTime || currentTime);
      sendResponse({ elapsedTime: elapsedTime });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});