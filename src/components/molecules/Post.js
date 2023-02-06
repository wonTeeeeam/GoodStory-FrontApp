import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {TextColor} from '../../styles/TextColor';
import {moderateScale, verticalScale} from '../../utils/scailing';
import {convertTimeToKorean} from '../../utils/timeConverter';

export default function Post({singleData, navigation}) {
  // const [likeCnt, setLikeCnt] = useState(postData.Like);
  // const [replyCnt, setReplyCnt] = useState(postData.ReplyCount);
  // const [viewCnt, setViewCnt] = useState(postData.Views);

  // const renderLikeCnt = () => {
  //   if(postData.Like === 0) return '좋아요'
  //   else if (likeCnt > postData.Like) return likeCnt;
  //   else if (postData.Like > 0) return postData.Like;

  //   return '좋아요';
  // };

  return (
    <View>
      <Pressable
        style={styles.allContainer}
        onPress={() =>
          navigation.navigate('DetailPost', {
            singleData,
          })
        }>
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
              <Text style={styles.companyNameText}>회사명</Text>
            </Pressable>
            <EntypoIcon
              name="dot-single"
              size={moderateScale(20)}
              color={TextColor.gray}
            />
            <Pressable>
              <Text style={styles.nickNameText}>
                {singleData.user.Nickname}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>{singleData.Title}</Text>
          </View>
          <View>
            <Text style={styles.contextText}>{singleData.Summary}</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <Pressable
            style={styles.bottomContainer}
            onPress={() => setLikeCnt(prev => prev + 1)}>
            <View style={styles.iconContainer}>
              {singleData.Like > 0 ? (
                <AntDesignIcon name="heart" color={TextColor.red} />
              ) : (
                <AntDesignIcon name="hearto" color={TextColor.gray} />
              )}
            </View>
            <Text style={styles.likeText}>{'좋아요'}</Text>
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    height: verticalScale(200),
  },
  container: {
    margin: moderateScale(15),
    marginBottom: 0,
  },
  firstDetailContainer: {
    flexDirection: 'row',
    width: moderateScale(105),
    justifyContent: 'space-between',
  },
  secondDetailContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(5),
    width: moderateScale(105),
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    width: moderateScale(270),
    margin: moderateScale(40),
    marginLeft: moderateScale(50),
    justifyContent: 'space-between',
  },
  bottomContainer: {flexDirection: 'row'},
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
    fontSize: moderateScale(25),
  },
  contextText: {color: TextColor.gray, fontSize: moderateScale(20)},
  likeText: {color: TextColor.gray},
  replyText: {color: TextColor.gray},
  viewText: {color: TextColor.gray},
});
