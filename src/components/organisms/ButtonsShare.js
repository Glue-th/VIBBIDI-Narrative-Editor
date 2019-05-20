import styled from 'styled-components';
import { withSnackbar } from 'notistack';

import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Tags from './Tags';
import IcoFacebook from './IcoFacebook';
import IcoTwitter from './IcoTwitter';
import IconLink from './IcoLink';
import { DOMAIN } from '../../../constants/index';
import { showNoti } from '../../../lib/noti';
import { subStr, copyToClipboard } from '../../../lib/index';

class Footer extends React.Component {
    copyLink = () => {
        const { shareUrl } = this.props;
        copyToClipboard(encodeURI(shareUrl));
        showNoti(this, 'Copied to clipboard!');
    };

    render() {
        const {
            shareUrl, title, tags, position = 'center',
        } = this.props;
        return (
            <Wrapper position={position}>
                <ul className="share">
                    <li>
                        <FacebookShareButton url={encodeURI(shareUrl || DOMAIN)} hashtag="#vibbidi">
                            <IcoFacebook />
                        </FacebookShareButton>
                    </li>
                    <li>
                        <TwitterShareButton
                            url={encodeURI(shareUrl || DOMAIN)}
                            title={subStr(title || 'Listening ')}
                            via={DOMAIN}
                            hashtags={tags || ['vibbidi', 'free stream music']}
                        >
                            <IcoTwitter />
                        </TwitterShareButton>
                    </li>
                    <li>
                        <button onClick={this.copyLink}>
                            <IconLink />
                        </button>
                    </li>
                </ul>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding-top: 8px;

    .share {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: ${props => props.position};
        li {
            margin-right: 16px;
            &:last-child {
                margin: 0;
            }
        }
    }
`;

export default withSnackbar(Footer);
