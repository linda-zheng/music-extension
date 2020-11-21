import { play, pause, getAccessToken, getDevices } from './spotify.js';

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