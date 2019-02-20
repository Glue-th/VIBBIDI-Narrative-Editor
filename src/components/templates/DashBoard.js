import React from 'react';
import styled from 'styled-components';

class DashBoard extends React.Component {
    callback = (key) => {
        console.log(key);
    };

    render() {
        return (
            <Container>
                <Title id="title-header">Admin Vibbidi Platform</Title>
            </Container>
        );
    }
}
const Container = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em 0 0 1em;
    color: #000;
`;
const Title = styled.div`
    font-weight: 300;
    font-size: 2rem;
    span {
        color: #00688d;
    }
`;
export default DashBoard;
