import React from 'react';
import Board from './Board';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import store from 'store/store';

const data = {
  data: [
    {
      BoardId: '7a23c7e8-3fd6-4c60-b5db-a426d410bb11',
      Category: 'Free',
      Created_date: '2023-07-02T05:46:27.466Z',
      Updated_date: '2023-07-08T08:27:26.087Z',
      Title: '단건 저장 테스트',
      Content: '제발요....',
      Like: 0,
      Views: 38,
      ReplyCount: 6,
      user: {
        UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
        Nickname: '홍길동',
        Role: 'Admin',
        CompanyCode: '321321',
        CompanyName: '좆소',
        Created_date: '2023-03-31T12:24:45.043Z',
        Updated_date: '2023-07-11T12:03:44.205Z',
        Deleted_date: null,
        ProfilePhoto:
          'https://good-story.s3.ap-northeast-2.amazonaws.com/Profile/qksdnjswo@gmail.com/profile.png',
      },
      BoardPhotos: [],
    },
    {
      BoardId: '1fe34e61-ae32-4d59-b6ab-f69029e26a6b',
      Category: 'Free',
      Created_date: '2023-06-11T15:17:24.875Z',
      Updated_date: '2023-07-08T08:29:06.706Z',
      Title: '임시타이틀',
      Content: '임시컨텐츠',
      Like: 1,
      Views: 173,
      ReplyCount: 5,
      user: {
        UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
        Nickname: '홍길동',
        Role: 'Admin',
        CompanyCode: '321321',
        CompanyName: '좆소',
        Created_date: '2023-03-31T12:24:45.043Z',
        Updated_date: '2023-07-11T12:03:44.205Z',
        Deleted_date: null,
        ProfilePhoto:
          'https://good-story.s3.ap-northeast-2.amazonaws.com/Profile/qksdnjswo@gmail.com/profile.png',
      },
      BoardPhotos: [
        {
          BoardPhotoID: '51322338-3268-42c9-a131-99d8a70e90a5',
          URL: 'https://good-story.s3.ap-northeast-2.amazonaws.com/Board/1fe34e61-ae32-4d59-b6ab-f69029e26a6b/boardPhoto0.png',
          Created_date: '2023-04-29T11:19:13.053Z',
        },
      ],
    },
    {
      BoardId: '1882a0b6-329c-4a5e-a53c-63f8d84dfe8f',
      Category: 'Free',
      Created_date: '2023-05-12T03:19:02.596Z',
      Updated_date: '2023-07-02T05:33:57.655Z',
      Title: '단건 저장 테스트',
      Content: '제발요....',
      Like: 0,
      Views: 23,
      ReplyCount: 0,
      user: {
        UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
        Nickname: '홍길동',
        Role: 'Admin',
        CompanyCode: '321321',
        CompanyName: '좆소',
        Created_date: '2023-03-31T12:24:45.043Z',
        Updated_date: '2023-07-11T12:03:44.205Z',
        Deleted_date: null,
        ProfilePhoto:
          'https://good-story.s3.ap-northeast-2.amazonaws.com/Profile/qksdnjswo@gmail.com/profile.png',
      },
      BoardPhotos: [],
    },
    {
      BoardId: '5edf689e-fb45-4bb0-876c-aefa95be7e6b',
      Category: 'Free',
      Created_date: '2023-05-12T03:09:47.283Z',
      Updated_date: '2023-07-08T08:23:18.708Z',
      Title: '단건 저장 테스트',
      Content: '제발요....',
      Like: 0,
      Views: 6,
      ReplyCount: 0,
      user: {
        UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
        Nickname: '홍길동',
        Role: 'Admin',
        CompanyCode: '321321',
        CompanyName: '좆소',
        Created_date: '2023-03-31T12:24:45.043Z',
        Updated_date: '2023-07-11T12:03:44.205Z',
        Deleted_date: null,
        ProfilePhoto:
          'https://good-story.s3.ap-northeast-2.amazonaws.com/Profile/qksdnjswo@gmail.com/profile.png',
      },
      BoardPhotos: [],
    },
    {
      BoardId: '7926db7a-8bdf-409e-bfdf-cc90bbad5694',
      Category: 'Free',
      Created_date: '2023-04-29T12:41:10.536Z',
      Updated_date: '2023-06-12T15:11:32.714Z',
      Title: '임시타이틀',
      Content: '임시컨텐츠',
      Like: 0,
      Views: 7,
      ReplyCount: 0,
      user: {
        UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
        Nickname: '홍길동',
        Role: 'Admin',
        CompanyCode: '321321',
        CompanyName: '좆소',
        Created_date: '2023-03-31T12:24:45.043Z',
        Updated_date: '2023-07-11T12:03:44.205Z',
        Deleted_date: null,
        ProfilePhoto:
          'https://good-story.s3.ap-northeast-2.amazonaws.com/Profile/qksdnjswo@gmail.com/profile.png',
      },
      BoardPhotos: [
        {
          BoardPhotoID: '823f93b0-e694-4529-8e20-9e1ad236806d',
          URL: 'https://good-story.s3.ap-northeast-2.amazonaws.com/Board/7926db7a-8bdf-409e-bfdf-cc90bbad5694/boardPhoto0.png',
          Created_date: '2023-04-29T12:41:10.523Z',
        },
      ],
    },
  ],
};

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(data)),
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

const route = {
  key: 'Board-MAkMB4XImCVfcaiQH-caF',
  name: 'Board',
  params: {
    boardTopic: 'Free',
  },
};

describe('Board 테스트', () => {
  it('스냅샷 테스트', async () => {
    const tree = render(
      <Provider store={store}>
        <Board route={route} />
      </Provider>,
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });
});
