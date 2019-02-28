import {
    Button, Col, Form, Input, Row,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { searchAlbums } from '../../../api/index';

const FormItem = Form.Item;

class AlbumSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        if (this.props.searchCallback) {
            this.props.searchCallback([], true);
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { album_name, artist_name } = values;
                searchAlbums(album_name, artist_name)
                    .then(res => res.data.albums)
                    .then((albums) => {
                        // console.log(albums);
                        if (this.props.searchCallback) {
                            this.props.searchCallback(albums);
                        }
                    })
                    .catch((e) => {
                        console.log(e.meesage);
                        if (this.props.searchCallback) {
                            this.props.searchCallback([], false);
                        }
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form onSubmit={this.handleSearch} layout="vertical">
                <Row gutter={16}>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                        <FormItem label="Album Name" {...formItemLayout}>
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
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                        <FormItem label="Artist Name" {...formItemLayout}>
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
            </Form>
        );
    }
}
AlbumSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchCallback: PropTypes.func.isRequired,
};
export default Form.create()(AlbumSearch);
