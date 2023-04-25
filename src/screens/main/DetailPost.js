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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DetailPost({route, navigation}) {
  const {singleData} = route.params;
  const [replyData, setReplyData] = useState([]);
  const [img, setImage] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeCnt, setLikeCnt] = useState(singleData.Like);
  const [isLikePressed, setIsLikePressed] = useState(false);

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
        `http://3.35.111.44:3001/board/getOne/${singleData.BoardId}`,
      );
      setReplyData(result.data.replys);
    } catch (e) {}
  }, [singleData.BoardId]);

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary();
    setImage(result.assets[0]);
  };

  const handlePressLike = async () => {
    !isLikePressed ? plusLike() : minusLike();
  };

  const plusLike = () => {
    try {
      // const result = await axios.post(
      //   'http://3.35.111.44:3001/likeboard/pressLikeboard',
      //   {
      //     BoardID: singleData.BoardId,
      //     Like: likeCnt + 1,
      //   },
      // );
      setLikeCnt(likeCnt + 1);
      setIsLikePressed(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const minusLike = () => {
    try {
      // const result = await axios.post(
      //   'http://3.35.111.44:3001/likeboard/pressLikeboard',
      //   {
      //     BoardID: singleData.BoardId,
      //     Like: likeCnt - 1,
      //   },
      // );
      setLikeCnt(likeCnt - 1);
      setIsLikePressed(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onPressFunction = async () => {
    try {
      const result = await axios.post('http://3.35.111.44:3001/reply/create', {
        replyData,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{backgroundColor: BackgroundColor.snow, flex: 1}}>
      <ScrollView
        style={styles.totalContainer}
        // keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: vs(20)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={{color: 'black'}}>사진</Text>
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
              marginTop: vs(30),
              paddingHorizontal: ss(10),
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={styles.bottomContainer}
              onPress={() => handlePressLike()}>
              <View style={styles.iconContainer}>
                {isLikePressed ? (
                  <AntDesignIcon name="heart" color={TextColor.red} />
                ) : (
                  <AntDesignIcon name="hearto" color={TextColor.gray} />
                )}
              </View>
              {likeCnt === 0 ? (
                <Text style={styles.likeText}>{'좋아요'}</Text>
              ) : (
                <Text style={styles.likeText}>{likeCnt}</Text>
              )}
            </Pressable>
            <Pressable style={styles.bottomContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="message-reply-outline"
                  color={TextColor.gray}
                />
              </View>
              <Text style={styles.replyText}>
                {singleData.ReplyCount > 0 ? singleData.ReplyCount : '댓글'}
              </Text>
            </Pressable>
            <Pressable style={styles.bottomContainer}>
              <View style={styles.iconContainer}>
                <AntDesignIcon name="eyeo" color={TextColor.gray} />
              </View>
              <Text style={styles.viewText}>
                {singleData.Views > 0 ? singleData.Views : '조회수'}
              </Text>
            </Pressable>
          </View>

          <ReplyList replyData={replyData} />

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
                onPressFunction={onPressFunction}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
        <View style={{backgroundColor: BackgroundColor.white, padding: ss(10)}}>
          <Pressable onPress={() => {}}>
            <Text style={{color: TextColor.black, margin: ss(10)}}>
              신고하기
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  totalContainer: {
    padding: ss(25),
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
  bottomContainer: {flexDirection: 'row'},
  iconContainer: {justifyContent: 'center', marginRight: 5},
  likeText: {color: TextColor.gray},
  replyText: {color: TextColor.gray},
  viewText: {color: TextColor.gray},
});
