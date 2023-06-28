import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {BackgroundColor} from 'styles/BackgroundColor';
import {hs, ss, vs} from 'utils/scailing';
import Foundation from 'react-native-vector-icons/Foundation';

function AnnouncementItem({singleData}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        borderBottomColor: BackgroundColor.lightGray,
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