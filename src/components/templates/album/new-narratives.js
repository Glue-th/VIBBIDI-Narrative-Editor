/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import {
    Button, Card, Col, Form, Input, Row, Select
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import AlbumsDetailTable from './albums-details-table';
import NarrativesDetailTable from './narratives-details-table';
import AlbumSearch from '../../organisms/SearchAlbum/index';
import {
    getAlbumNarratives,
    getNarrativeDetail,
    createNarrative,
    updateNarrative,
} from '../../../api/index';
import { dummyJsonContent } from './test';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { TextArea } = Input;

class NewNarratives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            selected_album_uuid: null,
            selected_narrative_uuid: null,
            narratives: [],
            narrative_detail: null,
        };
    }

    onAlbumClicked = albumUuid => {
        this.setState({ selected_album_uuid: albumUuid, narratives: [] });
        getAlbumNarratives(albumUuid)
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
                this.setState({ narrative_detail: narrative });
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Container>
                <Title>Create Album Narratives</Title>
                <div className="new-template">
                    {/* Search Album */}
                    <SubTitle style={{ paddingTop: '2em' }}>1. Search Album</SubTitle>
                    <AlbumSearch searchCallback={this.onSearchAlbums} />

                    {/* Search result */}
                    <SubTitle>2. Select an Album</SubTitle>
                    {(this.state.albums && this.state.albums.length && (
                        <Row gutter={16}>
                            <AlbumsDetailTable
                                albums={this.state.albums}
                                selected_album_uuid={this.state.selected_album_uuid}
                                onAlbumClicked={this.onAlbumClicked}
                            />
                        </Row>
                    )) ||
                        'no album'}

                    {/* Search Narratives */}
                    <SubTitle style={{ paddingTop: '2em' }}>3. Select a Narrative</SubTitle>
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
                    <SubTitle style={{ paddingTop: '2em' }}>
                        4. Update or Create narrative for&nbsp;
                        {this.state.selected_album_uuid}
                    </SubTitle>
                    {(this.state.selected_album_uuid && (
                        <Form onSubmit={this.handleSave} layout="vertical">
                            <Row gutter={16} style={{ paddingTop: '2em' }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblMAINTITTLE" className="label">
                                        MAIN TITTLE
                                    </span>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <FormItem>
                                        {getFieldDecorator('main_title', {
                                            initialValue:
                                                (this.state.narrative_detail &&
                                                    this.state.narrative_detail.title) ||
                                                '',
                                            rules: [
                                                {
                                                    max: 256,
                                                    message:
                                                        'Please input less than 256 character!',
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
                                <Card>
                                    <Row>
                                        <Col xs={8} />

                                        <Col xs={8}>
                                            <FormItem label={<span id="'URLembed">URLembed</span>}>
                                                {getFieldDecorator('reason')(
                                                    <Select
                                                        allowClear
                                                        getPopupContainer={triggerNode =>
                                                            triggerNode.parentNode
                                                        }
                                                        placeholder="'@The game - URL embed"
                                                    >
                                                        <SelectOption value={1}>
                                                            The game - Artist
                                                        </SelectOption>
                                                        <SelectOption value={2}>
                                                            The game - Single
                                                        </SelectOption>
                                                    </Select>,
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={8} />
                                    </Row>
                                </Card>
                            </Row>
                            <Row gutter={16} style={{ paddingTop: '2em' }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblSub-tittle-1" className="label">
                                        Sub-tittle 1
                                    </span>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <FormItem>
                                        {getFieldDecorator('sub-tittle-1', {
                                            rules: [
                                                {
                                                    max: 256,
                                                    message:
                                                        'Please input less than 256 character!',
                                                },
                                            ],
                                        })(
                                            <Input
                                                id="input_sub-tittle-1"
                                                placeholder="Sub-tittle"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblVideoURL_1" className="label">
                                        Video URL
                                    </span>
                                </Col>
                                <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                    <FormItem>
                                        {getFieldDecorator('video_url_1')(
                                            <Input
                                                id="input_video_url_1"
                                                placeholder=" Video URL"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblDatasourceID_1" className="label">
                                        Datasource ID
                                    </span>
                                </Col>
                                <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                    <FormItem>
                                        {getFieldDecorator('datasourceID_1')(
                                            <Input
                                                id="input_datasourceID_1"
                                                placeholder="Datasource ID"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Card />
                            </Row>
                            <Row gutter={16} style={{ paddingTop: '2em' }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblSub-tittle-2" className="label">
                                        Sub-tittle 2
                                    </span>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <FormItem>
                                        {getFieldDecorator('sub-tittle-2', {
                                            rules: [
                                                {
                                                    max: 256,
                                                    message:
                                                        'Please input less than 256 character!',
                                                },
                                            ],
                                        })(
                                            <Input
                                                id="input_sub-tittle-2"
                                                placeholder="Sub-tittle"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblVideoURL_2" className="label">
                                        Video URL
                                    </span>
                                </Col>
                                <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                    <FormItem>
                                        {getFieldDecorator('video_url_2')(
                                            <Input
                                                id="input_video_url_2"
                                                placeholder=" Video URL"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblDatasourceID_2" className="label">
                                        Datasource ID
                                    </span>
                                </Col>
                                <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                    <FormItem>
                                        {getFieldDecorator('datasourceID_2')(
                                            <Input
                                                id="input_datasourceID_2"
                                                placeholder="Datasource ID"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Card />
                            </Row>
                            <Row gutter={16} style={{ paddingTop: '2em' }}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblSub-tittle-3" className="label">
                                        Sub-tittle 3
                                    </span>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <FormItem>
                                        {getFieldDecorator('sub-tittle-3', {
                                            rules: [
                                                {
                                                    max: 256,
                                                    message:
                                                        'Please input less than 256 character!',
                                                },
                                            ],
                                        })(
                                            <Input
                                                id="input_sub-tittle-3"
                                                placeholder="Sub-tittle"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblVideoURL_1" className="label">
                                        Video URL
                                    </span>
                                </Col>
                                <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                    <FormItem>
                                        {getFieldDecorator('video_url_3')(
                                            <Input
                                                id="input_video_url_3"
                                                placeholder=" Video URL"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <span id="lblDatasourceID_3" className="label">
                                        Datasource ID
                                    </span>
                                </Col>
                                <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                    <FormItem>
                                        {getFieldDecorator('datasourceID_3')(
                                            <Input
                                                id="input_datasourceID_3"
                                                placeholder="Datasource ID"
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Card />
                            </Row>
                            <Col xs={24} style={{ paddingTop: '2em' }}>
                                <FormItem label={<span id="hashtags">Hashtags</span>}>
                                    {getFieldDecorator('hashtags')(
                                        <TextArea
                                            placeholder="#TaylorSwift #Pop #Reputation #Endgame"
                                            autosize={{
                                                minRows: 4,
                                                maxRows: 6,
                                            }}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
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
        .ant-card-wider-padding .ant-card-body {
            padding: 2em 0;
        }
        .label {
            float: right;
        }
        button {
            margin-left: 16px;
        }
        #lblThreshold {
            padding-bottom: 20px;
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
