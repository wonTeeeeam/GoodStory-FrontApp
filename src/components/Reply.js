import React from 'react';
import {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {black, gray, white} from 'styles';

import {hs, ss, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';
import BottomModal from './BottomModal';
import BottomModalElement from './BottomModalElement';

export default function Reply({singleData}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={{marginTop: vs(5), flex: 1}}>
      <View style={styles.replyNickName}>
        {singleData.user.Nickname ? (
          <FastImage
            style={{
              height: vs(20),
              width: hs(20),
              borderRadius: ss(10),
              borderColor: '#D3D3D3',
              borderWidth: ss(1),
            }}
            source={{uri: singleData.user.ProfilePhoto}}
            resizeMode="center"
          />
        ) : (
          <Ionicons
            name="person-outline"
            color={'white'}
            size={ss(20)}
            style={{
              backgroundColor: gray.lightGray,
              // width: '100%',
              alignItems: 'center',
              height: vs(20),
              width: hs(20),
              borderRadius: ss(100),
            }}
          />
        )}

        <View style={{marginLeft: hs(10), flexDirection: 'row'}}>
          <Text style={styles.user}>{singleData.user.Nickname}</Text>
          <View style={styles.replyDate}>
            <Text style={{fontSize: ss(10), color: '#D3D3D3'}}>작성일</Text>
            <Text style={{fontSize: ss(10), color: '#D3D3D3'}}>
              {convertTimeToKorean(singleData.Created_date)}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '30%',
          }}>
          <Entypo
            name="dots-three-vertical"
            color={'black'}
            size={ss(10)}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </View>
      </View>
      <View style={{marginTop: vs(10), marginLeft: hs(30)}}>
        <Text style={{color: 'black'}}>{singleData.Content}</Text>
      </View>
      <BottomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}>
        <BottomModalElement
          onPress={() => setIsModalVisible(false)}
          text={'신고하기'}
        />
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  replyNickName: {flexDirection: 'row'},
  replyDate: {
    marginLeft: hs(10),
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {color: 'black', fontSize: ss(15)},
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContents: {
    backgroundColor: white.origin,
    padding: ss(10),
  },
  modalText: {
    color: black.origin,
    margin: ss(10),
  },
});
