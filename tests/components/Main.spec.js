import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../src/components/Main';

describe('<Main />', () => {
    it('Should render correctly', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper).toMatchSnapshot();
    });
});
