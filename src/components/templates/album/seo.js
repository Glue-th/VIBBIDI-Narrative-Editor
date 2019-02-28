import React from 'react';
import styled from 'styled-components';
import FormSearhSeo from './Form/FormSearhSeo';
import SeoTable from './Table/seo-table';

class SEO extends React.Component {
    render() {
        return (
            <Container>
                <Title>SEO</Title>
                <FormSearhSeo />
                <div className="table-narratives">
                    <SeoTable />
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
    .create-narratives {
        display: flex;
        align-self: flex-end;
        padding-right: 1em;
    }
    .table-narratives {
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
export default SEO;
