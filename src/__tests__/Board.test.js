import React from 'react';
import Board from 'screens/main/Board';
import {fireEvent, waitFor, within} from '@testing-library/react-native';
import {renderWithProviders} from 'utils/test-utils';

import {convertTimeToKorean} from 'utils/timeConverter';

const data = {
  data: [
    {
      BoardId: '7a23c7e8-3fd6-4c60-b5db-a426d410bb11',
      Category: 'Free',
      Created_date: '2023-07-02T05:46:27.466Z',
      Updated_date: '2023-07-08T08:27:26.087Z',
      Title: '1번게시글제목',
      Content: '1번게시글내용',
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
      Title: '2번게시글제목',
      Content: '2번게시글내용',
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
      Title: '3번게시글제목',
      Content: '3번게시글내용',
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
      Title: '4번게시글제목',
      Content: '4번게시글내용',
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
      Title: '5번게시글제목',
      Content: '5번게시글내용',
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
  post: jest.fn(() => Promise.resolve(true)),
  delete: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);

const route = {
  key: 'Board-MAkMB4XImCVfcaiQH-caF',
  name: 'Board',
  params: {
    boardTopic: 'Free',
  },
};

describe('Board 테스트', () => {
  it('스냅샷 테스트', async () => {
    const tree = renderWithProviders(<Board route={route} />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it('필터링 바 정상 렌더링 && 정상작동 테스트', async () => {
    const {queryByText} = renderWithProviders(<Board route={route} />);
    // 최초 filterValue는 '최신순'
    await waitFor(() => expect(queryByText('최신순')).toBeTruthy());

    // filterValue를 '추천순'으로 변경합니다.
    fireEvent.press(queryByText('최신순'));
    fireEvent.press(queryByText('추천순'));

    // filterValue가 '추천순'으로 바뀌었는지 체크합니다.
    await waitFor(() => expect(queryByText('추천순')).toBeTruthy());

    // filterValue를 다시 '최신순'으로 변경합니다.
    fireEvent.press(queryByText('추천순'));
    fireEvent.press(queryByText('최신순'));
    await waitFor(() => expect(queryByText('최신순')).toBeTruthy());
  });

  it('게시글 정상 렌더링 테스트', async () => {
    const {queryAllByTestId, debug} = renderWithProviders(
      <Board route={route} />,
    );

    await waitFor(() => {
      const renderedItems = queryAllByTestId('flatListItems');
      // 총 게시글 길이가 맞는지 체크
      expect(renderedItems).toHaveLength(data.data.length);
      renderedItems.forEach((item, index) => {
        const {queryByText, queryByTestId} = within(item);
        // 게시글 카테고리, 시간 잘 나오는가?
        expect(queryByText(data.data[index].Category)).toBeTruthy();
        expect(
          queryByText(convertTimeToKorean(data.data[index].Created_date)),
        ).toBeTruthy();

        // 게시글 작성자 회사, 닉네임 잘 나오는가?
        expect(queryByText(data.data[index].user.CompanyName)).toBeTruthy();
        expect(queryByText(data.data[index].user.Nickname)).toBeTruthy();

        // 게시글 제목, 내용, 사진 잘 나오는가?
        expect(queryByText(data.data[index].Title)).toBeTruthy();
        expect(queryByText(data.data[index].Content)).toBeTruthy();
        if (data.data[index].BoardPhotos[0]) {
          expect(queryByTestId('boardImage').props.source.uri).toBe(
            data.data[index].BoardPhotos[0].URL,
          );
        }

        // 좋아요, 조회수, 댓글 개수 잘 나오는가?
        expect(
          queryByText(
            data.data[index].Like ? data.data[index].Like.toString() : '좋아요',
          ),
        ).toBeTruthy();

        expect(
          queryByText(
            data.data[index].Views
              ? data.data[index].Views.toString()
              : '조회수',
          ),
        ).toBeTruthy();

        expect(
          queryByText(
            data.data[index].ReplyCount
              ? data.data[index].ReplyCount.toString()
              : '댓글',
          ),
        ).toBeTruthy();
      });
    });
  });

  it('좋아요 변경 테스트', async () => {
    const {queryAllByTestId, rerender, debug} = renderWithProviders(
      <Board route={route} />,
      {
        preloadedState: {
          user: {
            userId: 'asdasd',
            account: '',
            nickName: '',
            profileImage: '',
            createdDate: '',
            companyCode: '',
            companyName: '',
            accessToken: '',
            likeBoards: [],
            likeReReplies: [],
            likeReplies: [],
          },
        },
      },
    );
    await waitFor(() => {
      const renderedItems = queryAllByTestId('flatListItems');
      expect(renderedItems).toHaveLength(data.data.length);
      renderedItems.forEach((item, index) => {
        const {queryByText} = within(item);

        // 좋아요 플러스 작동
        fireEvent.press(
          queryByText(
            data.data[index].Like ? data.data[index].Like.toString() : '좋아요',
          ),
        );
      });
    });
    // 좋아요 state의 변화로 rerender
    rerender(<Board route={route} />);

    await waitFor(() => {
      const renderedItems = queryAllByTestId('flatListItems');
      expect(renderedItems).toHaveLength(data.data.length);
      renderedItems.forEach((item, index) => {
        const {queryByText} = within(item);
        // 좋아요 1개씩 올라갔는지 테스트
        const likeButton = queryByText((data.data[index].Like + 1).toString());
        expect(likeButton).toBeTruthy();

        // 좋아요 다시 취소하기.
        fireEvent.press(likeButton);
      });
    });

    // 좋아요 state의 변화로 rerender
    rerender(<Board route={route} />);

    await waitFor(() => {
      const renderedItems = queryAllByTestId('flatListItems');
      expect(renderedItems).toHaveLength(data.data.length);
      renderedItems.forEach((item, index) => {
        const {queryByText} = within(item);
        // 좋아요 다시 원래대로 돌아왔는지 테스트
        expect(
          queryByText(
            data.data[index].Like ? data.data[index].Like.toString() : '좋아요',
          ),
        ).toBeTruthy();
      });
    });
  });
});
