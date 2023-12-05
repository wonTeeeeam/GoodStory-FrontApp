import React from 'react';
import {View} from 'react-native';
import {ss, vs} from 'utils/scailing';
import ActivityFeedItem from './ActivityFeedItem';

type Props = {
  like: number;
  post: number;
  reply: number;
};

const ActivityFeed: React.FC<Props> = ({like, post, reply}) => {
  const handleOnPressBtn = (title: string) => {
    switch (title) {
      case '좋아요':
    }
  };
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <ActivityFeedItem title={'좋아요'} value={like} handleOnPress={} />
      <View style={{borderLeftWidth: ss(1), marginVertical: vs(10)}} />
      <ActivityFeedItem title={'게시글'} value={post} handleOnPress={} />
      <View style={{borderLeftWidth: ss(1), marginVertical: vs(10)}} />
      <ActivityFeedItem title={'댓글'} value={reply} handleOnPress={} />
    </View>
  );
};

export default ActivityFeed;
