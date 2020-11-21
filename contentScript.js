function parsePage() {
  console.log('run script');
  const pElements = document.querySelectorAll('p');
  const textArray = Array.from(pElements)
    .flatMap(
      p => p.textContent.split(/(?:\s|\[.*?\]|\.|!|\?)+/).filter(s => s !== "")
    );
  console.log(textArray)
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
