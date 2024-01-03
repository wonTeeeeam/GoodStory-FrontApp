import React, {useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import {black, blue, gray, white} from 'styles';
import {hs, ss, vs} from 'utils/scailing';
import {AntDesign} from 'utils/react-native-vector-helper';
import BottomModal from 'components/modal/BottomModal';
import BottomModalElement from 'components/BottomModalElement';
import useBottomModal from 'hooks/useModal';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {showToast} from 'utils/toast';
import {useAppSelector} from 'store/hooks';
import {ReplyDatum} from 'screens/main/DetailPost';
import {PostListElement} from 'hooks/useFetchPostList';
import {requestRegisterReply} from 'api/reply';
import {useDispatch} from 'react-redux';
import {changeBoardCountExisted} from 'slice/boardCountDetailSlice';
import {RootState} from 'store/store';
import LoadingModal from './LoadingModal';
import {changeMyPageBoardCountExisted} from 'slice/myActivityCountDetailSlice';

type Props = {
  isCommentModalVisible: boolean;
  handleSetIsCommentModalVisible: (newValue: boolean) => void;
  singleData: PostListElement;
  handleSetReplyDatum: (newReply: ReplyDatum) => void;
};

const CommentModal: React.FC<Props> = ({
  isCommentModalVisible,
  handleSetIsCommentModalVisible,
  singleData,
  handleSetReplyDatum,
}) => {
  const {isModalVisible, changeModalVisible} = useBottomModal();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImage] = useState<Asset>();
  const [input, setInput] = useState('');
  const {userId} = useAppSelector(state => state.user);
  const boardCountDetail = useAppSelector(
    (state: RootState) => state.boardCountDetail,
  ).find(boardCount => boardCount.BoardId === singleData.BoardId);

  const myPageBoardCountDetail = useAppSelector(
    (state: RootState) => state.myActivityCountDetail,
  ).find(boardCount => boardCount.BoardId === singleData.BoardId);

  const dispatch = useDispatch();

  const handleChoosePhoto = async () => {
    if (img && img.uri) {
      showToast('이미지는 최대 1개만 가능합니다');
      return;
    }
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
      return;
    } else if (result.assets && result.assets[0]) {
      setImage(result.assets[0]);
    }
  };

  const makeFormData = () => {
    const formData = new FormData();
    formData.append('Content', input);
    formData.append('user[UserId]', userId);
    formData.append('board[BoardId]', singleData.BoardId);

    if (img?.uri) {
      formData.append('file', {
        name: img.fileName,
        type: img.type,
        uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
      });
    }

    return formData;
  };

  const registerReply = async () => {
    if (input.length === 0) {
      return showToast(`댓글을 작성해주세요!!`);
    }
    if (!userId) {
      showToast('로그인이 필요한 서비스입니다!');
    }
    const formData = makeFormData();
    setIsLoading(true);
    const registerResult = await requestRegisterReply(formData);
    if (registerResult) {
      showToast('댓글 작성 완료!');
      handleSetIsCommentModalVisible(false);
      handleSetReplyDatum(registerResult);
    }

    setIsLoading(false);
    if (!boardCountDetail && !myPageBoardCountDetail) {
      return showToast(
        '댓글 개수 업데이트에 실패하였습니다!\n재접속 시 정상작동합니다.',
      );
    }
    if (boardCountDetail) {
      dispatch(
        changeBoardCountExisted({
          BoardId: singleData.BoardId,
          likeCnt: boardCountDetail.likeCnt,
          replyCnt: boardCountDetail.replyCnt + 1,
          viewCnt: boardCountDetail.viewCnt,
        }),
      );
    }
    if (myPageBoardCountDetail) {
      dispatch(
        changeMyPageBoardCountExisted({
          BoardId: singleData.BoardId,
          likeCnt: myPageBoardCountDetail.likeCnt,
          replyCnt: myPageBoardCountDetail.replyCnt + 1,
          viewCnt: myPageBoardCountDetail.viewCnt,
        }),
      );
    }
  };

  return (
    <View>
      <Modal
        isVisible={isCommentModalVisible}
        backdropOpacity={1}
        backdropColor={white.snow}>
        <View style={{flex: 1}}>
          {isLoading && <LoadingModal isVisible={isLoading} />}
          <View style={styles.commentBarContainer}>
            <AntDesign
              name="close"
              color={black.origin}
              size={ss(20)}
              onPress={() => handleSetIsCommentModalVisible(false)}
            />
            <Text style={{color: black.origin, fontSize: ss(20)}}>
              댓글 남기기
            </Text>
            <TouchableOpacity
              onPress={() => {
                registerReply();
              }}>
              <Text style={{color: blue.steelBlue, fontSize: ss(15)}}>
                등록
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainText}>
            <Text style={{color: black.Onyx, fontSize: ss(15)}}>
              {singleData.Title}
            </Text>
            <AntDesign
              name="down"
              color={black.Onyx}
              size={ss(20)}
              onPress={() => {
                changeModalVisible(true);
              }}
            />
          </View>
          <Pressable
            onPress={handleChoosePhoto}
            style={{marginTop: vs(10), alignSelf: 'flex-end'}}>
            <AntDesign name="picture" color={blue.steelBlue} size={ss(20)} />
          </Pressable>
          <ScrollView>
            <TextInput
              autoFocus={true}
              style={{marginTop: vs(20), color: black.origin}}
              placeholder={`내 댓글`}
              placeholderTextColor={gray.gainsboro}
              multiline={true}
              maxLength={300}
              value={input}
              onChangeText={setInput}
            />
            {img?.uri ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: img.uri}}
                  style={{width: hs(300), height: vs(300)}}
                  resizeMode="cover"
                />
                <View style={{marginLeft: hs(290), position: 'absolute'}}>
                  <AntDesign
                    name="closecircle"
                    color={'#4682B4'}
                    size={ss(20)}
                    onPress={() => {
                      setImage(undefined);
                    }}
                  />
                </View>
              </View>
            ) : undefined}
          </ScrollView>
        </View>
      </Modal>
      <BottomModal
        isModalVisible={isModalVisible}
        changeModalVisible={changeModalVisible}>
        <BottomModalElement text={singleData.Content} />
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    marginTop: vs(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginTop: vs(20),
    paddingVertical: vs(5),
    flexDirection: 'row',
  },
});

export default CommentModal;
