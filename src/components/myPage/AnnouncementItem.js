import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {gray, white} from 'styles';
import {Foundation} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';

function AnnouncementItem({singleData}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        backgroundColor: white.origin,
        borderBottomColor: gray.lightGray,
        borderBottomWidth: ss(2),
        paddingLeft: hs(15),
      }}
      onPress={() => navigation.navigate('AnnouncementDetail', singleData)}>
      <View style={{flexDirection: 'row', paddingTop: vs(5)}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {singleData.title}
        </Text>
        <Foundation
          name="burst-new"
          size={ss(25)}
          color={'#6495ED'}
          style={{marginLeft: hs(5)}}
        />
      </View>
      <Text style={{color: '#DCDCDC', marginBottom: vs(5)}}>
        {singleData.createdDate}
      </Text>
      {/* <Text>{singleData.body}</Text> */}
    </Pressable>
  );
}

export default AnnouncementItem;
