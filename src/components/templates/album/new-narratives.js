/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import {
    Button, Card, Col, Form, Input, Row, Spin
} from 'antd';
import {
    convertToRaw, EditorState, convertFromRaw, ContentState
} from 'draft-js';
// import { draftjsToMd, mdToDraftjs } from 'draftjs-md-converter';
import _ from 'lodash';
import { createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
    createNarrative,
    getAlbumNarratives,
    getDatasourceByYoutubeUrl,
    getNarrativeDetail,
    setNarrativeTags,
    updateNarrative,
} from '../../../api/index';
import { getUrlAndAchor, getVideoLink } from '../../organisms/medium-draft/exporter';
import AlbumSearch from '../../organisms/SearchAlbum/index';
import AlbumsDetailTable from './albums-details-table';
import EditorNarratives from './Editor';
import KeywordTable from './keyword-table';
import NarrativesDetailTable from './narratives-details-table';
import VideoDataTable from './video-table';

const FormItem = Form.Item;
const { TextArea } = Input;

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
            editorState: createEditorState(),
            hashTag: '',
            contents: [],
            keywords: [],
            videoDatas: [],
            loading: false,
        };

        this.onChange = editorState => {
            // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
            // const rawContentState = convertToRaw(editorState.getCurrentContent());
            // const markup = draftjsToMd(rawContentState);
            this.setState({ editorState });
            this.setKeyword();
        };
    }

    setKeyword = _.debounce(async e => {
        const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
        const keywords = getUrlAndAchor(rawContentState);
        const videoDatas = getVideoLink(rawContentState);
        await Promise.all(
            videoDatas.map(async videoData => {
                const res = await Promise.resolve(getDatasourceByYoutubeUrl(videoData.uri));
                videoData.datasourceId =
                    (res.data.data.findByYoutubeUrl &&
                        res.data.data.findByYoutubeUrl.datasourceId) ||
                    null;
            }),
        );
        this.setState({ keywords, videoDatas });
    }, 1000);

    onAlbumClicked = album => {
        this.handleCancel();
        this.setState({ selectedAlbum: album, narratives: [], loading: true });
        getAlbumNarratives(album.id)
            .then(res => res.data.narratives)
            .then(narratives => {
                this.setState({ narratives, loading: false });
            })
            .catch(e => {
                console.log(e.message);
                this.setState({ loading: false });
            });
    };

    onNarrativeClicked = narrativeUuid => {
        if (this.state.selectedNarrativeUuid === narrativeUuid) {
            this.setState({ selectedNarrativeUuid: null });
            return;
        }
        this.setState({ selectedNarrativeUuid: narrativeUuid, loading: true });
        getNarrativeDetail(narrativeUuid)
            .then(res => res.data)
            .then(async narrativeDetail => {
                let hashTag = '';
                if (narrativeDetail && narrativeDetail.tags) {
                    for (let i = 0; i < narrativeDetail.tags.length; i += 1) {
                        hashTag += `#${narrativeDetail.tags[i].title} `;
                    }
                }
                // const rawData = mdToDraftjs(narrativeDetail.content_json);
                // const contentState = convertFromRaw(rawData);
                // await Object.entries(rawData.entityMap).forEach(([key, value]) => {
                //     if (value.type === 'IMAGE') {
                //         rawData.entityMap[key].type = 'embed';
                //     }
                // });
                console.log(JSON.stringify(convertFromRaw(narrativeDetail.content_json)));
                // const newEditorState = EditorState.createWithContent(contentState);
                // this.onChange(newEditorState);
                this.onChange(
                    EditorState.push(
                        this.state.editorState,
                        convertFromRaw(narrativeDetail.content_json),
                    ),
                );
                return this.setState({
                    narrativeDetail,
                    hashTag,
                    loading: false,
                });
            })
            .catch(e => {
                console.log(e.message);
                this.setState({ loading: false });
            });
    };

    onSearchAlbums = (albums, loading) => {
        this.setState({ albums: albums || [], loading });
    };

    handleCreate = e => {
        e.preventDefault();
        const { selectedAlbum, editorState } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (selectedAlbum) {
                    this.setState({ loading: true });
                    console.log('Received values of form: ', values);
                    const rawContentState = convertToRaw(editorState.getCurrentContent());
                    // const markup = draftjsToMd(rawContentState);
                    const hashtag = values.hashTags
                        .split('#')
                        .map(item => item.trim())
                        .slice(1);
                    createNarrative(
                        selectedAlbum.id, // album_id
                        values.author, // user_id
                        values.main_title, // title
                        rawContentState, // content_json
                    )
                        .then(res => res.data.narrative.id)
                        .then(narrativeId => setNarrativeTags(narrativeId, hashtag))
                        .then(() => {
                            this.setState({ loading: false });
                            this.handleCancel();
                            getAlbumNarratives(selectedAlbum.id)
                                .then(res => res.data.narratives)
                                .then(narratives => {
                                    this.setState({ narratives });
                                })
                                .catch(e => console.log(e.message));
                            alert('create narrative success');
                        })
                        .catch(err => {
                            console.log('update fail', err.message);
                            this.setState({ loading: false });
                        });
                }
                this.setState({ loading: false });
            }
        });
    };

    handleSave = e => {
        e.preventDefault();
        console.log('update');
        const {
            selectedNarrativeUuid, selectedAlbum, narrativeDetail, editorState
        } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                console.log('Received values of form: ', values);
                const hashtag = values.hashTags
                    .split('#')
                    .map(item => item.trim())
                    .slice(1);

                if (selectedNarrativeUuid && narrativeDetail && narrativeDetail.content_json) {
                    const rawContentState = convertToRaw(editorState.getCurrentContent());
                    updateNarrative(
                        selectedNarrativeUuid, // narrative_id
                        selectedAlbum.id, // album_id
                        values.author, // user_id
                        values.main_title, // title
                        rawContentState, // content_json
                    )
                        .then(() => setNarrativeTags(selectedNarrativeUuid, hashtag))
                        .then(() => {
                            this.setState({ loading: false });
                            this.handleCancel();
                            getAlbumNarratives(selectedAlbum.id)
                                .then(res => res.data.narratives)
                                .then(narratives => {
                                    this.setState({ narratives });
                                })
                                .catch(e => console.log(e.message));
                            alert('update narrative success');
                        })
                        .catch(err => {
                            console.log('update fail', err.message);
                            this.setState({ loading: false });
                        });
                }
                this.setState({ loading: false });
            }
        });
    };

    handleCancel = () => {
        this.setState({
            narrativeDetail: null,
            selectedNarrativeUuid: null,
            editorState: createEditorState(),
            hashTag: '',
            keywords: [],
            videoDatas: [],
        });
        this.props.form.resetFields();
    };

    handleFindDataSource = (fieldLink, fieldDatasource) => () => {
        const link = this.props.form.getFieldValue(fieldLink);
        if (link) {
            this.setState({ loading: true });
            getDatasourceByYoutubeUrl(link)
                .then(res => res.data.findByYoutubeUrl)
                .then(track => {
                    console.log(track.datasourceId);
                    this.props.form.setFieldsValue({
                        [fieldDatasource]: track.datasourceId,
                    });
                    this.setState({ loading: false });
                })
                .catch(e => {
                    console.log(e.message);
                    this.props.form.setFieldsValue({
                        [fieldDatasource]: null,
                    });
                    this.setState({ loading: false });
                });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            narrativeDetail, editorState, hashTag, keywords, videoDatas
        } = this.state;
        return (
            <Container>
                {this.state.loading && <Spin />}

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
                    {this.state.selectedAlbum && (
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
                                                narrativeDetail && narrativeDetail.user_id,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input author',
                                                },
                                            ],
                                        })(
                                            <Input
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
                                            initialValue: narrativeDetail && narrativeDetail.title,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input MAIN TITTLE',
                                                },
                                            ],
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
                                        <EditorNarratives
                                            editorState={editorState}
                                            onChange={this.onChange}
                                        />
                                    </Card>
                                </Col>
                            </Row>
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
                                <Col xs={24}>
                                    <Card title="Video Data" bordered={false}>
                                        <VideoDataTable videoDatas={videoDatas} />
                                    </Card>
                                    <Card title="Keyword" bordered={false}>
                                        <KeywordTable keywords={keywords} />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right', paddingTop: '1em' }}>
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
                    )}
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
    .ant-spin-spinning {
        position: fixed;
        display: block;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
        cursor: pointer;
    }
    .ant-spin-dot-spin {
        position: absolute;
        top: 50%;
        left: 50%;
    }
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
