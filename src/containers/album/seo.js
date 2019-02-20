import React from 'react';
import SEO from '../../components/templates/album/seo';
// import API from '../../util/api';

class SeoContainer extends React.Component {
    constructor(props) {
        super(props);
        // API.get('users').then((res) => {
        //     console.log(res);
        //     console.log(res.data);
        // });
    }

    render() {
        return <SEO />;
    }
}

export default SeoContainer;
