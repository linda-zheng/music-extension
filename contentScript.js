function parsePage() {
  console.log('run script');
  document.body.style.backgroundColor="orange";
}

parsePage()

// code for declaratively injecting content script
// console.log('injected contentScript');
// chrome.runtime.onMessage.addListener(
//   function(message, sender, callback) {
//     console.log(`contentScript: ${JSON.stringify(message)}, ${JSON.stringify(sender)}, ${JSON.stringify(callback)}`);
//     // example sender: {"id":"hligmjmffggjjpbnilddcnmmpecgpglc","origin":"null"}
//     if (message.event == 'parsePage'){
//       parsePage();
//     }
//  }
// );

// add this to manifest.json
// "content_scripts": [
//   {
//     "matches": ["*://*/*"],
//     "run_at": "document_end",
//     "js": ["contentScript.js"]
//   }
// ],
// and swap activeTab to tabs in the permissions
