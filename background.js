chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("Hacky times!");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({})
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// don't need if declaratively injecting content script
chrome.runtime.onMessage.addListener(
  function(message) { //sender, callback) {
    console.log(`background: ${JSON.stringify(message)}`);
    // sender example: {"id":"hligmjmffggjjpbnilddcnmmpecgpglc","url":"chrome-extension://hligmjmffggjjpbnilddcnmmpecgpglc/index.html","origin":"chrome-extension://hligmjmffggjjpbnilddcnmmpecgpglc"}
    if (message.event == 'parsePage'){
      chrome.tabs.executeScript({
        file: 'contentScript.js'
      });
    }
 }
);
