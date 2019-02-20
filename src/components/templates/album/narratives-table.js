import { Icon, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { generateData } from './test';
import { guid } from '../../../util/utils';

class NarrativesTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: guid(),
                fixed: 'left',
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_id_${template.id}` },
                    children: template.id,
                }),
            },
            {
                title: 'UUID Album',
                dataIndex: 'UUID',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_UUID_${template.id}` },
                    children: template.UUID,
                }),
            },
            {
                title: 'Main Title',
                dataIndex: 'main_title',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_main_title_${template.id}` },
                    children: template.main_title,
                }),
            },
            {
                title: 'Sub Title',
                dataIndex: 'sub_title',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_sub_title_${template.id}` },
                    children: template.sub_title,
                }),
            },
            // {
            //     title: 'content',
            //     dataIndex: 'content',
            //     key: guid(),
            //     align: 'center',
            //     render: (text, template) => ({
            //         props: { id: `tbl_content_${template.id}` },
            //         children: template.content,
            //     }),
            // },
            {
                title: 'Video Youtube link',
                dataIndex: 'youtube_link',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_youtube_link_${template.id}` },
                    children: template.youtube_link,
                }),
            },
            {
                title: 'Vibbidi single page',
                dataIndex: 'single_page',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_single_page_${template.id}` },
                    children: template.single_page,
                }),
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_owner_${template.id}` },
                    children: template.owner,
                }),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_status_${template.id}` },
                    children: template.status,
                }),
            },
            {
                title: 'Comments',
                dataIndex: 'comments',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_comments_${template.id}` },
                    children: template.comments,
                }),
            },
            {
                title: 'Action',
                dataIndex: 'gender',
                key: guid(),
                fixed: 'right',
                align: 'center',
                render: (text, template) => (
                    <div id={`tbl_detail_${template.id}`}>
                        <Icon id={`tbl_detail_${template.id}`} type="eye" />
                        <Icon id={`tbl_edit_${template.id}`} type="edit" theme="filled" />
                        <Icon id={`tbl_plus_${template.id}`} type="plus" />
                    </div>
                ),
            },
        ];
        const data = generateData();
        return (
            <Container>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    size="small"
                    id="tbl_narrative_template"
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
        display: block;
        /* width: 100px !important; */
    }
`;
export default NarrativesTable;
