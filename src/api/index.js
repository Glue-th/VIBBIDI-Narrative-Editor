/* eslint-disable object-shorthand */
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
    return axios.post(`${API_HOST}/api/v6/narratives`, {
        album_id: albumId,
        user_id: userId,
        title: title,
        content_json: contentJson,
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
    return axios.post(`${API_HOST}/api/v6/narratives`, {
        narrative_id: narrativeId,
        album_id: albumId,
        user_id: userId,
        title: title,
        content_json: contentJson,
    });
}

export function getNarrativeTags(narrativeId) {
    return axios.get(`${API_HOST}/api/v6/narratives/tags/${narrativeId}`);
}

export function getNarrativeByUserId(userId) {
    return axios.get(`${API_HOST}/api/v6/narratives/user/${userId}`);
}
