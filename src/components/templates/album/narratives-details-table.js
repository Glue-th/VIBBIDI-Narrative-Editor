import { Icon, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { generateDataAlbum } from './test';
import { guid } from '../../../util/utils';

class NarrativesDetailsTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'Album UUID',
                dataIndex: 'UUID',
                key: guid(),
                fixed: 'left',
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_id_${template.UUID}` },
                    children: template.UUID,
                }),
            },
            {
                title: 'Album name',
                dataIndex: 'album_name',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_album_name_${template.UUID}` },
                    children: template.album_name,
                }),
            },
            {
                title: 'Artist name',
                dataIndex: 'artist_name',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_artist_name_${template.UUID}` },
                    children: template.artist_name,
                }),
            },
            {
                title: 'Vibbidi URL',
                dataIndex: 'vibbidi_url',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_vibbidi_url_${template.UUID}` },
                    children: template.vibbidi_url,
                }),
            },
        ];
        const data = generateDataAlbum();
        return (
            <Container>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    size="small"
                    id="tbl_narrative_template"
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
export default NarrativesDetailsTable;
