import {useNavigation} from '@react-navigation/native';
import {PostListElement} from 'hooks/useFetchPostList';
import {MyPageStackPropsForDetail} from 'navigations/types';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {gray, white} from 'styles';
import {Foundation} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';

const AnnouncementItem = ({singleData}: {singleData: PostListElement}) => {
  const navigation = useNavigation<MyPageStackPropsForDetail['navigation']>();
  return (
    <Pressable
      style={styles.totalContainer}
      onPress={() =>
        navigation.navigate('AnnouncementDetail', {postListElement: singleData})
      }>
      <View style={{flexDirection: 'row', paddingTop: vs(5)}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {singleData.Title}
        </Text>
        <Foundation
          name="burst-new"
          size={ss(25)}
          color={'#6495ED'}
          style={{marginLeft: hs(5)}}
        />
      </View>
      <Text style={{color: '#DCDCDC', marginBottom: vs(5)}}>
        {singleData.Created_date}
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
