import React from 'react';
import styled from 'styled-components';
import FormSearhAlbumNarratives from './Form/FormSearhAlbumNarratives';
import NarrativesTable from './Table/narratives-table';

class AlbumNarratives extends React.Component {
    render() {
        return (
            <Container>
                <Title>Admin Vibbidi Platform</Title>
                <FormSearhAlbumNarratives />
                <div className="table-template">
                    <NarrativesTable />
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
    .create-template {
        display: flex;
        align-self: flex-end;
        padding-right: 1em;
    }
    .table-template {
        padding-top: 20px;
    }
`;
const Title = styled.div`
    font-weight: 300;
    font-size: 2rem;
    span {
        color: #00688d;
    }
`;
export default AlbumNarratives;
