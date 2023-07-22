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
import {launchImageLibrary} from 'react-native-image-picker';

import DetailPostMain from 'components/DetailPostMain';
import ReplyInput from 'components/ReplyInput';
import ReplyList from 'components/ReplyList';
import {black, gray, red, white} from 'styles';
import {ss, vs, hs} from 'utils/scailing';
import {convertTimeToStandardFormat} from 'utils/timeConverter';

import BottomModal from 'components/modal/BottomModal';
import BottomModalElement from 'components/BottomModalElement';
import FastImage from 'react-native-fast-image';
import {showToast} from 'utils/toast';
import usePressLike from 'hooks/usePressLike';
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from 'utils/react-native-vector-helper';

export default function DetailPost({route, navigation}) {
  const {singleData, firstViewCnt, firstLikeCnt, firstIsLikePressed} =
    route.params;
  const [replyData, setReplyData] = useState([]);
  const [img, setImage] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    setIsLikePressed,
    isLikePressed,
  } = usePressLike();

  const handleSetIsModalVisible = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    setLikeCnt(firstLikeCnt);
    setIsLikePressed(firstIsLikePressed);
  }, []);

  useEffect(() => {
    fetchDetailData();
  }, [fetchDetailData]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo
          name="dots-three-vertical"
          color={black.origin}
          size={20}
          onPress={handleSetIsModalVisible}
        />
      ),
    });
  }, [navigation, handleSetIsModalVisible]);

  const fetchDetailData = useCallback(async () => {
    try {
      const result = await axios.get(`/board/getOne/${singleData.BoardId}`);
      setReplyData(result.data.replys);
    } catch (e) {}
  }, [singleData.BoardId]);

  const handleChoosePhoto = async () => {
    if (img.uri) {
      showToast('이미지는 최대 1개만 가능합니다');
      return;
    }
    const result = await launchImageLibrary();
    if (result.didCancel) {
      return;
    }
    setImage(result.assets[0]);
  };

  return (
    <View style={{backgroundColor: white.snow, flex: 1}}>
      <ScrollView
        style={styles.totalContainer}
        // keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: vs(20)}}>
          <View
            style={{
              borderWidth: ss(1),
              paddingBottom: vs(30),
              paddingHorizontal: hs(10),
              borderColor: '#C0C0C0',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                {singleData.user.ProfilePhoto ? (
                  <FastImage
                    style={{
                      height: vs(30),
                      width: hs(30),
                      borderRadius: ss(30),
                      borderColor: '#D3D3D3',
                      borderWidth: ss(1),
                    }}
                    source={{uri: singleData.user.ProfilePhoto}}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons
                    name="person-outline"
                    color={'white'}
                    size={ss(30)}
                    style={{
                      backgroundColor: gray.lightGray,
                      // width: '100%',
                      alignItems: 'center',
                      height: vs(30),
                      width: hs(30),
                      borderRadius: ss(100),
                    }}
                  />
                )}
              </View>
              <View style={styles.userContainer}>
                <Text style={styles.nickName}>{singleData.user.Nickname}</Text>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.date}>
                {convertTimeToStandardFormat(singleData.user.Created_date)}
              </Text>
            </View>

            <DetailPostMain singleData={singleData} />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // margin: ss(10),
                marginTop: vs(60),
                paddingHorizontal: ss(10),
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={({pressed}) => [
                  {...styles.bottomContainer},
                  {backgroundColor: pressed ? gray.lightGray : null},
                ]}
                onPress={() => handlePressLike(singleData)}>
                <View style={styles.iconContainer}>
                  {isLikePressed ? (
                    <AntDesign name="heart" color={red.hotLips} />
                  ) : (
                    <AntDesign name="hearto" color={gray.dimGray} />
                  )}
                </View>
                {likeCnt === 0 ? (
                  <Text style={styles.likeText}>{'좋아요'}</Text>
                ) : (
                  <Text style={styles.likeText}>{likeCnt}</Text>
                )}
              </Pressable>
              <Pressable style={{...styles.bottomContainer, left: hs(110)}}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="message-reply-outline"
                    color={gray.dimGray}
                  />
                </View>
                <Text style={styles.replyText}>
                  {singleData.ReplyCount > 0 ? singleData.ReplyCount : '댓글'}
                </Text>
              </Pressable>
              <Pressable style={{...styles.bottomContainer, left: hs(210)}}>
                <View style={styles.iconContainer}>
                  <AntDesign name="eyeo" color={gray.dimGray} />
                </View>
                <Text style={styles.viewText}>
                  {firstViewCnt > 0 ? firstViewCnt : '조회수'}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{marginTop: vs(30)}}>
            {singleData.ReplyCount > 0 ? (
              <ReplyList
                replyData={replyData}
                replyCnt={singleData.ReplyCount}
              />
            ) : undefined}

            <View
              style={{
                ...styles.grayBox,
                ...styles.pictureBox,
              }}>
              <Pressable onPress={handleChoosePhoto}>
                <AntDesign name="picture" color={'#4682B4'} size={ss(20)} />
              </Pressable>
            </View>
          </View>

          <ReplyInput
            imgURL={singleData.user.ProfilePhoto}
            inputImage={img}
            singleData={singleData}
          />
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
                <AntDesign
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
        </View>
      </ScrollView>
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
  totalContainer: {
    padding: ss(20),
    marginVertical: 0,
  },
  userContainer: {
    justifyContent: 'center',
    width: ss(200),
    height: ss(60),
    marginLeft: hs(20),
  },
  nickName: {
    fontWeight: '400',
    fontSize: ss(15),
    color: black.origin,
  },
  userLike: {
    color: gray.dimGray,
  },
  timeContainer: {marginVertical: ss(30)},
  date: {
    color: gray.dimGray,
  },
  likeContainer: {
    marginTop: vs(20),
    alignItems: 'center',
  },

  likeBox: {
    flexDirection: 'row',
    backgroundColor: gray.lightGray,
    width: ss(60),
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  user: {
    color: black.origin,
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
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: ss(20),
    width: hs(70),
  },
  iconContainer: {justifyContent: 'center', marginRight: 5},
  likeText: {color: gray.dimGray},
  replyText: {color: gray.dimGray},
  viewText: {color: gray.dimGray},
});
