import { getAccessToken, getDevices, play, pause, search, resume } from './spotify.js';

export async function isPlayerOpen() {
    let token = await getAccessToken();
    let device = await getDevices(token.accessToken);
<<<<<<< HEAD
    if (device) {
        return true;
    }
    return false;
=======

    return !!device;
>>>>>>> a84ab1b183bf3c05a333499470213127722b02a5
}

export async function playerPause() {
    const token = await getAccessToken();
    const device = await getDevices(token.accessToken);
    await pause(device.id, token.accessToken);
}

export async function playerPlay(songs) {
    const token = await getAccessToken();
    const device = await getDevices(token.accessToken);
    let URIs = []
    for (const song of songs) {
        console.log(song)
        const uri = await search(song.name, song.artist, token.accessToken);
        if (uri != null) {
            console.log(uri)
            URIs.push(uri);
        }
    }
    await play(URIs, device.id, token.accessToken);
}

export async function playerResume(songs) {
    const token = await getAccessToken();
    const device = await getDevices(token.accessToken);
    await resume(device.id, token.accessToken);
}
