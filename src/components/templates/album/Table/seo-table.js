import { Icon, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { guid } from '../../../../util/utils';
import { generateDataSeo } from '../test';

class SeoTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'Narrative ID',
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
                title: 'Album name',
                dataIndex: 'album_name',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_album_name_${template.id}` },
                    children: template.album_name,
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
                title: 'URL',
                dataIndex: 'attached_URL',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_attached_URL_${template.UUID}` },
                    children: template.attached_URL,
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
                        <Icon id={`tbl_edit_${template.UUID}`} type="edit" theme="filled" />
                        <Icon id={`tbl_plus_${template.UUID}`} type="delete" />
                    </div>
                ),
            },
        ];
        const data = generateDataSeo();
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
