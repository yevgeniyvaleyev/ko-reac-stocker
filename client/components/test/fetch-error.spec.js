import React from 'react';
import renderer from 'react-test-renderer';
import FetchError from '../fetch-error';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
