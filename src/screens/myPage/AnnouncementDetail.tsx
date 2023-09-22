import {MyPageStackProps} from 'navigations/types';
import React from 'react';
import {Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';
import {Announcement} from './Announcement';

const AnnouncementDetail: React.FC<MyPageStackProps> = ({route}) => {
  const {announcement} = route.params as {announcement: Announcement};
  return (
    <View style={{marginTop: vs(20), marginHorizontal: hs(10)}}>
      <Text
        style={{
          color: 'black',
          fontSize: ss(20),
        }}>
        {announcement.title}
      </Text>
      <Text style={{color: 'black', marginTop: vs(20)}}>
        {announcement.body}
      </Text>
    </View>
  );
};

export default AnnouncementDetail;
