import React from 'react';
import renderer from 'react-test-renderer';
import Board from './Board';

jest.resetModules();

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({data: 'mocked data'})),
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

// jest.mock('@react-navigation/bottom-tabs', () => {
//   return {
//     createBottomTabNavigator: () => ({
//       navigate: jest.fn(),
//       dispatch: jest.fn(),
//     }),
//   };
// });

const route = {
  key: 'Board-MAkMB4XImCVfcaiQH-caF',
  name: 'Board',
  params: {
    boardTopic: 'Free',
  },
};

test('Board 스냅샷 테스트', () => {
  const tree = renderer.create(<Board route={route} />).toJSON();
  expect(tree).toMatchSnapshot();
});
