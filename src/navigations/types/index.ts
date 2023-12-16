import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostListElement} from 'hooks/useFetchPostList';
import {Announcement} from 'screens/myPage/Announcement';

export type MainStackParamList = {
  BottomStack: NavigatorScreenParams<BottomStackParamList>;
  DetailBoardStack: NavigatorScreenParams<DetailBoardStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
};

export type MainStackProps = NativeStackScreenProps<
  MainStackParamList,
  'DetailBoardStack'
>;

export type BottomStackParamList = {
  Board: {boardTopic: string};
  Topic: undefined;
  Posting: undefined;
  MyPage: undefined;
};

export type BottomStackProps = BottomTabScreenProps<
  BottomStackParamList,
  'Board'
>;

export type DetailBoardStackParamList = {
  DetailPost: {
    singleData: PostListElement;
    firstIsLikePressed: boolean;
  };
};

export type DetailBoardStackProps = NativeStackScreenProps<
  DetailBoardStackParamList,
  'DetailPost'
>;

export type MyPageStackParamList = {
  MyActivityFeed: {type: string};
  ResetPassword: {account: string};
  Announcement: undefined;
  AnnouncementDetail: {announcement: Announcement};
  Configuration: undefined;
  Withdrawal: undefined;
  Alarm: undefined;
};

export type MyPageStackProps = NativeStackScreenProps<
  MyPageStackParamList,
  'ResetPassword' | 'AnnouncementDetail' | 'MyActivityFeed'
>;

export type JoinStackParamList = {
  JoinEmail: undefined;
  JoinPassword: {Email: string};
  JoinName: {Email: string; Password: string};
  JoinProfile: {Email: string; Password: string; Nickname: string};
  // JoinCamera: {
  //   Email: string;
  //   Password: string;
  //   Name: string;
  // };
};

export type JoinStackProps = NativeStackScreenProps<
  JoinStackParamList,
  'JoinEmail' | 'JoinPassword' | 'JoinName' | 'JoinProfile'
>;
