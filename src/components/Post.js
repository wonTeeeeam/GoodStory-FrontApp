import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {black, red} from 'styles';
import {hs, ss, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';
import useHandleImage from 'hooks/useHandleImage';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {gray} from 'styles';
import useLikeAndView from 'hooks/useLikeAndView';

export default function Post({singleData}) {
  const {deleteImageFlagsInContent} = useHandleImage();
  const {userId, likeBoards, likeReReplies, likeReplies} = useSelector(
    state => state.user,
  );
  const navigation = useNavigation();

  const {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    isLikePressed,
    setIsLikePressed,
    viewCnt,
    setViewCnt,
    handlePlusView,
    navigateDetailPost,
  } = useLikeAndView();

  const checkIsLiked = useCallback(() => {
    const isLiked = likeBoards.find(element => element === singleData.BoardId);
    isLiked ? setIsLikePressed(true) : setIsLikePressed(false);
  }, [likeBoards, singleData, setIsLikePressed]);

  useEffect(() => {
    checkIsLiked();
  }, [checkIsLiked]);

  useEffect(() => {
    setLikeCnt(singleData.Like);
    setViewCnt(singleData.Views);
  }, [singleData.Like, singleData.Views, setLikeCnt, setViewCnt]);

  const handleNavigate = async () => {
    // 조회수 올리는데 실패해도 그냥 넘어갑시다.
    await handlePlusView(singleData);
    navigateDetailPost(singleData);
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
            {/* <EntypoIcon
              name="dot-single"
              size={ss(15)}
=            /> */}
            <Pressable>
              <Text style={styles.nickNameText}>
                {singleData.user.Nickname}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.7}}>
          <View style={{...styles.container, flex: 0.8}}>
            <View>
              <Text style={styles.titleText}>{singleData.Title}</Text>
            </View>
            <View style={{marginTop: vs(10), paddingLeft: hs(3)}}>
              <Text style={styles.contextText}>
                {deleteImageFlagsInContent(singleData.Content)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              marginRight: hs(10),
              marginTop: vs(15),
            }}>
            {singleData.BoardPhotos[0] && (
              <FastImage
                testID="boardImage"
                style={{height: vs(62), borderRadius: ss(10)}}
                source={{uri: singleData.BoardPhotos[0].URL}}
              />
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: vs(30),
          }}>
          <Pressable
            style={({pressed}) => [
              {...styles.bottomContainer, left: hs(20)},
              {backgroundColor: pressed ? gray.lightGray : null},
            ]}
            onPress={async () => await handlePressLike(singleData)}>
            <View style={styles.iconContainer}>
              {isLikePressed ? (
                <AntDesignIcon name="heart" color={red.hotLips} />
              ) : (
                <AntDesignIcon name="hearto" color={gray.origin} />
              )}
            </View>
            {likeCnt === 0 ? (
              <Text style={styles.likeText}>{'좋아요'}</Text>
            ) : (
              <Text style={styles.likeText}>{likeCnt}</Text>
            )}
          </Pressable>
          <Pressable style={{...styles.bottomContainer, left: hs(140)}}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="message-reply-outline"
                color={gray.origin}
              />
            </View>
            <Text style={styles.replyText}>
              {singleData.ReplyCount > 0 ? singleData.ReplyCount : '댓글'}
            </Text>
          </Pressable>
          <Pressable style={{...styles.bottomContainer, left: hs(250)}}>
            <View style={styles.iconContainer}>
              <AntDesignIcon name="eyeo" color={gray.origin} />
            </View>
            <Text style={styles.viewText}>
              {singleData.Views > 0 ? viewCnt : '조회수'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    height: vs(180),
  },
  container: {
    margin: ss(15),
    marginBottom: 0,
  },
  firstDetailContainer: {
    flexDirection: 'row',
    width: ss(70),
    justifyContent: 'space-between',
  },
  secondDetailContainer: {
    flexDirection: 'row',
    marginTop: ss(0),
    width: ss(70),
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: ss(20),
    width: hs(75),
  },
  iconContainer: {justifyContent: 'center', marginRight: ss(5)},
  topicText: {
    color: black.origin,
    fontWeight: 'bold',
    fontSize: ss(10),
  },
  timeText: {color: gray.silver, fontSize: ss(10)},
  companyNameText: {color: gray.origin, fontSize: ss(10)},
  nickNameText: {color: gray.origin, fontSize: ss(10)},
  titleText: {
    color: black.origin,
    fontWeight: 'bold',
    fontSize: ss(18),
  },
  contextText: {color: gray.origin, fontSize: ss(13)},
  likeText: {color: gray.origin},
  replyText: {color: gray.origin},
  viewText: {color: gray.origin},
});
