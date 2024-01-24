import {useNavigation} from '@react-navigation/native';
import useDeleteOrEdit from 'hooks/useDeleteOrEdit';
import {PostListElement} from 'hooks/useFetchPostList';
import useLikeAndView from 'hooks/useLikeAndView';
import {MainStackProps} from 'navigations/types';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BoardCountDetail} from 'slice/boardCountDetailSlice';
import {black, gray, red} from 'styles';
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from 'utils/react-native-vector-helper';
import LoadingModal from 'components/modal/LoadingModal';
import {hs, ss, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';
import {changeTopicToKorean} from 'utils/translation';

import {useAppSelector} from '../store/hooks';
import {RootState} from '../store/store';
import {alert} from 'utils/alert';

type Props = {
  singleData: PostListElement;
  boardCountDetail: BoardCountDetail | undefined;
  deletePost: (boardId: string) => void;
};

const Post: React.FC<Props> = ({singleData, boardCountDetail, deletePost}) => {
  const {likeBoards, userId} = useAppSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<MainStackProps['navigation']>();

  const {
    handlePressLike,
    isLikePressed,
    setIsLikePressed,
    handlePlusView,
    navigateDetailPost,
  } = useLikeAndView();

  const {deleteBoard} = useDeleteOrEdit();

  const handleOnDelete = async (item: PostListElement) => {
    const keepGoing = await alert({
      title: '게시글 삭제',
      body: '게시글 삭제하시겠습니까?',
      isConfirm: true,
    });
    if (!keepGoing) return;

    setIsLoading(true);
    const isDeleted = await deleteBoard(item.BoardId);
    if (isDeleted) {
      deletePost(item.BoardId);
    }
    setIsLoading(false);
  };

  const handleOnEdit = (item: PostListElement) => {
    navigation.navigate('BottomStack', {
      screen: 'Posting',
      params: {item},
    });
  };

  const checkIsLiked = useCallback(() => {
    const isLiked = likeBoards.find(element => element === singleData.BoardId);
    isLiked ? setIsLikePressed(true) : setIsLikePressed(false);
  }, [likeBoards, singleData, setIsLikePressed]);

  useEffect(() => {
    checkIsLiked();
  }, [checkIsLiked]);

  const handleNavigate = async () => {
    // 조회수 올리는데 실패해도 그냥 넘어갑시다.
    await handlePlusView(singleData);
    navigateDetailPost(singleData);
  };

  const hideContent = (content: string, maxLength: number) => {
    return content.length > maxLength
      ? content.slice(0, maxLength + 1) + '...'
      : content;
  };

  if (isLoading) return <LoadingModal isVisible={isLoading} />;

  return (
    <View>
      <TouchableOpacity
        style={styles.allContainer}
        onPress={() => handleNavigate()}>
        <View style={styles.container}>
          <View style={styles.firstDetailContainer}>
            <View>
              <Text style={styles.topicText}>
                {changeTopicToKorean(singleData.Category)}
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
          {userId === singleData.user.UserId && (
            <>
              <TouchableOpacity
                onPress={() => {
                  handleOnEdit(singleData);
                }}
                style={{position: 'absolute', right: hs(40), top: vs(15)}}>
                <Octicons name="pencil" color={black.origin} size={ss(18)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleOnDelete(singleData);
                }}
                style={{position: 'absolute', right: hs(0), top: vs(15)}}>
                <AntDesign name="delete" color={black.origin} size={ss(18)} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={{flexDirection: 'row', flex: 0.7}}>
          <View style={{...styles.container, flex: 0.8}}>
            <View>
              <Text style={styles.titleText}>
                {hideContent(singleData.Title, 12)}
              </Text>
            </View>
            <View style={{marginTop: vs(10), paddingLeft: hs(3)}}>
              <Text style={styles.contextText}>
                {hideContent(singleData.Content, 60)}
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
          <TouchableOpacity
            style={{...styles.bottomContainer, left: hs(20)}}
            onPress={async () => await handlePressLike(singleData)}>
            <View style={styles.iconContainer}>
              {isLikePressed ? (
                <AntDesign name="heart" color={red.hotLips} />
              ) : (
                <AntDesign name="hearto" color={gray.dimGray} />
              )}
            </View>
            {boardCountDetail?.likeCnt === 0 ? (
              <Text style={styles.likeText}>{'좋아요'}</Text>
            ) : (
              <Text style={styles.likeText}>{boardCountDetail?.likeCnt}</Text>
            )}
          </TouchableOpacity>
          <Pressable style={{...styles.bottomContainer, left: hs(140)}}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="message-reply-outline"
                color={gray.dimGray}
              />
            </View>
            <Text style={styles.replyText}>
              {boardCountDetail?.replyCnt === 0
                ? '댓글'
                : boardCountDetail?.replyCnt}
            </Text>
          </Pressable>
          <Pressable style={{...styles.bottomContainer, left: hs(250)}}>
            <View style={styles.iconContainer}>
              <AntDesign name="eyeo" color={gray.dimGray} />
            </View>
            <Text style={styles.viewText}>
              {boardCountDetail?.viewCnt === 0
                ? '조회수'
                : boardCountDetail?.viewCnt}
            </Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
  timeText: {color: gray.gainsboro, fontSize: ss(10)},
  companyNameText: {color: gray.dimGray, fontSize: ss(10)},
  nickNameText: {color: gray.dimGray, fontSize: ss(10)},
  titleText: {
    color: black.origin,
    fontWeight: 'bold',
    fontSize: ss(18),
  },
  contextText: {color: gray.dimGray, fontSize: ss(13)},
  likeText: {color: gray.dimGray},
  replyText: {color: gray.dimGray},
  viewText: {color: gray.dimGray},
});

export default Post;
