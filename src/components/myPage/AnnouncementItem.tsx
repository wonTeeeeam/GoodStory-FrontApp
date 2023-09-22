import {useNavigation} from '@react-navigation/native';
import {MyPageStackProps} from 'navigations/types';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Announcement} from 'screens/myPage/Announcement';
import {gray, white} from 'styles';
import {Foundation} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';

const AnnouncementItem = ({announcement}: {announcement: Announcement}) => {
  const navigation = useNavigation<MyPageStackProps['navigation']>();
  return (
    <Pressable
      style={styles.totalContainer}
      onPress={() =>
        navigation.navigate('AnnouncementDetail', {
          announcement,
        })
      }>
      <View style={{flexDirection: 'row', paddingTop: vs(5)}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {announcement.title}
        </Text>
        <Foundation
          name="burst-new"
          size={ss(25)}
          color={'#6495ED'}
          style={{marginLeft: hs(5)}}
        />
      </View>
      <Text style={{color: '#DCDCDC', marginBottom: vs(5)}}>
        {announcement.createdDate}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    backgroundColor: white.origin,
    borderBottomColor: gray.lightGray,
    borderBottomWidth: ss(2),
    paddingLeft: hs(15),
  },
});

export default AnnouncementItem;
