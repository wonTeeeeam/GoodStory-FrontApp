import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
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
import FastImage from 'react-native-fast-image';

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
  const [topic, setTopic] = useState();
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);

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
    if (result.didCancel) return;
    const Image = (
      <FastImage
        style={{height: vs(75)}}
        source={{uri: result.assets[0].uri}}
      />
    );
    setImage([...image, result.assets[0]]);
    setContent(content + Image);
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
          <FastImage
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
    formData.append('Category', 'Free');
    formData.append('Title', '임시타이틀');
    formData.append('Content', '임시컨텐츠');

    formData.append('user[UserId]', 'f3128064-28a4-47c2-bda4-9e1b5987300f');
    formData.append('user[Account]', 'qksdnjswo@gmail.com');
    formData.append('user[Nickname]', '반원재');

    formData.append('files', {
      name: image[0].fileName,
      topic: image[0].topic,
      uri:
        Platform.OS === 'ios'
          ? image[0].uri.replace('file://', '')
          : image[0].uri,
    });

    try {
      // const result = await axios.post(
      //   'http://3.35.111.44:3001/board/create',
      //   formData,
      // );
      const result = await axios.post('/board/create', formData, {
        headers: {
          'Content-topic': 'multipart/form-data',
        },
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const changeTopicToKorean = () => {
    switch (topic) {
      case 'Tip':
        return '꿀팁';
      case 'Backbiting':
        return '뒷담';
      case 'Salary':
        return '연봉';
      case 'Turnover':
        return '이직';
      case 'Free':
        return '자유';
      case 'Humor':
        return '유머';
    }
  };

  return (
    <View style={{flex: 1, marginHorizontal: hs(20), marginTop: vs(10)}}>
      <View
        style={{
          alignItems: 'flex-end',
          flex: 0.1,
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => {
            if (!isDisabled) {
              postBoard();
            }
          }}
          disabled={false}>
          <Text style={{color: isDisabled ? 'gray' : 'black'}}>등록</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{flex: 0.9}}>
        <Pressable
          onPress={() => {
            setIsDropDown(!isDropDown);
          }}>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: ss(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: vs(15),
            }}>
            <Text style={{color: 'black'}}>
              {topic ? changeTopicToKorean() : '등록위치 선택'}
            </Text>
            <AntDesign name="caretdown" color={'blue'} size={ss(10)} />
          </View>
        </Pressable>

        <Modal visible={isDropDown} transparent animationtopic="none">
          <Pressable
            style={{flex: 1}}
            onPress={() => {
              setIsDropDown(false);
            }}>
            <View
              style={{
                marginTop: vs(65),
                marginHorizontal: hs(20),
                backgroundColor: 'white',
              }}>
              <ScrollView style={{paddingHorizontal: hs(10)}}>
                <Pressable
                  onPress={() => {
                    setIsDropDown(false);
                    setTopic('Tip');
                  }}>
                  <Text style={{color: 'black', marginVertical: vs(5)}}>
                    꿀팁
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsDropDown(false);
                    setTopic('Backbiting');
                  }}>
                  <Text style={{color: 'black', marginVertical: vs(5)}}>
                    뒷담
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsDropDown(false);
                    setTopic('Salary');
                  }}>
                  <Text style={{color: 'black', marginVertical: vs(5)}}>
                    연봉
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsDropDown(false);
                    setTopic('Turnover');
                  }}>
                  <Text style={{color: 'black', marginVertical: vs(5)}}>
                    이직
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsDropDown(false);
                    setTopic('Free');
                  }}>
                  <Text style={{color: 'black', marginVertical: vs(5)}}>
                    자유
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsDropDown(false);
                    setTopic('Humor');
                  }}>
                  <Text style={{color: 'black', marginVertical: vs(5)}}>
                    유머
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </Pressable>
        </Modal>

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
        <ScrollView style={{borderWidth: ss(1), flex: 0.8}}>
          <Text>{content}</Text>
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
          />
        </View>
        {/* <View style={{flexDirection: 'row'}}>{HandleImage()}</View> */}
      </ScrollView>
    </View>
  );
}

export default Posting;
