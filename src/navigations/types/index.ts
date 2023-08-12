import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ListData} from 'components/PostList';

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
    singleData: ListData;
    firstViewCnt: number;
    firstLikeCnt: number;
    firstIsLikePressed: boolean;
  };
};

export type DetailBoardStackProps = NativeStackScreenProps<
  DetailBoardStackParamList,
  'DetailPost'
>;

export type MyPageStackParamList = {
  ResetPassword: undefined;
  Announcement: undefined;
  AnnouncementDetail: undefined;
  Configuration: undefined;
  Withdrawal: undefined;
};
