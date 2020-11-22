const WEB_PLAYER_URL = 'https://open.spotify.com';
const END_POINT = 'https://api.spotify.com';
const VALID_DEVICE_TYPES = ['Computer'];


export async function getDevices(accessToken) {
    try {
      const url = `${END_POINT}/v1/me/player/devices`;
  
      const res = await fetch(url, {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await res.json();
  
      const devices = data.devices
        ? data.devices
            .filter((item) => VALID_DEVICE_TYPES.indexOf(item.type) > -1)
            .map((item) => {
              return {
                id: item.id,
                isActive: item.is_active,
                isRestricted: item.is_restricted,
                name: item.name,
                type: item.type,
                volumePercent: item.volume_percent,
              };
            })
        : [];
  
      return devices[0];
    } catch (e) {
      return;
    }
}

export async function getAccessToken(scope='user-modify-playback-state') {
    let token = {
      clientId: null,
      accessToken: null,
      accessTokenExpirationTimestampMs: null,
      isAnonymous: null,
    };
    //user-modify-playback-state for play and pause
    
    try {
      const url = `${WEB_PLAYER_URL}/get_access_token?q=scope:user-modify-playback-state`;
      const res = await fetch(url);
      token = await res.json();
    } catch {}
  
    return token;
}

export async function getStatus(accessToken) {
  const url = `${END_POINT}/v1/me/player`;

  try {
      const res = await fetch(url, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
      });
      const data = await res.json();
      return data.is_playing;
  } catch (e) {
      throw e;
  }
}

export async function getCurrentSong(accessToken) {
  const url = `${END_POINT}/v1/me/player/currently-playing`;

  try {
      const res = await fetch(url, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
      });
      const data = await res.json();
      return {
        is_playing: data.is_playing,
        song: data.item.name,
        artist: data.item.artists[0].name,
        image: data.item.album.images[2].url
      }
  } catch (e) {
      throw e;
  }
}

export async function pause(deviceId, accessToken) {
    const url = `${END_POINT}/v1/me/player/pause?device_id=${deviceId}`;

    try {
        const result = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        return result;
    } catch (e) {
        throw e;
    }
}

export async function search(track, artist, accessToken) {
    let encoded_track = encodeURIComponent(track)
    let encoded_artist = encodeURIComponent(artist)
    const url = `${END_POINT}/v1/search?q=track:${encoded_track}%20artist:${encoded_artist}&type=track&limit=1`;

    try {
        const result = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        
        const result_json = await result.json();
        console.log(result_json)
        if (result_json.tracks.items.length == 0) {
            return null;
        } else {
            return result_json.tracks.items[0].uri;
        }
    } catch (e) {
        throw e;
    }
}

export async function queue(uri, deviceId, accessToken) {
    const url = `${END_POINT}/v1/me/player/queue?uri=${uri}&device_id=${deviceId}`;
    
    if (uri.length == 0) {
      return;
    }

    try {
        const result = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        return result;
    } catch (e) {
        throw e;
    }
}

export async function play(songURIs, deviceId, accessToken) {
    const url = `${END_POINT}/v1/me/player/play?device_id=${deviceId}`;

    const postData = {
        uris: songURIs
    };

    try {
        return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        });
    } catch (e) {
        throw e;
    }
}

export async function resume(deviceId, accessToken) {
    const url = `${END_POINT}/v1/me/player/play?device_id=${deviceId}`;

    try {
        return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        });
    } catch (e) {
        throw e;
    }
}
