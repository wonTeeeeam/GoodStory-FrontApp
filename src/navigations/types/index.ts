import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
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

export type BoardStackParamList = {
  Board: {boardTopic: string} | undefined;
  DetailPost: undefined;
};

export type MyPageStackParamList = {
  ResetPassword: undefined;
  Announcement: undefined;
  AnnouncementDetail: undefined;
  Configuration: undefined;
  Withdrawal: undefined;
};

export type BottomStackProps = BottomTabScreenProps<
  BottomStackParamList,
  'BoardStack'
>;

// export type BottomStackProps = CompositeScreenProps<
//   NativeStackScreenProps<BoardStackParamList, 'Board'>,
//   BottomTabScreenProps<BottomStackParamList, 'BoardStack'>
// >;

// export type BoardStackProps = NativeStackScreenProps<
//   BoardStackParamList,
//   'Board'
// >;

// export type JoinStackParamList = {
//   JoinEmail: undefined;
//   JoinPassword: undefined;
//   JoinName: undefined;
//   JoinCamera: undefined;
// };

// export type JoinStackProps = NativeStackScreenProps<JoinStackParamList>;

// export type MyPageStackProps = NativeStackScreenProps<MyPageStackParamList>;
