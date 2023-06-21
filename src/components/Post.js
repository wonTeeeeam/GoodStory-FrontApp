import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {TextColor} from 'styles/TextColor';
import {hs, ss, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';
import axios from 'axios';
import useHandleImage from 'hooks/useHandleImage';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useCallback} from 'react';

export default function Post({singleData, navigation}) {
  const [likeCnt, setLikeCnt] = useState(singleData.Like);
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [viewCnt, setViewCnt] = useState(singleData.Views);
  const {deleteImageFlagsInContent} = useHandleImage();
  const {userId, likeBoards, likeReReplys, likeReplys} = useSelector(
    state => state.user,
  );
  useEffect(() => {
    checkIsLiked();
  }, [checkIsLiked]);
  const checkIsLiked = useCallback(() => {
    const isLiked = likeBoards.find(
      element => element.LikeBoardNumber === singleData.BoardId,
    );
    isLiked ? setIsLikePressed(true) : setIsLikePressed(false);
  }, [likeBoards, singleData]);

  const handlePressLike = async () => {
    !isLikePressed ? plusLike() : minusLike();
  };

  const plusLike = async () => {
    try {
      const result = await axios.post('/likeboard/presslikeboard', {
        LikeBoardNumber: singleData.BoardId,
        user: {
          UserId: userId,
        },
      });
      setLikeCnt(likeCnt + 1);
      setIsLikePressed(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const minusLike = async () => {
    try {
      const result = await axios.delete('/likeboard/pressdislikeboard', {
        data: {
          LikeBoardNumber: '1fe34e61-ae32-4d59-b6ab-f69029e26a6b',
          UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
        },
      });
      setLikeCnt(likeCnt - 1);
      setIsLikePressed(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleNavigate = async () => {
    try {
      const result = await axios.patch('/board/updateBoardViews', {
        BoardId: singleData.BoardId,
      });
      setViewCnt(viewCnt + 1);
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('DetailPost', {
      singleData,
    });
  };

  return (
    <View>
      <Pressable style={styles.allContainer} onPress={() => handleNavigate()}>
        <View style={styles.container}>
          <View style={styles.firstDetailContainer}>
            <Pressable>
              <Text style={styles.topicText}>{singleData.Category}</Text>
            </Pressable>
            <Text style={styles.timeText}>
              {convertTimeToKorean(singleData.Created_date)}
            </Text>
          </View>
          <View style={styles.secondDetailContainer}>
            <Pressable>
              <Text style={styles.companyNameText}>
                {singleData.user.CompanyName}
              </Text>
            </Pressable>
            <EntypoIcon
              name="dot-single"
              size={ss(20)}
              color={TextColor.gray}
            />
            <Pressable>
              <Text style={styles.nickNameText}>
                {singleData.user.Nickname}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{...styles.container, flex: 0.8}}>
            <View>
              <Text style={styles.titleText}>{singleData.Title}</Text>
            </View>
            <View>
              <Text style={styles.contextText}>
                {deleteImageFlagsInContent(singleData.Content)}
              </Text>
            </View>
          </View>
          <View style={{flex: 0.2, marginRight: hs(10)}}>
            {singleData.BoardPhotos[0] && (
              <FastImage
                style={{height: vs(75)}}
                source={{uri: singleData.BoardPhotos[0].URL}}
              />
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: ss(270),
            marginBottom: vs(30),
            marginLeft: ss(50),
          }}>
          <Pressable
            style={{...styles.bottomContainer}}
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
          <Pressable style={{...styles.bottomContainer, left: 120}}>
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
          <Pressable style={{...styles.bottomContainer, left: 240}}>
            <View style={styles.iconContainer}>
              <AntDesignIcon name="eyeo" color={TextColor.gray} />
            </View>
            <Text style={styles.viewText}>
              {singleData.Views > 0 ? singleData.Views : '조회수'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    height: vs(200),
  },
  container: {
    margin: ss(15),
    marginBottom: 0,
  },
  firstDetailContainer: {
    flexDirection: 'row',
    width: ss(105),
    justifyContent: 'space-between',
  },
  secondDetailContainer: {
    flexDirection: 'row',
    marginTop: ss(5),
    width: ss(105),
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    width: ss(270),
    margin: ss(40),
    marginLeft: ss(50),
    justifyContent: 'space-between',
  },
  bottomContainer: {flexDirection: 'row', position: 'absolute'},
  iconContainer: {justifyContent: 'center', marginRight: 5},
  topicText: {
    color: TextColor.black,
    fontWeight: 'bold',
  },
  timeText: {color: TextColor.silver},
  companyNameText: {color: TextColor.gray},
  nickNameText: {color: TextColor.gray},
  titleText: {
    color: TextColor.black,
    fontWeight: 'bold',
    fontSize: ss(20),
  },
  contextText: {color: TextColor.gray, fontSize: ss(15)},
  likeText: {color: TextColor.gray},
  replyText: {color: TextColor.gray},
  viewText: {color: TextColor.gray},
});
