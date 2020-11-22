import { isPlayerOpen, playerPlay, playerPause, playerResume, isPlayerPlaying, playerCurrentSong, playerPrev, playerNext } from './spotify-controller.js';

const alert = document.getElementById('open-player-notif');

// do not show alert at first
alert.style.display = 'none';

isPlayerOpen().then((isOpen) => {
  alert.style.display = isOpen ? 'none' : '';
})

const btnResume = document.getElementById('resume-btn');
const btnPause = document.getElementById('pause-btn');
const btnQueue = document.getElementById('queue-btn');

const btnPrev = document.getElementById('prev-btn');
const btnNext = document.getElementById('next-btn');

const playerSongName = document.getElementById('player-song-name');
const playerArtistName = document.getElementById('player-artist-name');
const playerSongImage = document.getElementById('player-song-image');

async function updateCurrentSong() {
  const currentSong = await playerCurrentSong();
  console.log(currentSong);
  playerSongName.innerHTML = currentSong.song;
  playerArtistName.innerHTML = currentSong.artist;
  playerSongImage.src = currentSong.image;
}

btnPause.onclick = async function (e) {
  console.log('pause');
  await playerPause();
};

btnResume.onclick = async function (e) {
  console.log('resume');
  await playerResume();
  await updateCurrentSong();
};

btnQueue.onclick = async function (e) {
  console.log('queue');
  const songs = [
      {name: 'love me or leave me', artist: 'day6'},
      {name: 'tick tock', artist: 'day6'},
      {name: 'zombie', artist: 'day6'},
      {name: 'you were beautiful', artist: 'day6'},
  ]
  await playerPlay(songs);
  await updateCurrentSong();
};


btnPrev.onclick = async function (e) {
  console.log('prev');
  await playerPrev();
  await updateCurrentSong();
};


btnNext.onclick = async function (e) {
  console.log('next');
  await playerNext();
  await updateCurrentSong();
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