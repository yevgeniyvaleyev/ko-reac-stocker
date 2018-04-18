import React from 'react';
import renderer from 'react-test-renderer';
import FetchError from '../../components/fetch-error';
import Enzyme, { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('should render component', () => {
  const data = {
    message: 'test',
    onRetry: () => {},
  };
  const component = renderer.create(
    <MuiThemeProvider>
      <FetchError {...data} />
    </ MuiThemeProvider>,
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('FetchError has proper message', () => {
  const mockFn = jest.fn();
  const data = {
    message: 'test',
    onRetry: mockFn,
  };
  const component = shallow(<FetchError {...data} />);

  expect(component.find('span').text()).toEqual(`Can't fetch stocks. ${data.message}`);
  component.find('FlatButton').simulate('click');
  expect(mockFn).toHaveBeenCalled();
});
