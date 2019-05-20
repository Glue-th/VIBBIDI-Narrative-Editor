import React from 'react';
import styled from 'styled-components';
// import ButtonsShare from '../../organisms/ButtonsShare';
import Header from '../../organisms/Header';
import EditorNarratives from './Editor';

class NarrativePopup extends React.Component {
    render() {
        const {
            editorState, tags, title, onChange,
        } = this.props;
        return (
            <Wrapper>
                <Header tags={tags} title={title} />
                {/* <ButtonsShare
                    shareUrl={this.getShareUrl()}
                    title={`${narrative.title}\n${narrative.sections.map(
                        section => `${section.content} `,
                    )}`}
                    position="left"
                /> */}
                <EditorNarratives
                    editorState={editorState}
                    onChange={onChange}
                    editorEnabled={false}
                />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    margin: 16px;

    .written-by {
        margin: 0;
    }

    @media (min-width: 720px) {
        margin: 0;
    }
`;

export default NarrativePopup;
