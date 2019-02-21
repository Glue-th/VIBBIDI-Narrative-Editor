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
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
    createNarrative,
    getAlbumNarratives,
    getNarrativeDetail,
    updateNarrative,
} from '../../../api/index';
import AlbumSearch from '../../organisms/SearchAlbum/index';
import AlbumsDetailTable from './albums-details-table';
import NarrativesDetailTable from './narratives-details-table';
import { dummyJsonContent } from './test';

const FormItem = Form.Item;
const { TextArea } = Input;

class NewNarratives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            selected_album: null,
            selected_narrative_uuid: null,
            narratives: [],
            narrativeDetail: null,
            numberSubSection: 0,
        };
    }

    onAlbumClicked = album => {
        this.setState({ selected_album: album, narratives: [] });
        console.log(album);
        getAlbumNarratives(album.id)
            .then(res => res.data.narratives)
            .then(narratives => {
                console.log('narratives', narratives);
                this.setState({ narratives });
            })
            .catch(e => console.log(e.message));
    };

    onNarrativeClicked = narrativeUuid => {
        if (this.state.selected_narrative_uuid === narrativeUuid) {
            this.setState({ selected_narrative_uuid: null });
            return;
        }
        this.setState({ selected_narrative_uuid: narrativeUuid });
        getNarrativeDetail(narrativeUuid)
            .then(res => res.data)
            .then(narrative => {
                console.log('narrative', narrative);
                this.setState({ narrativeDetail: narrative });
            })
            .catch(e => console.log(e.message));
    };

    onSearchAlbums = albums => {
        this.setState({ albums: albums || [] });
    };

    handleCreate = e => {
        e.preventDefault();
        console.log('create');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                createNarrative(
                    '5F5D505C73B6467C995C517B3C4638EC', // album_id
                    '33554566518315', // user_id
                    'test-create', // title
                    dummyJsonContent, // content_json
                );
            }
        });
    };

    handleSave = e => {
        e.preventDefault();
        console.log('update');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateNarrative(
                    '1AD72246B5F3436ABD9B154385E1B412', // narrative_id
                    '5F5D505C73B6467C995C517B3C4638EC', // album_id
                    '33554566518315', // user_id
                    'test-update', // title
                    dummyJsonContent, // content_json
                );
            }
        });
    };

    addSection = () => {
        this.setState(prevState => ({ numberSubSection: prevState.numberSubSection + 1 }));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { narrativeDetail, numberSubSection } = this.state;
        let start = 1;
        if (
            narrativeDetail &&
            narrativeDetail.content_json &&
            narrativeDetail.content_json.sections
        ) {
            start = narrativeDetail.content_json.sections.length;
        }
        const subSections = [];
        for (let index = start; index < numberSubSection + start; index += 1) {
            subSections.push(
                <div>
                    <Row gutter={16} style={{ paddingTop: '1em' }}>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                            <span id={`lblSub-tittle-${index}`} className="label">
                                {`Sub-tittle ${index}`}
                            </span>
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <FormItem>
                                {getFieldDecorator(`sub-tittle-${index}`)(
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
                            <span id={`lblVideoURL_${index}`} className="label">
                                Video URL
                            </span>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <FormItem>
                                {getFieldDecorator(`video_url_${index}`)(
                                    <Input
                                        id={`input_video_url_${index}`}
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
                                {getFieldDecorator(`datasourceID_${index}`)(
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
                        <Card bordered={false}>
                            <FormItem label={<span id={`sub_content_${index}`}>Content</span>}>
                                {getFieldDecorator(`sub_content_${index}`)(
                                    <TextArea
                                        // placeholder=""
                                        autosize={{
                                            minRows: 6,
                                        }}
                                    />,
                                )}
                            </FormItem>
                        </Card>
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
                                selected_album={this.state.selected_album}
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
                                selected_narrative_uuid={this.state.selected_narrative_uuid}
                                onNarrativeClicked={this.onNarrativeClicked}
                            />
                        </Row>
                    )) ||
                        'no Narrative'}

                    {/* Form submit */}
                    <SubTitle style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                        {`4. Update or Create narrative for album name:${(this.state
                            .selected_album &&
                            this.state.selected_album.album_name) ||
                            ''}, artist name:${(this.state.selected_album &&
                            this.state.selected_album.artist_name) ||
                            ''}`}
                    </SubTitle>
                    {(this.state.selected_album && (
                        <Form onSubmit={this.handleSave} layout="vertical">
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
                                <Card bordered={false}>
                                    <FormItem label={<span id="main_content">Content</span>}>
                                        {getFieldDecorator('main_content', {
                                            initialValue:
                                                (narrativeDetail &&
                                                    narrativeDetail.content_json &&
                                                    narrativeDetail.content_json.sections &&
                                                    narrativeDetail.content_json.sections.length >
                                                        0 &&
                                                    narrativeDetail.content_json.sections[0]
                                                        .content) ||
                                                '',
                                        })(
                                            <TextArea
                                                // placeholder=""
                                                autosize={{
                                                    minRows: 6,
                                                }}
                                            />,
                                        )}
                                    </FormItem>
                                </Card>
                            </Row>
                            <Card title="Sections" bordered={false}>
                                {narrativeDetail &&
                                    narrativeDetail.content_json &&
                                    narrativeDetail.content_json.sections &&
                                    narrativeDetail.content_json.sections.length > 1 &&
                                    narrativeDetail.content_json.sections.map((section, index) => {
                                        if (index > 0) {
                                            return (
                                                <div>
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
                                                        <Card bordered={false}>
                                                            <FormItem
                                                                label={
                                                                    <span
                                                                        id={`sub_content_${index}`}
                                                                    >
                                                                        Content
                                                                    </span>
                                                                }
                                                            >
                                                                {getFieldDecorator(
                                                                    `sub_content_${index}`,
                                                                    {
                                                                        initialValue:
                                                                            section.content || '',
                                                                    },
                                                                )(
                                                                    <TextArea
                                                                        // placeholder=""
                                                                        autosize={{
                                                                            minRows: 6,
                                                                        }}
                                                                    />,
                                                                )}
                                                            </FormItem>
                                                        </Card>
                                                    </Row>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                {subSections}
                            </Card>
                            <Row>
                                <Col xs={23}>
                                    <Button type="primary" block onClick={this.addSection}>
                                        Add Section
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <Card bordered={false}>
                                        <FormItem label={<span id="hash-tags">Hashtags</span>}>
                                            {getFieldDecorator('hash-tags')(
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
                                    <Button id="btnCancel">Cancel</Button>
                                    <Button id="btnSave" onClick={this.handleSave}>
                                        Save
                                    </Button>
                                    <Button type="primary" htmlType="submit" id="btnSubmit">
                                        Create
                                    </Button>
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
        button {
            margin-left: 16px;
        }
        #lblThreshold {
            padding-bottom: 20px;
        }
        .ant-card-wider-padding .ant-card-body {
            padding: 2em 2em;
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
