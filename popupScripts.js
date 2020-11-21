var button = document.getElementById("generatePlaylist");
button.addEventListener("click", function() {
  let payload = {
    event: 'parsePage'
  }
  chrome.runtime.sendMessage(payload);
  
  // code use with declaratively injecting content script
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, payload);
  // })
}, false);

import { play, pause, getAccessToken, getDevices } from './js/spotify.js';

const WEB_PLAYER_URL = 'https://open.spotify.com';
const END_POINT = 'https://api.spotify.com';
const VALID_DEVICE_TYPES = ['Computer'];

const btnPlay = document.getElementById('play-btn');
const btnPause = document.getElementById('pause-btn');


btnPause.onclick = async function (e) {
    console.log('hi')
    let token = await getAccessToken();
    console.log(token)
    let device = await getDevices(token.accessToken);
    console.log(device)
    pause(device.id, token.accessToken);
};

btnPlay.onclick = function (e) {
    //
};