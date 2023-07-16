import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectedImage from 'components/SelectedImage';
import {hs, ss, vs} from 'utils/scailing';
import TypeModal from 'components/TypeModal';
import {showToast} from 'utils/toast';
import LoadingModal from 'components/LoadingModal';
import {useSelector} from 'react-redux';
import useHandleImage from 'hooks/useHandleImage';
import useApi from 'hooks/useApi';
import {alert} from 'utils/alert';

function Posting() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imagePlace, setImagePlace] = useState(0);
  const {nickName, account, userId} = useSelector(state => state.user);
  const {InsertImageInContent} = useHandleImage();
  const {handleAsyncMethod, isLoading} = useApi();

  useEffect(() => {
    if (title.length > 0 && content.length > 0 && category) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [title, content, category]);

  const handleChoosePhoto = async () => {
    if (image.length >= 5) {
      showToast('이미지는 5개 이상 업로드할 수 없습니다');
      return;
    }
    // 차후에 이미지 한번에 여러개 업로드 하는 방법 찾아보기.
    const result = await launchImageLibrary({includeBase64: true});
    if (result.didCancel) {
      return;
    }
    setImage([...image, result.assets[0]]);
    setContent(content + `image://${imagePlace}/`);
    setImagePlace(imagePlace + 1);
  };

  const removeImageFromContent = index => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage([...newImages]);
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

    image.forEach((photo, index) => {
      formData.append('files', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
    });
    return formData;
  };

  const onSuccessPosting = result => {
    showToast('게시글 등록에 성공하였습니다.');
    navigation.navigate('BoardStack', {boardTopic: category});
  };

  const onErrorPosting = error => {
    alert({
      title: '게시글 등록 실패',
      body: '게시글 등록에 실패했습니다.\n잠시후에 시도해주세요.',
    });
  };

  const postBoard = async () => {
    const formData = makeFormData();
    const postFormData = async () => {
      return await axios.post('/board/create', formData, {
        headers: {
          'Content-topic': 'multipart/form-data',
        },
      });
    };
    await handleAsyncMethod(postFormData, onSuccessPosting, onErrorPosting);
  };

  return (
    <View style={{flex: 1, marginHorizontal: hs(20), marginTop: vs(10)}}>
      <View
        style={{
          alignItems: 'flex-end',
          flexGrow: 0.1,
          justifyContent: 'center',
        }}>
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
            style={{color: isDisabled ? 'gray' : 'black', fontSize: ss(15)}}>
            등록
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 0.9}}
        showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <TypeModal category={category} handleSetCategory={setCategory} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: vs(20),
          }}>
          <View style={{}}>
            <Text style={{color: 'black'}}>{`작성자: ${nickName}`}</Text>
          </View>
          <View
            style={{
              borderColor: '#C0C0C0',
              borderWidth: 1,
              borderStyle: 'solid',
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={() => {
                handleChoosePhoto();
              }}>
              <AntDesign name="picture" color={'#4682B4'} size={ss(30)} />
            </Pressable>
            <View style={{marginLeft: hs(10)}}>
              <Pressable onPress={() => {}}>
                <MaterialCommunityIcons
                  name="vote"
                  color={'#4682B4'}
                  size={ss(30)}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView
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
        </ScrollView>
        <View>
          <TextInput
            style={{
              color: 'black',
              borderWidth: ss(1),
              marginTop: vs(20),
              borderRadius: ss(10),
              borderColor: 'darkgray',
            }}
            placeholder="제목을 입력해주세요"
            placeholderTextColor={'black'}
            maxLength={50}
            multiline={true}
            onChangeText={setTitle}
          />
        </View>
        <View>
          <TextInput
            style={{
              color: 'black',
              borderWidth: ss(1),
              marginTop: vs(20),
              borderRadius: ss(10),
              borderColor: 'darkgray',
            }}
            placeholder="내용을 입력해주세요"
            placeholderTextColor={'black'}
            maxLength={500}
            multiline={true}
            onChangeText={setContent}
            value={content}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <SelectedImage
            images={image}
            setImage={setImage}
            removeImageFromContent={removeImageFromContent}
          />
        </View>
      </ScrollView>
      <LoadingModal isVisible={isLoading} />
    </View>
  );
}

export default Posting;
