import { getAccessToken, getDevices, play, pause, search, resume, getStatus } from './spotify.js';

export async function isPlayerOpen() {
    const token = await getAccessToken();
    const device = await getDevices(token.accessToken);

    return !!device;
}

export async function isPlayerPlaying() {
    const token = await getAccessToken();
    return await getStatus(token.accessToken);
    
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
