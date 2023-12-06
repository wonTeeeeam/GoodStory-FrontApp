import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ss, vs} from 'utils/scailing';
import ActivityFeedItem from './ActivityFeedItem';
import {useNavigation} from '@react-navigation/native';
import {MainStackProps} from 'navigations/types';

type Props = {
  like: number;
  post: number;
  reply: number;
};

const ActivityFeed: React.FC<Props> = ({like, post, reply}) => {
  const navigation = useNavigation<MainStackProps['navigation']>();

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyPageStack', {
            screen: 'MyActivityFeed',
            params: {type: '좋아요'},
          })
        }>
        <ActivityFeedItem title={'좋아요'} value={like} />
      </TouchableOpacity>
      <View style={{borderLeftWidth: ss(1), marginVertical: vs(10)}} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyPageStack', {
            screen: 'MyActivityFeed',
            params: {type: '게시글'},
          })
        }>
        <ActivityFeedItem title={'게시글'} value={post} />
      </TouchableOpacity>
      <View style={{borderLeftWidth: ss(1), marginVertical: vs(10)}} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyPageStack', {
            screen: 'MyActivityFeed',
            params: {type: '댓글'},
          })
        }>
        <ActivityFeedItem title={'댓글'} value={reply} />
      </TouchableOpacity>
    </View>
  );
};

export default ActivityFeed;
