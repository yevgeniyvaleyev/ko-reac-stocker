import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FetchError from '../fetch-error';

describe('<FetchError>', () => {
  it('should render component', () => {
    const data = {
      message: 'test',
      onRetry: () => {},
    };
    const wrapper = shallow(<FetchError {...data} />);

    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('FlatButton')).to.have.length(1);
  });
});
