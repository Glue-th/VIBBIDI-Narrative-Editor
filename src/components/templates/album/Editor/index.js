/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Block, Editor, rendererFn } from '../../../organisms/medium-draft';
import AtomicEmbedComponent from './AtomicEmbedComponent';
import AtomicBlock from './AtomicBlock';
import EmbedSideButton from './EmbedSideButton';

const customStyleMap = {
    keyword: {
        color: 'rgba(0, 255, 0, 1)',
    },
    link: {
        color: '#1890ff !important',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
};
class EditorNarratives extends React.Component {
    constructor(props) {
        super(props);
        this.sideButtons = [
            {
                title: 'Embed',
                component: EmbedSideButton,
            },
        ];
        this.refsEditor = React.createRef();
        this.blockButtons = [
            {
                label: 'H3',
                style: 'header-three',
                icon: 'header',
                description: 'Heading 3',
            },
        ];

        this.inlineButtons = [
            {
                label: 'B',
                style: 'BOLD',
                icon: 'bold',
                description: 'Bold',
            },
            {
                label: 'I',
                style: 'ITALIC',
                icon: 'italic',
                description: 'Italic',
            },
            {
                label: 'U',
                style: 'UNDERLINE',
                icon: 'underline',
                description: 'Underline',
            },
            {
                label: 'link',
                style: 'hyperlink',
                icon: 'link',
                description: 'Add a link',
            },
            {
                label: 'keyword',
                style: 'keyword',
                icon: 'keyword',
                description: 'Add a keyword',
            },
        ];
    }

    // eslint-disable-next-line react/sort-comp
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line react/sort-comp
    // eslint-disable-next-line class-methods-use-this
    rendererFn(setEditorState, getEditorState) {
        const atomicRenderers = {
            embed: AtomicEmbedComponent,
        };
        const rFnOld = rendererFn(setEditorState, getEditorState);
        const rFnNew = (contentBlock) => {
            const type = contentBlock.getType();
            switch (type) {
                case Block.ATOMIC:
                    return {
                        component: AtomicBlock,
                        editable: false,
                        props: {
                            components: atomicRenderers,
                            getEditorState,
                        },
                    };
                default:
                    return rFnOld(contentBlock);
            }
        };
        return rFnNew;
    }

    render() {
        const { editorState, onChange } = this.props;
        return (
            <Container>
                <Editor
                    ref={this.refsEditor}
                    editorState={editorState}
                    onChange={onChange}
                    sideButtons={this.sideButtons}
                    rendererFn={this.rendererFn}
                    inlineButtons={this.inlineButtons}
                    blockButtons={this.blockButtons}
                    customStyleMap={customStyleMap}
                />
            </Container>
        );
    }
}
const Container = styled.div`
    .md-inline-keyword {
        background: yellow;
        display: inline;
        padding: 2px 4px;
    }
`;

EditorNarratives.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default EditorNarratives;
