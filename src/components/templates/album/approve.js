import React from 'react';
import styled from 'styled-components';
import Lnav from '../../organisms/Lnav';

class TemplateAprove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'templates',
        };
    }

    handleTab = (display) => {
        this.setState({ display });
    };

    render() {
        const list = [
            {
                id: 'templates',
                name: 'Templates',
            },
            {
                id: 'reports',
                name: 'Reports',
            },
        ];
        return (
            <Container>
                <Title>Admin Vibbidi Platform</Title>
                <StickyLnav list={list} handleTab={this.handleTab} active={this.state.display} />
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
        Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: normal;
`;
const Title = styled.div`
    font-weight: 300;
    font-size: 2rem;
    span {
        color: #00688d;
    }
`;
const StickyLnav = styled(Lnav)`
    /* margin-bottom: 24px; */
`;
export default TemplateAprove;
