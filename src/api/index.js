/* eslint-disable comma-dangle */
import axios from 'axios';

const API_HOST = 'https://api.vibbidi.net';

export function searchAlbums(albumTitle, artistName) {
    return axios.get(`${API_HOST}/api/v6/narratives`, {
        params: {
            album_title: albumTitle,
            artist_name: artistName,
        },
    });
}

export function getAlbumNarratives(albumUuid) {
    return axios.get(`${API_HOST}/api/v6/narratives/album/${albumUuid}`);
}

export function getNarrativeDetail(narrativeUuid) {
    return axios.get(`${API_HOST}/api/v6/narratives/${narrativeUuid}`);
}

export function createNarrative(albumId, userId, title, contentJson) {
    const formData = new FormData();
    formData.set('album_id', albumId);
    formData.set('user_id', userId);
    formData.set('title', title);
    formData.set('content_json', contentJson);
    return axios({
        method: 'POST',
        url: `${API_HOST}/api/v6/narratives`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

/** overide all fields. Carefully */
export function updateNarrative(
    narrativeId,
    albumId,
    userId,
    title,
    contentJson
) {
    const formData = new FormData();
    formData.set('narrative_id', narrativeId);
    formData.set('album_id', albumId);
    formData.set('user_id', userId);
    formData.set('title', title);
    formData.set('content_json', contentJson);
    return axios({
        method: 'POST',
        url: `${API_HOST}/api/v6/narratives`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
