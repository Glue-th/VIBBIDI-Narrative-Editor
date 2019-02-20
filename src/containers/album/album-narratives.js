import React from 'react';
import AlbumNarratives from '../../components/templates/album/album-narratives';
// import API from '../../util/api';

class AlbumNarrativesContainer extends React.Component {
    constructor(props) {
        super(props);
        // API.get('users').then((res) => {
        //     console.log(res);
        //     console.log(res.data);
        // });
    }

    render() {
        return <AlbumNarratives />;
    }
}

export default AlbumNarrativesContainer;
