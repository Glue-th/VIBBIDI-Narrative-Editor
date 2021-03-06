import { AtomicBlockUtils, EditorState } from 'draft-js';
import React from 'react';
import PropTypes from 'prop-types';
import { getDatasourceByYoutubeUrl } from '../../../../api/index';

class EmbedSideButton extends React.Component {
    static propTypes = {
        setEditorState: PropTypes.func,
        getEditorState: PropTypes.func,
        close: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.addEmbedURL = this.addEmbedURL.bind(this);
    }

    onClick() {
        const url = window.prompt('Enter a URL', '');
        this.props.close();
        if (!url) {
            return;
        }
        this.addEmbedURL(url);
    }

    async addEmbedURL(url) {
        let editorState = this.props.getEditorState();
        const content = editorState.getCurrentContent();
        const res = await Promise.resolve(getDatasourceByYoutubeUrl(url));
        const datasource = res.data.data.findByYoutubeUrl || null;
        // console.log(JSON.stringify(datasource));
        const contentWithEntity = content.createEntity('embed', 'IMMUTABLE', {
            url,
            datasource,
        });
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        this.props.setEditorState(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'E'));
    }

    render() {
        return (
            <button
                className="md-sb-button md-sb-img-button"
                type="button"
                title="Add an Embed"
                onClick={this.onClick}
            >
                <i className="fa fa-code" />
            </button>
        );
    }
}
export default EmbedSideButton;
