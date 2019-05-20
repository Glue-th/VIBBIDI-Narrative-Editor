import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';
// import WrittenBy from './WrittenBy';
import Tags from './Tags';

const Header = ({ narrative, tags, title }) => (
    <Wrapper>
        {/* <span className="updated-at">
            {(narrative && millisToFormat(parseInt(publishedAt))) || ''}
        </span> */}
        <Heading level="2" className="heading">
            {title || ''}
        </Heading>

        {/* <WrittenBy author={narrative && narrative.author} readingTime={narrative.readMins} /> */}

        <Tags tags={tags} />
    </Wrapper>
);

const Wrapper = styled.div`
    padding: 15px 30px;
    .updated-at {
        font-family: Barlow;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.5);
    }
    .heading {
        margin: 4px 0 0 0;
        font-family: Barlow Semi Condensed;
        font-style: normal;
        font-weight: 500;
        font-size: 27px;
        line-height: 33px;
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }
`;

export default Header;
