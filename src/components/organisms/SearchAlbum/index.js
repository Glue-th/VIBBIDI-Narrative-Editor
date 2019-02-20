import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { searchAlbums } from '../../../api/index';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { TextArea } = Input;

class AlbumSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        console.log('search');
        if (this.props.searchCallback) {
            this.props.searchCallback();
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { album_name, artist_name } = values;
                searchAlbums(album_name, artist_name)
                    .then(res => res.data.albums)
                    .then(albums => {
                        console.log(albums);
                        if (this.props.searchCallback) {
                            this.props.searchCallback(albums);
                        }
                    })
                    .catch(e => console.log(e.meesage));
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
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
                                        message:
                                            'Please input less than 256 character!',
                                    },
                                ],
                            })(
                                <Input
                                    id="input_album_name"
                                    placeholder="Album Name"
                                    style={{ width: '100%' }}
                                />
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
                                        message:
                                            'Please input less than 256 character!',
                                    },
                                ],
                            })(
                                <Input
                                    id="input_artist_name"
                                    placeholder="Artist Name"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                        style={{ textAlign: 'right' }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            id="btnSearch-report"
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
AlbumSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchCallback: PropTypes.function,
};
export default Form.create()(AlbumSearch);
