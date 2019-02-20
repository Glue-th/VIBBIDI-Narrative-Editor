import { Divider } from 'antd';
import moment from 'moment';
import 'moment-jdateformatparser';
import 'moment-timezone';
import React, { PureComponent } from 'react';
import Clock from 'react-live-clock';
import styled from 'styled-components';

export default class TimezoneBar extends PureComponent {
    render() {
        const {
            tzShowDatetime,
            tzShowTimezone,
            dateFormat,
            timeFormat,
            timezone,
            timezoneName,
            className,
        } = this.props;
        const format = `${moment().toMomentFormatString(
            dateFormat,
        )}[ | ] ${moment().toMomentFormatString(timeFormat)}`;
        return tzShowDatetime || tzShowTimezone ? (
            <React.Fragment>
                <Divider type="vertical" style={{ height: '70%' }} />
                <Wrapper className={`${className} timezone`}>
                    <p>
                        {tzShowTimezone ? <span id="time_zone_name">{timezoneName}</span> : ''}
                        {tzShowDatetime ? (
                            <span id="date_time_current">
                                <Clock format={format} ticking timezone={timezone} />
                            </span>
                        ) : (
                            ''
                        )}
                    </p>
                </Wrapper>
            </React.Fragment>
        ) : null;
    }
}
const Wrapper = styled.span`
    p {
        display: inline-block;
        & > span {
            margin: 3px 0;
            display: block;
            font-size: 12px;
            font-weight: 300;
            font-style: normal;
            line-height: 100%;
        }
    }
`;
