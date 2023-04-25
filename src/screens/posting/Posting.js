import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {hs, ss, vs} from '../../utils/scailing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

function Posting() {
  const categories = [
    'Tip',
    'Backbiting',
    'Salary',
    'Turnover',
    'Free',
    'Humor',
  ];
  const navigation = useNavigation();
  const [category, setCategory] = useState(categories[1]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (title.length > 0 && content.length > 0) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [title, content]);

  const handleChoosePhoto = async () => {
    if (image.length >= 5) {
      // 이미지는 5개 이상 업로드할 수 없습니다 경고하기.
      return;
    }
    // 차후에 이미지 한번에 여러개 업로드 하는 방법 찾아보기.
    const result = await launchImageLibrary({includeBase64: true});
    // const response = await axios.get(result.assets[0].uri);
    // RNFS.copyFile(result.assets[0].uri, );
    // const response = await fetch(result.assets[0].uri);

    setImage([...image, result.assets[0]]);
  };

  function HandleImage() {
    if (image.length === 0) return;
    return image.map((singleData, index) => {
      return (
        <View
          key={index}
          style={{
            marginTop: vs(20),
            height: vs(100),
            alignItems: 'flex-start',
            paddingLeft: hs(10),
            paddingVertical: vs(5),
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: singleData.uri}}
            style={{width: 50, height: 50}}
          />
          <View style={{marginLeft: hs(52), position: 'absolute'}}>
            <AntDesign
              name="closecircle"
              color={'#4682B4'}
              size={15}
              onPress={() => {
                const newImages = [...image];
                newImages.splice(index, 1);
                setImage([...newImages]);
              }}
            />
          </View>
        </View>
      );
    });
  }

  const postBoard = async () => {
    const formData = new FormData();
    // formData.append('Category', 'Free');
    // formData.append('Title', '임시타이틀');
    // formData.append('Content', '임시컨텐츠');
    // formData.append(
    //   'user',
    //   JSON.stringify({
    //     UserId: 'f3128064-28a4-47c2-bda4-9e1b5987300f',
    //     Account: 'qksdnjswo@gmail.com',
    //     Nickname: '반원재',
    //   }),
    // );
    // formData.append('user[UserId]', 'f3128064-28a4-47c2-bda4-9e1b5987300f');
    // formData.append('user[Account]', 'qksdnjswo@gmail.com');
    // formData.append('user[Nickname]', '반원재');

    formData.append('file', {
      name: image[0].fileName,
      type: image[0].type,
      uri:
        Platform.OS === 'ios'
          ? image[0].uri.replace('file://', '')
          : image[0].uri,
    });

    // if (image.length > 0) {
    //   const images = [];
    //   image.forEach(singleImage => {
    //     images.push(file);
    //   });
    // }

    // images.push({
    //   name: singleImage.fileName,
    //   type: singleImage.type,
    //   uri:
    //     Platform.OS === 'ios'
    //       ? singleImage.uri.replace('file://', '')
    //       : singleImage.uri,
    // }),

    // formData.append('files', image);

    try {
      const result = await axios.post(
        'http://192.168.123.105:3000/upload',
        formData,
      );
      // const result = await axios.post(
      //   'http://3.35.111.44:3001/board/create',
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmMzEyODA2NC0yOGE0LTQ3YzItYmRhNC05ZTFiNTk4NzMwMGYiLCJpYXQiOjE2ODIwNzgxMTYsImV4cCI6MTY4MjA4NTMxNn0.HCD7Bfrsx7DwTIiDa35rpb882Wk7s8oCf_QV3wT05UI`,
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   },
      // );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, marginHorizontal: hs(20), marginTop: vs(10)}}>
      <View style={{alignItems: 'flex-end'}}>
        <Pressable
          onPress={() => {
            postBoard();
          }}
          disabled={false}>
          <Text style={{color: isDisabled ? 'gray' : 'black'}}>등록</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Pressable onPress={() => {}}>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: ss(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: vs(15),
            }}>
            <Text style={{color: 'black'}}>등록위치 선택</Text>
            <AntDesign
              name="caretdown"
              color={'blue'}
              size={ss(10)}
              onPress={() => {}}
            />
          </View>
        </Pressable>
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
        <View>
          <TextInput
            style={{color: 'black'}}
            placeholder="제목을 입력해주세요"
            placeholderTextColor={'black'}
            maxLength={50}
            multiline={true}
            onChangeText={setTitle}
          />
        </View>
        <View>
          <TextInput
            style={{color: 'black'}}
            placeholder="내용을 입력해주세요"
            placeholderTextColor={'black'}
            maxLength={500}
            multiline={true}
            onChangeText={setContent}
          />
        </View>
        <View style={{flexDirection: 'row'}}>{HandleImage()}</View>
      </ScrollView>
    </View>
  );
}

export default Posting;
