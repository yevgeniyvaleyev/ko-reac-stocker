import React from 'react';
import renderer from 'react-test-renderer';
import FetchError from '../fetch-error';


test('should render component', () => {
  const data = {
    message: 'test',
    onRetry: () => {},
  };
  const component = renderer.create(
    <FetchError {...data} />,
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
