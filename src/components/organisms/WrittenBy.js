import styled from 'styled-components';
import { convertAuthor } from '../../util/index';

class WrittenBy extends React.Component {
    render() {
        const {
            className, author, surfix, readingTime, noWrittenBy, noAt,
        } = this.props;
        const _author = convertAuthor(author);
        return (
            <Wrapper className={className}>
                <div className="meta__img">
                    <a
                        href={
                            'https://www.vibbidi.net'
                            + `/user?username=${author && author.username}`
                        }
                        target="_blank"
                    >
                        <img src={author.profilePictureUrl} alt={author.username} />
                    </a>
                </div>
                <div className="meta__body">
                    <div className="meta__reviewedBy">
                        {!noWrittenBy && <span className="written-by">Written by&nbsp;</span>}
                        {!noAt && '@'}
                        <a
                            href={
                                'https://www.vibbidi.net'
                                + `/user?username=${author && author.username}`
                            }
                        >
                            <a>{author.username}</a>
                        </a>

                        {_author.blogTitle && _author.blogUri && (
                            <>
                                &nbsp;from&nbsp;
                                <a href={_author.blogUri} target="_blank" className="txt-blog">
                                    {_author.blogTitle}
                                    &nbsp;
                                </a>
                            </>
                        )}
                        {readingTime && <ReadingTime readingTime={readingTime} />}
                        {surfix || ''}
                    </div>
                </div>
            </Wrapper>
        );
    }
}

const ReadingTime = props => (
    <React.Fragment>
        {''}
        {' '}
/
        {props.readingTime || '-'}
        {props.readingTime > 0 ? ' mins read' : ' min read'}
    </React.Fragment>
);

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    .written-by {
        /* font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 13px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.02em; */
        /* color: rgba(255, 255, 255, 0.6); */
    }
    /* .readingTime {
    font-size: 13px;
    line-height: 20px;
    font-weight: 400;
  } */

    a {
        text-decoration: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.2s ease;

        &:hover {
            border-bottom: 1px solid currentColor;
        }
    }

    .meta__img {
        margin-right: 8px;
        cursor: pointer;
        img {
            width: 32px;
            height: 32px;
            border-radius: 32px;
        }
    }
    .meta__body {
        font-family: 'Barlow Semi Condensed', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }
    .txt-blog {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export default WrittenBy;
