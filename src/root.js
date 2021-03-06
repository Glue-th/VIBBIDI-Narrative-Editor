import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';
import configureStore from './configureStore';
import Routes from './Routes';
import ico from '../images/ic_launcher_512.png';

export default () => (
    <Provider store={configureStore()}>
        <Fragment>
            <Favicon url={ico} />
            <Routes />
        </Fragment>
    </Provider>
);
