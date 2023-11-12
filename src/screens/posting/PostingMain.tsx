import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';

import {AntDesign} from 'utils/react-native-vector-helper';
import SelectedImage from 'components/SelectedImage';
import {hs, ss, vs} from 'utils/scailing';
import {showToast} from 'utils/toast';
import LoadingModal from 'components/modal/LoadingModal';
import {black, gray} from 'styles';
import {useAppSelector} from 'store/hooks';
import {requestNewPosting} from 'api/board';
import {BottomStackProps} from 'navigations/types';
import {alert} from 'utils/alert';
import {changeTopicToEnglish} from 'utils/translation';

const PostingMain = () => {
  const navigation = useNavigation<BottomStackProps['navigation']>();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState<Asset[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const {nickName, account, userId} = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  useEffect(() => {
    if (title.length > 0 && content.length > 0 && category) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [title, content, category]);

  const handleChoosePhoto = async () => {
    if (imageList.length >= 5) {
      showToast('이미지는 5개 이상 업로드할 수 없습니다');
      return;
    }
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
    });
    if (result.didCancel || !result.assets) {
      return;
    }
    setImageList([...imageList, result.assets[0]]);
  };

  const removeImageFromContent = (index: number) => {
    const newImages = [...imageList];
    newImages.splice(index, 1);
    setImageList([...newImages]);
  };

  const makeFormData = () => {
    const formData = new FormData();
    formData.append('Category', changeTopicToEnglish(category));
    formData.append('Title', title);
    formData.append('Content', content);

    formData.append('user[UserId]', userId);
    formData.append('user[Account]', account);
    formData.append('user[Nickname]', nickName);

    imageList.forEach((image, index) => {
      if (!image.uri) {
        alert({
          title: '사진 업로드 실패',
          body: `${
            index + 1
          }번째 사진에 문제가 생겼습니다. 사진을 다시 입력해주세요.`,
        });
        return null;
      }
      formData.append('files', {
        name: image.fileName,
        type: image.type,
        uri:
          Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      });
    });
    return formData;
  };

  const postBoard = async () => {
    const formData = makeFormData();
    if (!formData) {
      return;
    }
    setIsLoading(true);
    const newPostingResult = await requestNewPosting(formData);
    if (!newPostingResult) {
      return;
    }
    showToast('게시글 등록에 성공하였습니다.');
    setIsLoading(false);
    navigation.navigate('Board', {boardTopic: category});
  };

  const TopicItem = (text: string) => {
    const handleOnPress = () => {
      setCategory(text);
      setIsCategoryModalVisible(false);
    };

    return (
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={styles.categoryItems}>{text}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <LoadingModal isVisible={isLoading} />;
  }

  return (
    <View style={styles.totalContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.nickName}>{`작성자: ${
            nickName || undefined
          }`}</Text>
        </View>
        <Pressable
          onPress={async () => {
            if (!isDisabled) {
              const keepGo = await alert({
                title: '게시글을 등록하시겠습니까?',
                body: '게시글을 최종적으로 등록하시겠습니까?',
                isConfirm: true,
              });
              if (keepGo) postBoard();
            } else {
              showToast('제목, 내용, 카테고리를 입력해주세요');
            }
          }}
          disabled={false}>
          <Text
            style={{
              color: isDisabled ? gray.gainsboro : black.origin,
              fontSize: ss(15),
            }}>
            등록
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => setIsCategoryModalVisible(true)}
          style={{
            marginTop: vs(50),
            borderBottomWidth: ss(1),
            borderBottomColor: gray.lightGray,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: black.origin}}>
            {category || '카테고리를 선택해주세요'}
          </Text>
          <AntDesign name="caretdown" size={ss(10)} color={'#B2B0B0'} />
        </Pressable>
        <View>
          <TextInput
            style={styles.titleInput}
            placeholder="제목을 입력해주세요(최대 50자)."
            placeholderTextColor={gray.gainsboro}
            maxLength={50}
            multiline={true}
            onChangeText={setTitle}
            autoFocus={true}
          />
        </View>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            handleChoosePhoto();
          }}>
          <AntDesign name="picture" color={gray.dimGray} size={ss(25)} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.bodyInput}
            placeholder="내용을 입력해주세요(최대 500자)."
            placeholderTextColor={gray.gainsboro}
            maxLength={500}
            multiline={true}
            onChangeText={setContent}
            value={content}
          />
        </View>
        <View>
          <SelectedImage
            images={imageList}
            removeImageFromContent={removeImageFromContent}
          />
        </View>
      </ScrollView>
      <Modal
        isVisible={isCategoryModalVisible}
        backdropOpacity={0.3}
        onBackdropPress={() => setIsCategoryModalVisible(false)}
        onBackButtonPress={() => setIsCategoryModalVisible(false)}
        backdropColor={'black'}>
        <View
          style={{
            flex: 0.2,
            backgroundColor: gray.lightGray,
            borderRadius: ss(10),
          }}>
          <ScrollView>
            {TopicItem('꿀팁')}
            {TopicItem('뒷담')}
            {TopicItem('연봉')}
            {TopicItem('이직')}
            {TopicItem('자유')}
            {TopicItem('유머')}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {flex: 1, marginHorizontal: hs(20), marginTop: vs(20)},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nickName: {
    color: 'black',
    fontSize: ss(15),
  },
  titleInput: {
    color: black.origin,
    marginTop: vs(20),
    fontSize: ss(15),
  },
  bodyInput: {
    color: 'black',
    marginTop: vs(10),
  },
  categoryItems: {
    color: black.origin,
    paddingLeft: hs(12),
    paddingVertical: vs(7),
  },
});

export default PostingMain;
