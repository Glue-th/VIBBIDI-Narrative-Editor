import isEqual from 'lodash/isEqual';
import React from 'react';
import styled from 'styled-components';

class Heading extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.level !== nextProps.level || this.props.className !== nextProps.className) {
            return true;
        }
        if (!isEqual(this.props.children, nextProps.children)) {
            return true;
        }
        return false;
    }

    render() {
        const {
            children, level = 2, className, ...props
        } = this.props;
        const _level = Math.max(1, Math.min(6, level));
        const headingTag = `h${_level}`;
        return (
            <Wrapper as={headingTag} className={className} {...props}>
                {children}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    margin-top: 0;
    &.heading-genretop,
    &.heading-xl {
        font-size: 34px;
        font-weight: 500;
        letter-spacing: 1px;
        text-transform: uppercase;
        line-height: 1;
    }

    &.heading-lg {
        font-size: 40px;
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.5px;
        margin-bottom: 0.25em;
    }
    &.heading-md {
        font-family: var(--ff-tertiary);
        font-size: 24px;
        font-weight: 400;
        line-height: 1;
        text-transform: capitalize;
        letter-spacing: -0.5px;
        text-align: center;
        i {
            font-family: var(--ff-secondary);
            margin-left: 0.75em;
            margin-bottom: 1em;
            font-size: 10px;
            font-weight: 500;
            font-style: normal;
            color: rgba(255, 255, 255, 0.38);
            vertical-align: top;
            user-select: none;
        }
    }
    &.heading-search-results {
        font-family: var(--ff-primary);
        font-size: 24px;
        font-weight: 500;
        line-height: 1;
        text-transform: capitalize;
        letter-spacing: 1px;
        text-align: center;
    }
    &.heading-sm {
        font-size: 16px;
        font-weight: 500;
        line-height: 1;
    }
    &.heading-xs {
        font-size: 14px;
        font-weight: 400;
    }
`;

export default Heading;
