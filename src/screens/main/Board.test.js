import React from 'react';
import renderer from 'react-test-renderer';
import Board from './Board';

jest.mock('react-native-vector-icons/AntDesign');

test('Board 스냅샷 테스트', () => {
  const tree = renderer.create(<Board />).toJSON();
  expect(tree).toMatchSnapshot();
});
