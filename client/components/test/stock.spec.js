import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Stock from '../stock';

describe('<Stock>', () => {
  it('should render component', () => {
    const data = {
      id: 1,
      name: 'test',
      currentPrice: 111,
    };
    const wrapper = shallow(<Stock {...data} />);

    expect(wrapper.find('.stock-name')).to.have.length(1);
    expect(wrapper.find('.stock-price')).to.have.length(1);
  });
});
