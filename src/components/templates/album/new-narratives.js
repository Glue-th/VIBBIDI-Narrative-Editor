/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import {
    Button, Card, Col, Form, Input, Row
} from 'antd';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';
// import draftToMarkdown from 'draftjs-to-markdown';
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter';
import { createEditorState, Editor } from 'medium-draft';
import 'medium-draft/lib/index.css';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
    createNarrative,
    getAlbumNarratives,
    getNarrativeDetail,
    setNarrativeTags,
    updateNarrative,
} from '../../../api/index';
import AlbumSearch from '../../organisms/SearchAlbum/index';
import AlbumsDetailTable from './albums-details-table';
import NarrativesDetailTable from './narratives-details-table';

const FormItem = Form.Item;
const { TextArea } = Input;
const toolbarConfig = {
    block: [],
    inline: ['BOLD', 'ITALIC', 'UNDERLINE', 'hyperlink'],
};
class NewNarratives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            selectedAlbum: null,
            selectedNarrativeUuid: null,
            narratives: [],
            narrativeDetail: null,
            numberSubSection: 3,
            editorState: {
                section0: createEditorState(),
                section1: createEditorState(),
                section2: createEditorState(),
                section3: createEditorState(),
            },
            hashTag: '',
            contents: [],
        };
        this.onChangeEditor = index => editor => {
            const { editorState, narrativeDetail, contents } = this.state;
            editorState[`section${index}`] = editor;
            const rawContentState = convertToRaw(editor.getCurrentContent());
            const markup = draftjsToMd(rawContentState);
            if (narrativeDetail) {
                narrativeDetail.content_json.sections[index].content = markup;
            } else {
                contents[index] = markup;
            }
            this.setState({ editorState, narrativeDetail, contents });
        };

        this.refsEditor = React.createRef();
    }

    onAlbumClicked = album => {
        this.handleCancel();
        this.setState({ selectedAlbum: album, narratives: [] });
        getAlbumNarratives(album.id)
            .then(res => res.data.narratives)
            .then(narratives => {
                this.setState({ narratives });
            })
            .catch(e => console.log(e.message));
    };

    onNarrativeClicked = narrativeUuid => {
        if (this.state.selectedNarrativeUuid === narrativeUuid) {
            this.setState({ selectedNarrativeUuid: null });
            return;
        }
        const { editorState } = this.state;
        this.setState({ selectedNarrativeUuid: narrativeUuid });
        getNarrativeDetail(narrativeUuid)
            .then(res => res.data)
            .then(narrativeDetail => {
                if (
                    narrativeDetail &&
                    narrativeDetail.content_json &&
                    narrativeDetail.content_json.sections
                ) {
                    for (let i = 0; i < narrativeDetail.content_json.sections.length; i += 1) {
                        const rawData = mdToDraftjs(
                            narrativeDetail.content_json.sections[i].content,
                        );
                        const contentState = convertFromRaw(rawData);
                        const newEditorState = EditorState.createWithContent(contentState);
                        editorState[`section${i}`] = newEditorState;
                    }
                }
                let hashTag = '';
                if (narrativeDetail && narrativeDetail.tags) {
                    for (let i = 0; i < narrativeDetail.tags.length; i += 1) {
                        hashTag += `#${narrativeDetail.tags[i].title} `;
                    }
                }
                this.setState({
                    narrativeDetail,
                    editorState,
                    hashTag,
                });
            })
            .catch(e => console.log(e.message));
    };

    onSearchAlbums = albums => {
        this.setState({ albums: albums || [] });
    };

    handleCreate = e => {
        e.preventDefault();
        const { selectedAlbum, contents } = this.state;
        if (selectedAlbum && contents.length > 0) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    const sections = [];
                    sections.push({ content: contents[0] });
                    for (let index = 1; index <= 3; index += 1) {
                        const section = {
                            title: values[`sub-tittle-new-${index}`],
                            datasource_id: values[`datasourceID_new_${index}`],
                            content: contents[index],
                        };
                        sections.push(section);
                    }
                    const hashtag = values.hashTags
                        .split('#')
                        .map(item => item.trim())
                        .slice(1);
                    createNarrative(
                        selectedAlbum.id, // album_id
                        values.author || '297513575490577', // user_id
                        values.main_title, // title
                        { sections }, // content_json
                    )
                        .then(res => res.data.narrative.id)
                        .then(narrativeId => setNarrativeTags(narrativeId, hashtag))
                        .then(() => {
                            this.handleCancel();
                            getAlbumNarratives(selectedAlbum.id)
                                .then(res => res.data.narratives)
                                .then(narratives => {
                                    this.setState({ narratives });
                                })
                                .catch(e => console.log(e.message));
                            alert('create narrative success');
                        })
                        .catch(err => console.log('update fail', err.message));
                }
            });
        }
    };

    handleSave = e => {
        e.preventDefault();
        console.log('update');
        const { selectedNarrativeUuid, selectedAlbum, narrativeDetail } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const hashtag = values.hashTags
                    .split('#')
                    .map(item => item.trim())
                    .slice(1);

                if (selectedNarrativeUuid && narrativeDetail && narrativeDetail.content_json) {
                    for (let index = 1; index <= 3; index += 1) {
                        narrativeDetail.content_json.sections[index].title =
                            values[`sub-tittle-${index}`];
                        narrativeDetail.content_json.sections[index].datasource_id =
                            values[`datasourceID_${index}`];
                    }
                    updateNarrative(
                        selectedNarrativeUuid, // narrative_id
                        selectedAlbum.id, // album_id
                        values.author || '297513575490577', // user_id
                        values.main_title, // title
                        narrativeDetail.content_json, // content_json
                    )
                        .then(() => setNarrativeTags(selectedNarrativeUuid, hashtag))
                        .then(() => {
                            this.handleCancel();
                            getAlbumNarratives(selectedAlbum.id)
                                .then(res => res.data.narratives)
                                .then(narratives => {
                                    this.setState({ narratives });
                                })
                                .catch(e => console.log(e.message));
                            alert('update narrative success');
                        })
                        .catch(err => console.log('update fail', err.message));
                }
            }
        });
    };

    handleCancel = () => {
        this.setState({
            narrativeDetail: null,
            selectedNarrativeUuid: null,
            numberSubSection: 3,
            editorState: {
                section0: createEditorState(),
                section1: createEditorState(),
                section2: createEditorState(),
                section3: createEditorState(),
            },
            hashTag: '',
        });
        this.props.form.resetFields();
    };

    addSection = () => {
        this.setState(prevState => ({ numberSubSection: prevState.numberSubSection + 1 }));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            narrativeDetail, numberSubSection, editorState, hashTag
        } = this.state;
        let start = 1;
        if (
            narrativeDetail &&
            narrativeDetail.content_json &&
            narrativeDetail.content_json.sections
        ) {
            start = narrativeDetail.content_json.sections.length;
        }
        const subSections = [];
        for (let index = start; index <= numberSubSection; index += 1) {
            subSections.push(
                <div key={index}>
                    <Row gutter={16} style={{ paddingTop: '1em' }}>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                            <span id={`lblSub-tittle-new-${index}`} className="label">
                                {`Sub-tittle ${index}`}
                            </span>
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <FormItem>
                                {getFieldDecorator(`sub-tittle-new-${index}`)(
                                    <Input
                                        id={`input_sub-tittle-new-${index}`}
                                        placeholder="Sub-tittle"
                                        style={{ width: '100%' }}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                            <span id={`lblVideoURL_${index}`} className="label">
                                Video URL
                            </span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <FormItem>
                                {getFieldDecorator(`video_url_new_${index}`)(
                                    <Input
                                        id={`input_video_url_new_${index}`}
                                        placeholder=" Video URL"
                                        style={{ width: '100%' }}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                            <span id={`lblDatasourceID_${index}`} className="label">
                                Datasource ID
                            </span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <FormItem>
                                {getFieldDecorator(`datasourceID_new_${index}`)(
                                    <Input
                                        id={`input_datasourceID_new_${index}`}
                                        placeholder="Datasource ID"
                                        style={{ width: '100%' }}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3} />
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Card bordered>
                                <Editor
                                    editorState={this.state.editorState[`section${index}`]}
                                    onChange={this.onChangeEditor(index)}
                                    toolbarConfig={toolbarConfig}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>,
            );
        }

        return (
            <Container>
                <Title>Create Album Narratives</Title>
                <div className="new-template">
                    {/* Search Album */}
                    <SubTitle style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                        1. Search Album
                    </SubTitle>
                    <AlbumSearch searchCallback={this.onSearchAlbums} />

                    {/* Search result */}
                    <SubTitle style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                        2. Select an Album
                    </SubTitle>
                    {(this.state.albums && this.state.albums.length && (
                        <Row gutter={16}>
                            <AlbumsDetailTable
                                albums={this.state.albums}
                                selected_album={this.state.selectedAlbum}
                                onAlbumClicked={this.onAlbumClicked}
                            />
                        </Row>
                    )) ||
                        'no album'}

                    {/* Search Narratives */}
                    <SubTitle style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                        3. Select a Narrative
                    </SubTitle>
                    {(this.state.narratives && this.state.narratives.length && (
                        <Row gutter={16}>
                            <NarrativesDetailTable
                                narratives={this.state.narratives}
                                selected_narrative_uuid={this.state.selectedNarrativeUuid}
                                onNarrativeClicked={this.onNarrativeClicked}
                            />
                        </Row>
                    )) ||
                        'no Narrative'}

                    {/* Form submit */}
                    <SubTitle style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                        {`4. Update or Create narrative for album name:${(this.state
                            .selectedAlbum &&
                            this.state.selectedAlbum.album_name) ||
                            ''}, artist name:${(this.state.selectedAlbum &&
                            this.state.selectedAlbum.artist_name) ||
                            ''}`}
                    </SubTitle>
                    {(this.state.selectedAlbum && (
                        <Form onSubmit={this.handleCreate} layout="vertical">
                            <Row gutter={16} style={{ paddingTop: '1em' }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblAuthor" className="label">
                                        Author
                                    </span>
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <FormItem>
                                        {getFieldDecorator('author', {
                                            initialValue:
                                                (narrativeDetail && narrativeDetail.user_id) || '',
                                        })(
                                            <Input
                                                id="input_author"
                                                placeholder="author"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ paddingTop: '1em' }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblMAINTITTLE" className="label">
                                        MAIN TITTLE
                                    </span>
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <FormItem>
                                        {getFieldDecorator('main_title', {
                                            initialValue:
                                                (narrativeDetail && narrativeDetail.title) || '',
                                        })(
                                            <Input
                                                id="input_main_title"
                                                placeholder="title of narrative"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3} />
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <Card bordered>
                                        <Editor
                                            // ref={this.refsEditor}
                                            editorState={editorState.section0}
                                            onChange={this.onChangeEditor(0)}
                                            // inlineButtons={this.inlineButtons}
                                            // blockButtons={this.blockButtons}
                                            toolbarConfig={toolbarConfig}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Card title="Sections" bordered={false}>
                                {narrativeDetail &&
                                    narrativeDetail.content_json &&
                                    narrativeDetail.content_json.sections &&
                                    narrativeDetail.content_json.sections.length > 1 &&
                                    narrativeDetail.content_json.sections.map((section, index) => {
                                        if (index > 0) {
                                            return (
                                                <div key={index}>
                                                    <Row gutter={16} style={{ paddingTop: '1em' }}>
                                                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                            <span
                                                                id={`lblSub-tittle-${index}`}
                                                                className="label"
                                                            >
                                                                {`Sub-tittle ${index}`}
                                                            </span>
                                                        </Col>
                                                        <Col
                                                            xs={20}
                                                            sm={20}
                                                            md={20}
                                                            lg={20}
                                                            xl={20}
                                                        >
                                                            <FormItem>
                                                                {getFieldDecorator(
                                                                    `sub-tittle-${index}`,
                                                                    {
                                                                        initialValue:
                                                                            section.title || '',
                                                                    },
                                                                )(
                                                                    <Input
                                                                        id={`input_sub-tittle-${index}`}
                                                                        placeholder="Sub-tittle"
                                                                        style={{ width: '100%' }}
                                                                    />,
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={16}>
                                                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                            <span
                                                                id={`lblVideoURL_${index}`}
                                                                className="label"
                                                            >
                                                                Video URL
                                                            </span>
                                                        </Col>
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                            <FormItem>
                                                                {getFieldDecorator(
                                                                    `video_url_${index}`,
                                                                    {
                                                                        initialValue:
                                                                            section.datasource_id ||
                                                                            '',
                                                                    },
                                                                )(
                                                                    <Input
                                                                        id={`input_video_url_${index +
                                                                            1}`}
                                                                        placeholder=" Video URL"
                                                                        style={{ width: '100%' }}
                                                                    />,
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                            <span
                                                                id={`lblDatasourceID_${index}`}
                                                                className="label"
                                                            >
                                                                Datasource ID
                                                            </span>
                                                        </Col>
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                            <FormItem>
                                                                {getFieldDecorator(
                                                                    `datasourceID_${index}`,
                                                                    {
                                                                        initialValue:
                                                                            section.datasource_id ||
                                                                            '',
                                                                    },
                                                                )(
                                                                    <Input
                                                                        id={`input_datasourceID_${index}`}
                                                                        placeholder="Datasource ID"
                                                                        style={{ width: '100%' }}
                                                                    />,
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={16}>
                                                        <Col xs={3} sm={3} md={3} lg={3} xl={3} />
                                                        <Col
                                                            xs={20}
                                                            sm={20}
                                                            md={20}
                                                            lg={20}
                                                            xl={20}
                                                        >
                                                            <Card bordered>
                                                                <Editor
                                                                    // ref={this.refsEditor}
                                                                    editorState={
                                                                        editorState[
                                                                            `section${index}`
                                                                        ]
                                                                    }
                                                                    onChange={this.onChangeEditor(
                                                                        index,
                                                                    )}
                                                                    toolbarConfig={toolbarConfig}
                                                                />
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                {subSections}
                            </Card>
                            {/* <Row>
                                <Col xs={23}>
                                    <Button type="primary" block onClick={this.addSection}>
                                        Add Section
                                    </Button>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col xs={24}>
                                    <Card bordered={false}>
                                        <FormItem label={<span id="hash-tags">Hashtags</span>}>
                                            {getFieldDecorator('hashTags', {
                                                initialValue: hashTag || '',
                                            })(
                                                <TextArea
                                                    placeholder="#TaylorSwift #Pop #Reputation #Endgame"
                                                    autosize={{
                                                        minRows: 4,
                                                    }}
                                                />,
                                            )}
                                        </FormItem>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button id="btnCancel" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                    {narrativeDetail && (
                                        <Button
                                            type="danger"
                                            id="btnSave"
                                            onClick={this.handleSave}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {!narrativeDetail && (
                                        <Button type="primary" htmlType="submit" id="btnSubmit">
                                            Finish
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    )) ||
                        null}
                </div>
            </Container>
        );
    }
}
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em 0 0 1em;
    color: #000;
    .new-template {
        .label {
            float: right;
        }
        #btnSubmit,
        #btnCancel,
        #btnSave {
            margin-left: 16px;
        }
        #lblThreshold {
            padding-bottom: 20px;
        }
        .ant-card-body {
            padding: 0;
        }
    }
`;
const Title = styled.div`
    font-weight: 300;
    font-size: 2rem;
    /* padding: 1em 0 1em 3em; */
    span {
        color: #00688d;
    }
`;

const SubTitle = styled.div`
    font-weight: 200;
    font-size: 1.5rem;
    /* padding: 1em 0 1em 3em; */
    span {
        color: #00688d;
    }
`;
NewNarratives.propTypes = {
    form: PropTypes.object.isRequired,
};
export default Form.create()(NewNarratives);
