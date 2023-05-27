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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectedImage from 'components/SelectedImage';
import {hs, ss, vs} from 'utils/scailing';
import TypeModal from 'components/TypeModal';
import FastImage from 'react-native-fast-image';
import {showToast} from 'utils/toast';
import LoadingModal from 'components/LoadingModal';

function Posting() {
  const imageFlags = useMemo(
    () =>
      new RegExp(
        /image:\/\/0\/|image:\/\/1\/|image:\/\/2\/|image:\/\/3\/|image:\/\/4\//,
      ),
    [],
  );
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imagePlace, setImagePlace] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const InsertImageInContent = useCallback(() => {
    let copyContent = content.slice();

    const Result = [];
    let keyIndex = 0;
    for (let i = 0; i < 5; i++) {
      const matchInfo = imageFlags.exec(copyContent);
      if (!matchInfo) {
        Result.push(<Text key={keyIndex}>{copyContent}</Text>);
        copyContent = null;
        break;
      }
      if (matchInfo.index !== 0) {
        Result.push(
          <Text key={keyIndex}>
            {copyContent.slice(0, matchInfo.index - 1)}
          </Text>,
        );
        keyIndex += 1;
      }

      image[parseInt(matchInfo[0][8], 10)]
        ? Result.push(
            <FastImage
              key={keyIndex}
              style={{height: vs(300), width: hs(300)}}
              resizeMode="contain"
              source={{
                uri: image[parseInt(matchInfo[0][8], 10)].uri,
              }}
            />,
          )
        : Result.push(
            <MaterialIcons
              key={keyIndex}
              name="image-not-supported"
              color={'#4682B4'}
              size={ss(50)}
            />,
          );
      keyIndex += 1;
      copyContent = copyContent.slice(matchInfo.index + 10);
    }
    if (copyContent) {
      Result.push(<Text key={keyIndex}>{copyContent}</Text>);
    }
    return Result;
  }, [content, image, imageFlags]);

  const removeImageFromContent = index => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage([...newImages]);
    setImagePlace(imagePlace - 1);
  };

  const postBoard = async () => {
    const formData = new FormData();
    formData.append('Category', category);
    formData.append('Title', title);
    formData.append('Content', content);

    formData.append('user[UserId]', 'f3128064-28a4-47c2-bda4-9e1b5987300f');
    formData.append('user[Account]', 'qksdnjswo@gmail.com');
    formData.append('user[Nickname]', '반원재');

    formData.append(
      'files',
      image.map(each => {
        return {
          name: each.fileName,
          type: each.type,
          uri:
            Platform.OS === 'ios' ? each.uri.replace('file://', '') : each.uri,
        };
      }),
    );

    try {
      setIsLoading(true);
      const result = await axios.post('/board/create', formData, {
        headers: {
          'Content-topic': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
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
            <Text style={{color: 'black'}}>작성자: 한원석</Text>
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
          style={{borderWidth: ss(1), flex: 0.8}}
          nestedScrollEnabled={true}>
          <Text style={{color: 'black'}}>
            <Text style={{fontSize: ss(15), fontWeight: 'bold'}}>{title}</Text>
            {'\n'}
            {'\n'}
            {InsertImageInContent()}
          </Text>
        </ScrollView>
        <View>
          <TextInput
            style={{color: 'black', borderWidth: ss(1), marginTop: vs(20)}}
            placeholder="제목을 입력해주세요"
            placeholderTextColor={'black'}
            maxLength={50}
            multiline={true}
            onChangeText={setTitle}
          />
        </View>
        <View>
          <TextInput
            style={{color: 'black', borderWidth: ss(1), marginTop: vs(20)}}
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
