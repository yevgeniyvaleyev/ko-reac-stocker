import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Stock from '../../components/stock';

test('should render component', () => {
  const data = {
    id: 1,
    name: 'test',
    currentPrice: 111,
  };
  const component = renderer.create(
    <MuiThemeProvider>
      <Stock {...data} />
    </ MuiThemeProvider>,
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

