import {
    Button, Card, Col, Form, Input, Row, Select,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import NarrativesDetailsTable from './narratives-details-table';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { TextArea } = Input;
class NewNarratives extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Container>
                <Title>Create Album Narratives</Title>
                <div className="new-template">
                    <Form onSubmit={this.handleSearch} layout="vertical">
                        <Row gutter={16}>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                <span id="lblAlbumName" className="label">
                                    Album name
                                </span>
                            </Col>
                            <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                <FormItem>
                                    {getFieldDecorator('album_name', {
                                        rules: [
                                            {
                                                max: 256,
                                                message: 'Please input less than 256 character!',
                                            },
                                        ],
                                    })(
                                        <Input
                                            id="input_album_name"
                                            placeholder="Album Name"
                                            style={{ width: '100%' }}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                <span id="lblArtistName" className="label">
                                    Artist name
                                </span>
                            </Col>
                            <Col xs={6} sm={8} md={6} lg={6} xl={6}>
                                <FormItem>
                                    {getFieldDecorator('artist_name', {
                                        rules: [
                                            {
                                                max: 256,
                                                message: 'Please input less than 256 character!',
                                            },
                                        ],
                                    })(
                                        <Input
                                            id="input_artist_name"
                                            placeholder="Artist Name"
                                            style={{ width: '100%' }}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" id="btnSearch-report">
                                    Search
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <NarrativesDetailsTable />
                        </Row>
                        <Row gutter={16}>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                <span id="lblMAINTITTLE" className="label">
                                    MAIN TITTLE
                                </span>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <FormItem>
                                    {getFieldDecorator('main_title', {
                                        rules: [
                                            {
                                                max: 256,
                                                message: 'Please input less than 256 character!',
                                            },
                                        ],
                                    })(
                                        <Input
                                            id="input_main_title"
                                            placeholder="MAIN TITTLE"
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
                                                    getPopupContainer={triggerNode => triggerNode.parentNode
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
                        <Row gutter={16}>
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
                                                message: 'Please input less than 256 character!',
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
                        <Row gutter={16}>
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
                                                message: 'Please input less than 256 character!',
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
                        <Row gutter={16}>
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
                                                message: 'Please input less than 256 character!',
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
                        <Col xs={24}>
                            <FormItem label={<span id="hashtags">Hashtags</span>}>
                                {getFieldDecorator('hashtags')(
                                    <TextArea
                                        placeholder="#TaylorSwift #Pop #Reputation #Endgame"
                                        autosize={{ minRows: 4, maxRows: 6 }}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button id="btnCancel">Cancel</Button>
                                <Button id="btnSave">Save</Button>
                                <Button type="primary" htmlType="submit" id="btnSubmit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
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
NewNarratives.propTypes = {
    form: PropTypes.object.isRequired,
};
export default Form.create()(NewNarratives);
