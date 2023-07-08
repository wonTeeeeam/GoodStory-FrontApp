import React from 'react';
import renderer from 'react-test-renderer';
import Board from './Board';
import axios from 'axios';

jest.mock('axios');

test('Board 스냅샷 테스트', () => {
  const users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Andrew'},
  ];
  axios.get = jest.fn().mockResolvedValueOnce({status: 202});
  axios.get.mockResolvedValueOnce(users);
  const tree = renderer.create(<Board />).toJSON();
  expect(tree).toMatchSnapshot();
});
