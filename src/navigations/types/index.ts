import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  BottomStack: NavigatorScreenParams<BottomStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
};

export type BottomStackParamList = {
  BoardStack: NavigatorScreenParams<MyPageStackParamList>;
  Topic: undefined;
  Posting: undefined;
  MyPage: undefined;
};

export type BottomStackProps = NativeStackScreenProps<
  BottomStackParamList,
  'BoardStack'
>;

export type BoardStackParamList = {
  Board: {boardTopic: string} | undefined;
  DetailPost: undefined;
};

export type BoardStackProps = NativeStackScreenProps<
  BoardStackParamList,
  'Board'
>;

export type JoinStackParamList = {
  JoinEmail: undefined;
  JoinPassword: undefined;
  JoinName: undefined;
  JoinCamera: undefined;
};

export type JoinStackProps = NativeStackScreenProps<JoinStackParamList>;

export type MyPageStackParamList = {
  ResetPassword: undefined;
  Announcement: undefined;
  AnnouncementDetail: undefined;
  Configuration: undefined;
  Withdrawal: undefined;
};

export type MyPageStackProps = NativeStackScreenProps<MyPageStackParamList>;
