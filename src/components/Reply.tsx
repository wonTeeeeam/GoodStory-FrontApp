import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';

import {black, gray, white} from 'styles';

import {hs, ss, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';
import BottomModal from './modal/BottomModal';
import BottomModalElement from './BottomModalElement';
import {Entypo, Ionicons} from 'utils/react-native-vector-helper';
import {ReplyDatum} from 'screens/main/DetailPost';

type Props = {
  singleData: ReplyDatum;
};

const Reply: React.FC<Props> = ({singleData}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSetIsModalVisible = (newValue: boolean) => {
    setIsModalVisible(newValue);
  };
  return (
    <View style={{marginTop: vs(5), flex: 1}}>
      <View style={styles.replyNickName}>
        {singleData.user.Nickname ? (
          <FastImage
            style={styles.profileImage}
            source={{uri: singleData.user.ProfilePhoto}}
            resizeMode="center"
          />
        ) : (
          <Ionicons
            name="person-outline"
            color={'white'}
            size={ss(20)}
            style={styles.defaultProfileImage}
          />
        )}

        <View style={{marginLeft: hs(10), flexDirection: 'row'}}>
          {/* <Text style={{color: 'red'}}>{singleData.user.CompanyName}</Text> */}
          <Text style={styles.user}>{singleData.user.Nickname}</Text>
          <View style={styles.replyDate}>
            <Text style={{fontSize: ss(10), color: '#D3D3D3'}}>
              {convertTimeToKorean(singleData.Created_date)}
            </Text>
          </View>
        </View>
        <View style={styles.threeDotView}>
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
      <View style={{marginTop: vs(10), marginLeft: hs(25)}}>
        <Text style={{color: 'black'}}>{singleData.Content}</Text>
        {singleData.ReplyPhoto && (
          <FastImage
            style={styles.replyPhoto}
            source={{uri: singleData.ReplyPhoto}}
            resizeMode="stretch"
          />
        )}
      </View>
      <BottomModal
        isModalVisible={isModalVisible}
        changeModalVisible={handleSetIsModalVisible}>
        <BottomModalElement
          onPress={() => setIsModalVisible(false)}
          text={'신고하기'}
        />
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  replyNickName: {flexDirection: 'row'},
  replyDate: {
    marginLeft: hs(10),
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {color: gray.dimGray, fontSize: ss(12)},
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
  profileImage: {
    height: vs(15),
    width: hs(15),
    borderRadius: ss(10),
    borderColor: '#D3D3D3',
    borderWidth: ss(1),
  },
  defaultProfileImage: {
    backgroundColor: gray.lightGray,
    // width: '100%',
    alignItems: 'center',
    height: vs(20),
    width: hs(20),
    borderRadius: ss(100),
  },
  threeDotView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '35%',
  },
  replyPhoto: {
    height: vs(150),
    width: hs(150),
    marginTop: vs(10),
    borderRadius: ss(10),
  },
});

export default Reply;
