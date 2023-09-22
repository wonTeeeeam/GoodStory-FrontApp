import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {AntDesign} from 'utils/react-native-vector-helper';
import SelectedImage from 'components/SelectedImage';
import {hs, ss, vs} from 'utils/scailing';
import {showToast} from 'utils/toast';
import LoadingModal from 'components/modal/LoadingModal';
import useHandleImage from 'hooks/useHandleImage';
import {black, gray} from 'styles';
import {useAppSelector} from 'store/hooks';
import {requestNewPosting} from 'api/board';
import {BottomStackProps} from 'navigations/types';
import {alert} from 'utils/alert';

const PostingMain = () => {
  const navigation = useNavigation<BottomStackProps['navigation']>();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState<Asset[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imagePlace, setImagePlace] = useState(0);
  const {nickName, account, userId} = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const {InsertImageInContent} = useHandleImage();

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
    setContent(content + `image://${imagePlace}/`);
    setImagePlace(imagePlace + 1);
  };

  const removeImageFromContent = (index: number) => {
    const newImages = [...imageList];
    newImages.splice(index, 1);
    setImageList([...newImages]);
    setImagePlace(imagePlace - 1);
  };

  const makeFormData = () => {
    const formData = new FormData();
    formData.append('Category', category);
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

    const newPostingResult = await requestNewPosting(formData);
    if (!newPostingResult) {
      return;
    }
    showToast('게시글 등록에 성공하였습니다.');
    navigation.navigate('Board', {boardTopic: category});
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
          onPress={() => {
            if (!isDisabled) {
              postBoard();
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
            다음
          </Text>
        </Pressable>
      </View>

      <ScrollView
        // contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        {/* <View style={{}}>
          <TypeModal category={category} handleSetCategory={setCategory} />
        </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: vs(0),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}> */}

        {/* <View style={{marginLeft: hs(10)}}>
              <Pressable onPress={() => {}}>
                <MaterialCommunityIcons
                  name="vote"
                  color={'#4682B4'}
                  size={ss(30)}
                />
              </Pressable>
            </View> */}
        {/* </View> */}
        {/* </View> */}
        {/* <ScrollView
          style={{
            borderWidth: ss(1),
            flex: 0.8,
            borderRadius: ss(10),
            marginTop: ss(10),
            borderColor: 'darkgray',
          }}
          nestedScrollEnabled={true}>
          <Text style={{color: 'black'}}>
            <Text style={{fontSize: ss(15), fontWeight: 'bold'}}>{title}</Text>
            {'\n'}
            {'\n'}
            {InsertImageInContent(content, image)}
          </Text>
        </ScrollView> */}
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
        <Pressable
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            handleChoosePhoto();
          }}>
          <AntDesign name="picture" color={gray.dimGray} size={ss(25)} />
        </Pressable>
        <View>
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
        <View style={{flexDirection: 'row'}}>
          <SelectedImage
            images={imageList}
            removeImageFromContent={removeImageFromContent}
          />
        </View>
      </ScrollView>
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
});

export default PostingMain;
