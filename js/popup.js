import { playerPlay, playerPause, playerResume } from './spotify-controller.js';


const btnResume = document.getElementById('resume-btn');
const btnPause = document.getElementById('pause-btn');
const btnQueue = document.getElementById('queue-btn');

btnPause.onclick = async function (e) {
  console.log('pause');
  playerPause();
};

btnResume.onclick = function (e) {
  console.log('resume');
  playerResume();
};

btnQueue.onclick = function (e) {
  console.log('queue');
  const songs = [
      {name: 'love me or leave me', artist: 'day6'},
      {name: 'tick tock', artist: 'day6'},
      {name: 'zombie', artist: 'day6'},
      {name: 'you were beautiful', artist: 'day6'},
  ]
  playerPlay(songs);
};

const btnGenerate = document.getElementById("generatePlaylist");
btnGenerate.addEventListener("click", function() {
  let payload = {
    event: 'parsePage'
  }
  chrome.runtime.sendMessage(payload);
  
  // code use with declaratively injecting content script
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, payload);
  // })
}, false);