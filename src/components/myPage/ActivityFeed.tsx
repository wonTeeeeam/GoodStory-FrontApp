import React from 'react';
import {View} from 'react-native';
import {ss, vs} from 'utils/scailing';
import ActivityFeedItem from './ActivityFeedItem';

type Props = {
  like: number | undefined;
  post: number | undefined;
  reply: number | undefined;
};

const ActivityFeed: React.FC<Props> = ({like, post, reply}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <ActivityFeedItem title={'좋아요'} value={like} />
      <View style={{borderLeftWidth: ss(1), marginVertical: vs(10)}} />
      <ActivityFeedItem title={'게시글'} value={post} />
      <View style={{borderLeftWidth: ss(1), marginVertical: vs(10)}} />
      <ActivityFeedItem title={'댓글'} value={reply} />
    </View>
  );
};

export default ActivityFeed;
