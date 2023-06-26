import React from 'react';
import {Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

function AnnouncementDetail({route}) {
  const singleData = route.params;
  return (
    <View style={{marginTop: vs(20), marginHorizontal: hs(10)}}>
      <Text
        style={{
          color: 'black',
          fontSize: ss(20),
        }}>
        {singleData.title}
      </Text>
      <Text style={{color: 'black', marginTop: vs(20)}}>{singleData.body}</Text>
    </View>
  );
}

export default AnnouncementDetail;
