import { Icon, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { guid } from '../../../util/utils';
import { generateDataReport } from './test';

class SeoTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'UUID Album',
                dataIndex: 'UUID',
                key: guid(),
                fixed: 'left',
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_UUID_${template.UUID}` },
                    children: template.UUID,
                }),
            },
            {
                title: 'Keyword',
                dataIndex: 'keyword',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_keyword_${template.UUID}` },
                    children: template.keyword,
                }),
            },
            {
                title: 'Attached URL',
                dataIndex: 'attached_URL',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_attached_URL_${template.UUID}` },
                    children: template.attached_URL,
                }),
            },
            {
                title: 'content',
                dataIndex: 'content',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_content_${template.UUID}` },
                    children: template.content,
                }),
            },
            {
                title: 'Hashtag',
                dataIndex: 'hashtag',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_hashtag_${template.UUID}` },
                    children: template.hashtag,
                }),
            },
            {
                title: 'Action',
                dataIndex: 'gender',
                key: guid(),
                fixed: 'right',
                align: 'center',
                render: (text, template) => (
                    <div id={`tbl_detail_${template.UUID}`}>
                        <Icon id={`tbl_detail_${template.UUID}`} type="eye" />
                        <Icon id={`tbl_edit_${template.UUID}`} type="edit" theme="filled" />
                        <Icon id={`tbl_plus_${template.UUID}`} type="plus" />
                    </div>
                ),
            },
        ];
        const data = generateDataReport();
        return (
            <Container>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    size="small"
                    id="tbl_narrative_report"
                    // pagination={pagination}
                    scroll={{ x: true }}
                />
            </Container>
        );
    }
}
const Container = styled.div`
    .ant-table td {
        white-space: nowrap;
    }
    .anticon {
        padding: 5px;
    }
    table {
        /* display: block; */
        /* width: 100px !important; */
    }
`;
export default SeoTable;
