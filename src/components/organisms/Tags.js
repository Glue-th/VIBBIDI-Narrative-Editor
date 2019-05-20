import React from 'react';
import styled from 'styled-components';

const Tags = ({
    className, tags, background, foreground,
}) => (
    <Wrapper className={className} background={background} foreground={foreground}>
        {tags
            && tags.map((tag, index) => (
                <span className="i" key={index}>
                    #
                    {tag}
                </span>
            ))}
    </Wrapper>
);

const Wrapper = styled.div`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    span {
        margin-right: 4px;
        margin-bottom: 4px;
        display: inline-block;
        padding: 1px 8px 2px;
        background: ${props => props.background || '#a17856'};
        border-radius: 11px;
        color: ${props => props.foreground || 'white'};
        text-decoration: none;
        white-space: nowrap;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 12px;
        font-style: italic;
        font-weight: 500;
    }
    b {
        font-style: italic;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 12px;
        font-weight: 500;
    }
    i {
        font-weight: 500;
    }
`;

export default Tags;
