/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
import axios from 'axios';

const API_HOST = 'https://st-api.vibbidi.net';
const GQL_HOST = 'https://st-api.vibbidi.net/api/v6/graphql';

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

export function createNarrative(
    albumId,
    userId,
    title,
    contentJson,
    valid = 1
) {
    return axios.post(`${API_HOST}/api/v6/narratives`, {
        album_id: albumId,
        user_id: userId,
        title: title,
        content_json: contentJson,
        valid: valid,
    });
}

/** overide all fields. Carefully */
export function updateNarrative(
    narrativeId,
    albumId,
    userId,
    title,
    contentJson,
    valid = 1
) {
    return axios.post(`${API_HOST}/api/v6/narratives`, {
        narrative_id: narrativeId,
        album_id: albumId,
        user_id: userId,
        title: title,
        content_json: contentJson,
        valid: valid,
    });
}

export function setNarrativeTags(narrativeId, tags) {
    return axios.post(`${API_HOST}/api/v6/narratives/tags`, {
        narrative_id: narrativeId, // D746DF53D6D0493599059418600923E7
        tags: tags, // ["tag1","tag2","tag3"]
    });
}

export function getNarrativeTags(narrativeId) {
    return axios.get(`${API_HOST}/api/v6/narratives/tags/${narrativeId}`);
}

export function getNarrativeByUserId(userId) {
    return axios.get(`${API_HOST}/api/v6/narratives/user/${userId}`);
}

/**
 *
 * @param {String} id narrative id
 * @param {Int} valid 0 or 1
 */
export function setNarrativeValid(id, valid) {
    return axios.post(`${API_HOST}/api/v6/narratives/${id}/valid`, {
        valid: valid,
    });
}

/**
 * @param {String} youtubeUrl eg: https://www.youtube.com/watch?v=nfWlot6h_JM or https://youtu.be/nfWlot6h_JM
 */
export function getDatasourceByYoutubeUrl(youtubeUrl) {
    const query = `
    query findDatasourceByYoutubeUrl($youtubeUrl: String!){
        findByYoutubeUrl(youtubeUrl: $youtubeUrl) {
          id
          title
          durationMs
          coverImage {
            url
            width
            height
            mimeType
          }
          datasourceId
          previewUrl
          playerAudioVolume
          url
          width
          height
          isVideo
          displayAt
          artistName
          webUri
        }
      }
    `;
    return axios.post(
        GQL_HOST,
        {
            query: query,
            variables: {
                youtubeUrl: youtubeUrl,
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
