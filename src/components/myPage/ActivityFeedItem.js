import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {ss, vs} from 'utils/scailing';

function ActivityFeedItem({title, value}) {
  return (
    <View>
      <Pressable style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'black',
            marginTop: vs(10),
            fontWeight: 'bold',
            fontSize: ss(15),
          }}>
          {title}
        </Text>
        <Text style={{color: '#FF6347', marginVertical: vs(10)}}>
          {value}개
        </Text>
      </Pressable>
    </View>
  );
}

export default ActivityFeedItem;
