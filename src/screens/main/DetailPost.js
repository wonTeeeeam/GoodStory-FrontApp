import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';

import OvalButton from '../../components/atoms/OvalButton';
import DetailPostMain from '../../components/organisms/DetailPostMain';
import ReplyInput from '../../components/organisms/ReplyInput';
import ReplyList from '../../components/organisms/ReplyList';
import {BackgroundColor} from '../../styles/BackgroundColor';
import {TextColor} from '../../styles/TextColor';
import {ss, vs, hs} from '../../utils/scailing';
import {convertTimeToStandardFormat} from '../../utils/timeConverter';

import Entypo from 'react-native-vector-icons/Entypo';

export default function DetailPost({route, navigation}) {
  const {singleData} = route.params;
  const [replyData, setReplyData] = useState({});
  const [img, setImage] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSetIsModalVisible = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    fetchDetailData();
  }, [fetchDetailData]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo
          name="dots-three-vertical"
          color={TextColor.black}
          size={20}
          onPress={handleSetIsModalVisible}
        />
      ),
    });
  }, [navigation, handleSetIsModalVisible]);

  const fetchDetailData = useCallback(async () => {
    try {
      const result = await axios.get(
        `http://3.35.111.44:3001/board/getOne/${singleData.Board_BoardId}`,
      );
      setReplyData(result.data);
    } catch (e) {}
  }, [singleData.Board_BoardId]);

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary();
    setImage(result.assets[0]);
  };

  return (
    <View style={{backgroundColor: BackgroundColor.snow, flex: 1}}>
      <ScrollView
        style={styles.totalContainer}
        showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: vs(20)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={{color: 'black'}}>사진</Text>
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.nickName}>{singleData.user_Nickname}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.date}>
              {convertTimeToStandardFormat(singleData.user_Created_date)}
            </Text>
          </View>

          <DetailPostMain singleData={singleData} />

          <View style={styles.likeContainer}>
            <View style={styles.likeBox}>
              <AntDesignIcon name="heart" color={TextColor.red} />
              <Text style={styles.user}>추천</Text>
              <Text style={styles.user}>{singleData.Board_Like}</Text>
            </View>
          </View>

          <ReplyList />

          <View style={{...styles.grayBox, ...styles.pictureBox}}>
            <Pressable onPress={handleChoosePhoto}>
              <AntDesignIcon name="picture" color={'#4682B4'} size={ss(20)} />
            </Pressable>
          </View>

          <ReplyInput />
          {img.uri ? (
            <View
              style={{
                ...styles.grayBox,
                marginTop: vs(20),
                height: vs(55),
                alignItems: 'flex-start',
                paddingLeft: hs(10),
                paddingVertical: vs(5),
                flexDirection: 'row',
              }}>
              <Image source={{uri: img.uri}} style={{width: 50, height: 50}} />
              <View style={{marginLeft: hs(52), position: 'absolute'}}>
                <AntDesignIcon
                  name="closecircle"
                  color={'#4682B4'}
                  size={15}
                  onPress={() => {
                    setImage({});
                  }}
                />
              </View>
            </View>
          ) : undefined}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'flex-end',
            }}>
            <View>
              <OvalButton
                buttonColor={'#6495ED'}
                text={'댓글등록'}
                textColor={'white'}
              />
            </View>
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          style={{justifyContent: 'flex-end', margin: 0}}
          backdropColor="transparent"
          onBackButtonPress={() => {
            setIsModalVisible(false);
          }}
          onBackdropPress={() => {
            setIsModalVisible(false);
          }}>
          <View
            style={{backgroundColor: BackgroundColor.white, padding: ss(10)}}>
            <Pressable onPress={() => {}}>
              <Text style={{color: TextColor.black, margin: ss(10)}}>
                신고하기
              </Text>
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  totalContainer: {margin: ss(25), marginVertical: 0},
  userContainer: {
    justifyContent: 'center',
    width: ss(200),
    height: ss(60),
    marginLeft: hs(20),
  },
  nickName: {
    fontWeight: '400',
    fontSize: ss(15),
    color: TextColor.black,
  },
  userLike: {
    color: TextColor.gray,
  },
  timeContainer: {marginVertical: ss(30)},
  date: {
    color: TextColor.gray,
  },
  likeContainer: {
    marginTop: vs(20),
    alignItems: 'center',
  },

  likeBox: {
    flexDirection: 'row',
    backgroundColor: BackgroundColor.lightGray,
    width: ss(60),
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  user: {
    color: TextColor.black,
  },
  grayBox: {
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
  },

  pictureBox: {
    width: ss(30),
    marginTop: ss(20),
    alignSelf: 'flex-end',
  },

  replyEmoticonInput: {
    width: ss(100),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
