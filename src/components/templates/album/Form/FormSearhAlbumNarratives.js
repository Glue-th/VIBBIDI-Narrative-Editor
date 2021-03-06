import {
    Button, Col, Form, Input, Row,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const FormItem = Form.Item;
class FormSearhAlbumNarratives extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return (
            <Container>
                <Form onSubmit={this.handleSearch} layout="horizontal">
                    <Row gutter={16}>
                        <Col xs={12} sm={24} md={24} lg={12} xl={12}>
                            <FormItem label="Narrative ID" {...formItemLayout}>
                                {getFieldDecorator('id')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col xs={12} sm={24} md={24} lg={12} xl={12}>
                            <FormItem label="Album name" {...formItemLayout}>
                                {getFieldDecorator('id')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={12} sm={24} md={24} lg={12} xl={12}>
                            <FormItem label="Album UUID" {...formItemLayout}>
                                {getFieldDecorator('id')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col xs={12} sm={24} md={24} lg={12} xl={12}>
                            <FormItem label="Status" {...formItemLayout}>
                                {getFieldDecorator('id')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={12} sm={24} md={24} lg={12} xl={12}>
                            <FormItem label="Author" {...formItemLayout}>
                                {getFieldDecorator('id')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col
                            xs={12}
                            sm={12}
                            md={24}
                            lg={12}
                            xl={12}
                            style={{ textAlign: 'right', paddingRight: '2em' }}
                        >
                            <Button type="primary" htmlType="submit" id="btnSearch-report">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
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
`;
FormSearhAlbumNarratives.propTypes = {
    form: PropTypes.object.isRequired,
};
export default Form.create()(FormSearhAlbumNarratives);
