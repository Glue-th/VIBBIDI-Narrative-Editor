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
import { generateDataAlbum } from './test';
import { guid } from '../../../util/utils';

class AlbumsDetailsTable extends React.Component {
    onItemClick = album => () => {
        // console.log('item click:', e.target.innerText);
        // const uuid = e.target.innerText;
        if (this.props.onAlbumClicked) {
            this.props.onAlbumClicked(album);
        }
    };
    render() {
        const columns = [
            {
                title: 'Album UUID',
                dataIndex: 'id',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_id_${template.id}` },
                    children: (
                        <span
                            onClick={this.onItemClick(template)}
                            style={{
                                color:
                                    template.id ===
                                    (this.props.selected_album && this.props.selected_album.id)
                                        ? 'red'
                                        : 'black',
                                cursor: 'pointer',
                            }}
                        >
                            {template.id}
                        </span>
                    ),
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
                title: 'Artist name',
                dataIndex: 'artist_name',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_artist_name_${template.id}` },
                    children: template.artist_name,
                }),
            },
            {
                title: 'Vibbidi URL',
                dataIndex: 'web_url',
                key: guid(),
                align: 'center',
                render: (text, template) => ({
                    props: { id: `tbl_web_url_${template.id}` },
                    children: (
                        <a href={'https://st-www.vibbidi.net' + template.web_url} target="_blank">
                            {template.web_url}
                        </a>
                    ),
                }),
            },
        ];
        // const data = generateDataAlbum();
        return (
            <Container>
                <Table
                    columns={columns}
                    dataSource={this.props.albums}
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
export default AlbumsDetailsTable;
