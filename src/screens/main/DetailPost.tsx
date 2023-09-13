import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import DetailPostMain from 'components/DetailPostMain';
import ReplyList from 'components/ReplyList';
import {black, gray, red, white} from 'styles';
import {ss, vs, hs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';

import BottomModal from 'components/modal/BottomModal';
import BottomModalElement from 'components/BottomModalElement';
import FastImage from 'react-native-fast-image';
import usePressLike from 'hooks/usePressLike';
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from 'utils/react-native-vector-helper';
import {DetailBoardStackProps} from 'navigations/types';
import useBottomModal from 'hooks/useBottomModal';
import CommentBar from 'components/bar/CommentBar';

export type ReplyDatum = {
  ReplyId: string;
  Content: string;
  ReplyLike: number;
  Created_date: string;
  user: {
    UserId: string;
    Nickname: string;
    Role: string;
    Updated_date: string;
    Deleted_date: string;
    ProfilePhoto: string;
  };
  rereplies: [];
};

const DetailPost: React.FC<DetailBoardStackProps> = ({route, navigation}) => {
  const {singleData, firstViewCnt, firstLikeCnt, firstIsLikePressed} =
    route.params;
  const [replyData, setReplyData] = useState<ReplyDatum[]>([]);
  const handleSetReplyDatum = (newReplyData: ReplyDatum) => {
    setReplyData([...replyData, newReplyData]);
  };
  const scrollViewRef = useRef<ScrollView | null>(null);

  const {isModalVisible, changeModalVisible} = useBottomModal();

  const {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    setIsLikePressed,
    isLikePressed,
  } = usePressLike();

  useEffect(() => {
    setLikeCnt(firstLikeCnt);
    setIsLikePressed(firstIsLikePressed);
  }, []);

  useEffect(() => {
    fetchDetailData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: singleData.Category,
      headerRight: () => (
        <Entypo
          name="dots-three-vertical"
          color={black.origin}
          size={20}
          onPress={() => {
            changeModalVisible(!isModalVisible);
          }}
        />
      ),
    });
  }, []);

  const fetchDetailData = async () => {
    try {
      const result = await axios.get(`/board/getOne/${singleData.BoardId}`);
      setReplyData(result.data.replys);
    } catch (e) {}
  };

  return (
    <View style={{backgroundColor: white.snow, flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.totalContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={{padding: ss(20)}}>
            <View style={{}}>
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
                        alignItems: 'center',
                        height: vs(30),
                        width: hs(30),
                        borderRadius: ss(100),
                      }}
                    />
                  )}
                </View>
                <View style={styles.userContainer}>
                  <View style={styles.firstDetailContainer}>
                    <View>
                      <Text style={styles.topicText}>
                        {singleData.Category}
                      </Text>
                    </View>
                    <Text style={styles.timeText}>
                      {convertTimeToKorean(singleData.Created_date)}
                    </Text>
                  </View>
                  <View style={styles.secondDetailContainer}>
                    <View>
                      <Text style={styles.companyNameText}>
                        {singleData.user.CompanyName}
                      </Text>
                    </View>
                    <Pressable>
                      <Text style={styles.nickNameText}>
                        {singleData.user.Nickname}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={{marginTop: vs(30)}}>
                <DetailPostMain singleData={singleData} />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: vs(60),
                }}>
                <TouchableOpacity
                  style={styles.bottomContainer}
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
                </TouchableOpacity>
                <Pressable style={{...styles.bottomContainer, left: hs(120)}}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name="message-reply-outline"
                      color={gray.dimGray}
                    />
                  </View>
                  <Text style={styles.replyText}>
                    {replyData.length > 0 ? replyData.length : '댓글'}
                  </Text>
                </Pressable>
                <Pressable style={{...styles.bottomContainer, left: hs(240)}}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="eyeo" color={gray.dimGray} />
                  </View>
                  <Text style={styles.viewText}>
                    {firstViewCnt > 0 ? firstViewCnt : '조회수'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{marginTop: vs(30)}}>
            {replyData ? <ReplyList replyData={replyData} /> : undefined}
          </View>
        </View>
      </ScrollView>
      <CommentBar
        scrollViewRef={scrollViewRef}
        singleData={singleData}
        handleSetReplyDatum={handleSetReplyDatum}
      />
      <BottomModal
        isModalVisible={isModalVisible}
        changeModalVisible={changeModalVisible}>
        <BottomModalElement
          onPress={() => changeModalVisible(false)}
          text={'신고하기'}
        />
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {},
  userContainer: {
    justifyContent: 'center',
    width: ss(200),
    height: ss(40),
    marginLeft: hs(10),
    // backgroundColor: 'red',
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
  topicText: {
    color: black.origin,
    fontWeight: 'bold',
    fontSize: ss(10),
  },
  timeText: {color: gray.gainsboro, fontSize: ss(10)},
  companyNameText: {color: gray.dimGray, fontSize: ss(10)},
  nickNameText: {color: gray.dimGray, fontSize: ss(10)},
  nickName: {
    fontSize: ss(12),
    color: black.origin,
  },
  userLike: {
    color: gray.dimGray,
  },
  timeContainer: {marginVertical: ss(10)},
  date: {
    color: gray.dimGray,
    fontSize: ss(10),
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

export default DetailPost;
