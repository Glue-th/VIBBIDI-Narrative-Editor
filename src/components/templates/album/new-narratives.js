/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { Button, Card, Col, Form, Input, Row, Spin } from "antd";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
// import draftToMarkdown from 'draftjs-to-markdown';
import { draftjsToMd, mdToDraftjs } from "draftjs-md-converter";
import { createEditorState, Editor } from "medium-draft";
import "medium-draft/lib/index.css";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import {
    createNarrative,
    getAlbumNarratives,
    getDatasourceByYoutubeUrl,
    getNarrativeDetail,
    setNarrativeTags,
    updateNarrative
} from "../../../api/index";
import AlbumSearch from "../../organisms/SearchAlbum/index";
import AlbumsDetailTable from "./albums-details-table";
import KeywordTable from "./keyword-table";
import NarrativesDetailTable from "./narratives-details-table";

const FormItem = Form.Item;
const { TextArea } = Input;
const toolbarConfig = {
    block: [],
    inline: ["BOLD", "ITALIC", "UNDERLINE", "hyperlink"]
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
            start: 0,
            numberSubSection: 1,
            editorState: {
                section0: createEditorState(),
                section1: createEditorState(),
                section2: createEditorState(),
                section3: createEditorState()
            },
            subSections: [],
            hashTag: "",
            contents: [],
            keywords: [],
            loading: false
        };
        this.onChangeEditor = index => editor => {
            const { editorState, narrativeDetail, contents } = this.state;
            editorState[`section${index}`] = editor;
            const rawContentState = convertToRaw(editor.getCurrentContent());
            const markup = draftjsToMd(rawContentState);
            if (
                narrativeDetail &&
                index < narrativeDetail.content_json.sections.length
            ) {
                narrativeDetail.content_json.sections[index].content = markup;
            } else {
                contents[index] = markup;
            }
            this.setState({ editorState, narrativeDetail, contents });
        };

        this.refsEditor = React.createRef();
    }

    componentDidMount = () => {
        // getDatasourceByYoutubeUrl('https://www.youtube.com/watch?v=nfWlot6h_JM')
        //     .then(res => res.data.data.findByYoutubeUrl)
        //     .then(track => {
        //         console.log(
        //             'https://www.youtube.com/watch?v=nfWlot6h_JM',
        //             '==>',
        //             track.datasourceId,
        //         );
        //     })
        //     .catch(e => console.log(e.message));
    };

    onAlbumClicked = album => {
        this.handleCancel();
        this.setState({ selectedAlbum: album, narratives: [], loading: true });
        getAlbumNarratives(album.id)
            .then(res => res.data.data.album.userNarratives)
            .then(userNarratives => {
                this.setState({ narratives: userNarratives, loading: false });
            })
            .catch(e => {
                console.log(e.message);
                this.setState({ loading: false });
            });
    };

    onNarrativeClicked = narrativeUuid => {
        if (this.state.selectedNarrativeUuid === narrativeUuid) {
            this.props.form.setFieldsValue({
                main_title: null
            });
            this.setState({
                numberSubSection: 1,
                selectedNarrativeUuid: null,
                narrativeDetail: null,
                editorState: {
                    section0: createEditorState(),
                    section1: createEditorState(),
                    section2: createEditorState(),
                    section3: createEditorState()
                },
                hashTag: ""
            });
            return;
        }
        const { editorState } = this.state;
        this.setState({
            selectedNarrativeUuid: narrativeUuid,
            numberSubSection: 1,
            loading: true
        });
        let keywords = [];
        getNarrativeDetail(narrativeUuid)
            .then(res => res.data)
            .then(narrativeDetail => {
                let numberSubSection = 3;
                if (
                    narrativeDetail &&
                    narrativeDetail.content_json &&
                    narrativeDetail.content_json.sections
                ) {
                    numberSubSection =
                        narrativeDetail.content_json.sections.length - 1;
                    if (narrativeDetail.title) {
                        this.props.form.setFieldsValue({
                            main_title: narrativeDetail.title
                        });
                    }
                    for (
                        let i = 0;
                        i < narrativeDetail.content_json.sections.length;
                        i += 1
                    ) {
                        if (narrativeDetail.content_json.sections[i].content) {
                            const nodes = narrativeDetail.content_json.sections[
                                i
                            ].content
                                .split("[")
                                .slice(1);
                            const content = [];
                            nodes.forEach(node => {
                                // Link (Text + URL)
                                node = `[${node}`;
                                if (node.indexOf("[") === 0) {
                                    const matches = node.match(
                                        /\[(.*)\]\((.*)\)/
                                    );
                                    content.push({
                                        text: matches[1],
                                        url: matches[2]
                                    });
                                }
                            });
                            keywords = keywords.concat(content);
                            const rawData = mdToDraftjs(
                                narrativeDetail.content_json.sections[i].content
                            );
                            const contentState = convertFromRaw(rawData);
                            const newEditorState = EditorState.createWithContent(
                                contentState
                            );
                            editorState[`section${i}`] = newEditorState;
                        } else {
                            editorState[`section${i}`] = createEditorState();
                        }
                    }
                }
                let hashTag = "";
                if (narrativeDetail && narrativeDetail.tags) {
                    for (let i = 0; i < narrativeDetail.tags.length; i += 1) {
                        hashTag += `#${narrativeDetail.tags[i].title} `;
                    }
                }
                this.setState({
                    narrativeDetail,
                    editorState,
                    hashTag,
                    keywords,
                    loading: false,
                    numberSubSection
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
        const { selectedAlbum, contents } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (selectedAlbum && contents.length > 0) {
                    this.setState({ loading: true });
                    try {
                        console.log("Received values of form: ", values);
                        const sections = [];
                        sections.push({ content: contents[0] });
                        for (
                            let index = 1;
                            index <= this.state.numberSubSection;
                            index += 1
                        ) {
                            if (values[`sub-tittle-new-${index}`]) {
                                const section = {
                                    title: values[`sub-tittle-new-${index}`],
                                    datasource_id:
                                        values[`datasourceID_new_${index}`],
                                    content: contents[index]
                                };
                                sections.push(section);
                            }
                        }
                        console.log("sections", sections);
                        const hashtag = values.hashTags
                            .split("#")
                            .map(item => item.trim())
                            .slice(1);
                        createNarrative(
                            selectedAlbum.id, // album_id
                            values.author, // user_id
                            values.main_title, // title
                            { sections } // content_json
                        )
                            .then(res => res.data.narrative.id)
                            .then(narrativeId =>
                                setNarrativeTags(narrativeId, hashtag)
                            )
                            .then(() => {
                                this.setState({ loading: false });
                                this.handleCancel();
                                getAlbumNarratives(selectedAlbum.id)
                                .then(res => res.data.data.album.userNarratives)
                                .then(userNarratives => {
                                    this.setState({ narratives: userNarratives});
                                })
                                    .catch(e => console.log(e.message));
                                alert("create narrative success");
                            })
                            .catch(err => {
                                alert("create fail" + err.message);
                                this.setState({ loading: false });
                            });
                    } catch (e) {
                        alert("create fail" + e.message);
                        this.setState({ loading: false });
                    }
                    this.setState({ loading: false });
                }
            }
        });
    };

    handleSave = e => {
        e.preventDefault();
        console.log("update");
        const {
            selectedNarrativeUuid,
            selectedAlbum,
            narrativeDetail,
            contents
        } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                try {
                    console.log("Received values of form: ", values);
                    const hashtag = values.hashTags
                        .split("#")
                        .map(item => item.trim())
                        .slice(1);

                    if (
                        selectedNarrativeUuid &&
                        narrativeDetail &&
                        narrativeDetail.content_json
                    ) {
                        for (
                            let index = 1;
                            index <
                            narrativeDetail.content_json.sections.length;
                            index += 1
                        ) {
                            narrativeDetail.content_json.sections[index].title =
                                values[`sub-tittle-${index}`];
                            narrativeDetail.content_json.sections[
                                index
                            ].datasource_id = values[`datasourceID_${index}`];
                        }
                        console.log(
                            narrativeDetail.content_json.sections.length,
                            this.state.numberSubSection
                        );
                        for (
                            let index =
                                narrativeDetail.content_json.sections.length;
                            index <= this.state.numberSubSection;
                            index += 1
                        ) {
                            if (values[`sub-tittle-new-${index}`]) {
                                narrativeDetail.content_json.sections.push({
                                    title: values[`sub-tittle-new-${index}`],
                                    datasource_id:
                                        values[`datasourceID_new_${index}`],
                                    content: contents[index]
                                });
                            }
                        }
                        updateNarrative(
                            selectedNarrativeUuid, // narrative_id
                            selectedAlbum.id, // album_id
                            values.author, // user_id
                            values.main_title, // title
                            narrativeDetail.content_json // content_json
                        )
                            .then(() =>
                                setNarrativeTags(selectedNarrativeUuid, hashtag)
                            )
                            .then(() => {
                                this.setState({ loading: false });
                                this.handleCancel();
                                getAlbumNarratives(selectedAlbum.id)
                                .then(res => res.data.data.album.userNarratives)
                                .then(userNarratives => {
                                    this.setState({ narratives: userNarratives});
                                })
                                    .catch(e => console.log(e.message));
                                alert("update narrative success");
                            })
                            .catch(err => {
                                alert("update fail" + err.message);
                                this.setState({ loading: false });
                            });
                    }
                } catch (e) {
                    alert("update fail" + e.message);
                    this.setState({ loading: false });
                }
                this.setState({ loading: false });
            }
        });
    };

    handleCancel = () => {
        this.setState({
            narrativeDetail: null,
            selectedNarrativeUuid: null,
            numberSubSection: 1,
            editorState: {
                section0: createEditorState(),
                section1: createEditorState(),
                section2: createEditorState(),
                section3: createEditorState()
            },
            hashTag: "",
            keywords: []
        });
        this.props.form.resetFields();
    };

    addSection = () => {
        const {
            editorState,
            numberSubSection,
            contents,
            selectedAlbum
        } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(
                //     "Received values of form: ",
                //     values,
                //     numberSubSection
                // );
                if (selectedAlbum) {
                    if (
                        values[`sub-tittle-${numberSubSection}`]||values[`sub-tittle-new-${numberSubSection}`]
                    ) {
                        editorState[
                            `section${numberSubSection + 1}`
                        ] = createEditorState();
                        this.setState(prevState => ({
                            numberSubSection: prevState.numberSubSection + 1,
                            editorState
                        }));
                    } else {
                        alert("please input section!");
                    }
                } else {
                    if (
                        values[`sub-tittle-new-${numberSubSection}`] &&
                        contents[numberSubSection]
                    ) {
                        editorState[
                            `section${numberSubSection + 1}`
                        ] = createEditorState();
                        this.setState(prevState => ({
                            numberSubSection: prevState.numberSubSection + 1,
                            editorState
                        }));
                    } else {
                        alert("please input section!");
                    }
                }
            } else {
                alert("error!");
            }
        });
    };

    handleFindDataSource = (fieldLink, fieldDatasource) => () => {
        const link = this.props.form.getFieldValue(fieldLink);
        if (link) {
            this.setState({ loading: true });
            getDatasourceByYoutubeUrl(link)
                .then(res => res.data.data.findByYoutubeUrl)
                .then(track => {
                    console.log(track.datasourceId);
                    this.props.form.setFieldsValue({
                        [fieldDatasource]: track.datasourceId
                    });
                    this.setState({ loading: false });
                })
                .catch(e => {
                    console.log(e.message);
                    this.props.form.setFieldsValue({
                        [fieldDatasource]: null
                    });
                    this.setState({ loading: false });
                });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            narrativeDetail,
            editorState,
            hashTag,
            keywords,
            numberSubSection
        } = this.state;
        let start = 1;
        if (
            narrativeDetail &&
            narrativeDetail.content_json &&
            narrativeDetail.content_json.sections
        ) {
            start = narrativeDetail.content_json.sections.length;
        }
        // console.log(start, numberSubSection);
        const subSections = [];
        for (let index = start; index <= numberSubSection; index += 1) {
            subSections.push(
                <div key={index}>
                    <Row gutter={16} style={{ paddingTop: "1em" }}>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                            <span
                                id={`lblSub-tittle-new-${index}`}
                                className="label"
                            >
                                {`Sub-tittle ${index}`}
                            </span>
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <FormItem>
                                {getFieldDecorator(`sub-tittle-new-${index}`)(
                                    <Input
                                        id={`input_sub-tittle-new-${index}`}
                                        placeholder="Sub-tittle"
                                        style={{ width: "100%" }}
                                    />
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
                        <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                            <FormItem>
                                {getFieldDecorator(`video_url_new_${index}`)(
                                    <Input
                                        id={`input_video_url_new_${index}`}
                                        placeholder=" Video URL"
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Button
                                type="danger"
                                id={`lblDatasourceID_${index}`}
                                onClick={this.handleFindDataSource(
                                    `video_url_new_${index}`,
                                    `datasourceID_new_${index}`
                                )}
                            >
                                Find
                            </Button>
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
                                {getFieldDecorator(`datasourceID_new_${index}`)(
                                    <Input
                                        id={`input_datasourceID_new_${index}`}
                                        placeholder="Datasource ID"
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3} />
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Card bordered>
                                <Editor
                                    editorState={
                                        this.state.editorState[
                                            `section${index}`
                                        ]
                                    }
                                    onChange={this.onChangeEditor(index)}
                                    toolbarConfig={toolbarConfig}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
        return (
            <Container>
                {this.state.loading && <Spin />}
                <Title>Create Album Narratives</Title>
                <div className="new-template">
                    {/* Search Album */}
                    <SubTitle
                        style={{ paddingTop: "1em", paddingBottom: "1em" }}
                    >
                        1. Search Album
                    </SubTitle>
                    <AlbumSearch searchCallback={this.onSearchAlbums} />

                    {/* Search result */}
                    <SubTitle
                        style={{ paddingTop: "1em", paddingBottom: "1em" }}
                    >
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
                        "no album"}

                    {/* Search Narratives */}
                    <SubTitle
                        style={{ paddingTop: "1em", paddingBottom: "1em" }}
                    >
                        3. Select a Narrative
                    </SubTitle>
                    {(this.state.narratives && this.state.narratives.length && (
                        <Row gutter={16}>
                            <NarrativesDetailTable
                                narratives={this.state.narratives}
                                selected_narrative_uuid={
                                    this.state.selectedNarrativeUuid
                                }
                                onNarrativeClicked={this.onNarrativeClicked}
                            />
                        </Row>
                    )) ||
                        "no Narrative"}

                    {/* Form submit */}
                    <SubTitle
                        style={{ paddingTop: "1em", paddingBottom: "1em" }}
                    >
                        {`4. Update or Create narrative for album name:${(this
                            .state.selectedAlbum &&
                            this.state.selectedAlbum.album_name) ||
                            ""}, artist name:${(this.state.selectedAlbum &&
                            this.state.selectedAlbum.artist_name) ||
                            ""}`}
                    </SubTitle>
                    {this.state.selectedAlbum && (
                        <Form onSubmit={this.handleCreate} layout="vertical">
                            <Row gutter={16} style={{ paddingTop: "1em" }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblAuthor" className="label">
                                        Author
                                    </span>
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <FormItem>
                                        {getFieldDecorator("author", {
                                            initialValue:
                                                narrativeDetail &&
                                                narrativeDetail.user_id,
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input author"
                                                }
                                            ]
                                        })(
                                            <Input
                                                placeholder="author"
                                                style={{ width: "100%" }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ paddingTop: "1em" }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblMAINTITTLE" className="label">
                                        MAIN TITTLE
                                    </span>
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                    <FormItem>
                                        {getFieldDecorator("main_title", {
                                            initialValue:
                                                narrativeDetail &&
                                                narrativeDetail.title,
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input MAIN TITTLE"
                                                }
                                            ]
                                        })(
                                            <Input
                                                id="input_main_title"
                                                placeholder="title of narrative"
                                                style={{ width: "100%" }}
                                            />
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
                                    narrativeDetail.content_json.sections
                                        .length > 1 &&
                                    narrativeDetail.content_json.sections.map(
                                        (section, index) => {
                                            if (index > 0) {
                                                return (
                                                    <div key={index}>
                                                        <Row
                                                            gutter={16}
                                                            style={{
                                                                paddingTop:
                                                                    "1em"
                                                            }}
                                                        >
                                                            <Col
                                                                xs={3}
                                                                sm={3}
                                                                md={3}
                                                                lg={3}
                                                                xl={3}
                                                            >
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
                                                                                section.title ||
                                                                                ""
                                                                        }
                                                                    )(
                                                                        <Input
                                                                            id={`input_sub-tittle-${index}`}
                                                                            placeholder="Sub-tittle"
                                                                            style={{
                                                                                width:
                                                                                    "100%"
                                                                            }}
                                                                        />
                                                                    )}
                                                                </FormItem>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col
                                                                xs={3}
                                                                sm={3}
                                                                md={3}
                                                                lg={3}
                                                                xl={3}
                                                            >
                                                                <span
                                                                    id={`lblVideoURL_${index}`}
                                                                    className="label"
                                                                >
                                                                    Video URL
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                xs={8}
                                                                sm={8}
                                                                md={8}
                                                                lg={8}
                                                                xl={8}
                                                            >
                                                                <FormItem>
                                                                    {getFieldDecorator(
                                                                        `video_url_${index}`,
                                                                        {
                                                                            initialValue:
                                                                                section.datasource_id ||
                                                                                ""
                                                                        }
                                                                    )(
                                                                        <Input
                                                                            id={`input_video_url_${index +
                                                                                1}`}
                                                                            placeholder=" Video URL"
                                                                            style={{
                                                                                width:
                                                                                    "100%"
                                                                            }}
                                                                        />
                                                                    )}
                                                                </FormItem>
                                                            </Col>
                                                            <Col
                                                                xs={2}
                                                                sm={2}
                                                                md={2}
                                                                lg={2}
                                                                xl={2}
                                                            >
                                                                <Button
                                                                    type="danger"
                                                                    id={`lblDatasourceID_${index}`}
                                                                    onClick={this.handleFindDataSource(
                                                                        `video_url_${index}`,
                                                                        `datasourceID_${index}`
                                                                    )}
                                                                >
                                                                    Find
                                                                </Button>
                                                            </Col>
                                                            <Col
                                                                xs={2}
                                                                sm={2}
                                                                md={2}
                                                                lg={2}
                                                                xl={2}
                                                            >
                                                                <span
                                                                    id={`lblDatasourceID_${index}`}
                                                                    className="label"
                                                                >
                                                                    Datasource
                                                                    ID
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                xs={8}
                                                                sm={8}
                                                                md={8}
                                                                lg={8}
                                                                xl={8}
                                                            >
                                                                <FormItem>
                                                                    {getFieldDecorator(
                                                                        `datasourceID_${index}`,
                                                                        {
                                                                            initialValue:
                                                                                section.datasource_id ||
                                                                                ""
                                                                        }
                                                                    )(
                                                                        <Input
                                                                            id={`input_datasourceID_${index}`}
                                                                            placeholder="Datasource ID"
                                                                            style={{
                                                                                width:
                                                                                    "100%"
                                                                            }}
                                                                        />
                                                                    )}
                                                                </FormItem>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col
                                                                xs={3}
                                                                sm={3}
                                                                md={3}
                                                                lg={3}
                                                                xl={3}
                                                            />
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
                                                                            index
                                                                        )}
                                                                        toolbarConfig={
                                                                            toolbarConfig
                                                                        }
                                                                    />
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }
                                    )}
                                {subSections}
                            </Card>
                            <Row style={{ paddingTop: "1em" }}>
                                <Col xs={23}>
                                    <Button
                                        type="primary"
                                        block
                                        onClick={this.addSection}
                                    >
                                        Add Section
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <Card bordered={false}>
                                        <FormItem
                                            label={
                                                <span id="hash-tags">
                                                    Hashtags
                                                </span>
                                            }
                                        >
                                            {getFieldDecorator("hashTags", {
                                                initialValue: hashTag || ""
                                            })(
                                                <TextArea
                                                    placeholder="#TaylorSwift #Pop #Reputation #Endgame"
                                                    autosize={{
                                                        minRows: 4
                                                    }}
                                                />
                                            )}
                                        </FormItem>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <Card title="keyword" bordered={false}>
                                        <KeywordTable keywords={keywords} />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    span={24}
                                    style={{
                                        textAlign: "right",
                                        paddingTop: "1em"
                                    }}
                                >
                                    <Button
                                        id="btnCancel"
                                        onClick={this.handleCancel}
                                    >
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
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            id="btnSubmit"
                                        >
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
    form: PropTypes.object.isRequired
};
export default Form.create()(NewNarratives);
