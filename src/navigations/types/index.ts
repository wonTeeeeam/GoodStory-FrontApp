import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  BottomStack: NavigatorScreenParams<BottomStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
};

export type BottomStackParamList = {
  BoardStack: NavigatorScreenParams<BoardStackParamList>;
  Topic: undefined;
  Posting: undefined;
  MyPage: undefined;
};

export type BottomStackProps = BottomTabScreenProps<
  BottomStackParamList,
  'BoardStack'
>;

export type BoardStackParamList = {
  Board: {boardTopic: string};
  DetailPost: undefined;
};

export type BoardStackProps = NativeStackScreenProps<
  BoardStackParamList,
  'Board'
>;

export type MyPageStackParamList = {
  ResetPassword: undefined;
  Announcement: undefined;
  AnnouncementDetail: undefined;
  Configuration: undefined;
  Withdrawal: undefined;
};
