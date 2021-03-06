/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable lines-between-class-members */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { Icon, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { guid } from '../../../util/utils';

class VideoDataTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'Youtube URL',
                dataIndex: 'uri',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    children: template.uri,
                }),
            },
            {
                title: 'Action',
                dataIndex: '',
                key: guid(),
                // fixed: 'right',
                align: 'center',
                render: (text, template) => (
                    <div>
                        <Icon type="eye" />
                    </div>
                ),
            },
            {
                title: 'Datasource Id',
                dataIndex: 'datasourceId',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    children: template.datasourceId,
                }),
            },
        ];
        return (
            <Container>
                <Table
                    columns={columns}
                    dataSource={this.props.videoDatas}
                    bordered
                    size="small"
                    // pagination={pagination}
                    pagination={false}
                    scroll={{ x: true }}
                />
            </Container>
        );
    }
}
const Container = styled.div`
    .ant-table td {
        /* white-space: nowrap; */
    }
    .anticon {
        padding: 5px;
    }
    table {
        /* display: block; */
        /* width: 100px !important; */
    }
`;
export default VideoDataTable;
