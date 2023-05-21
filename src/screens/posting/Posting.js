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
import {changeTopicToKorean} from 'utils/translation';
import TypeModal from 'components/TypeModal';
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
  const imageFlags = useMemo(
    () =>
      new RegExp(
        /image:\/\/0\/|image:\/\/1\/|image:\/\/2\/|image:\/\/3\/|image:\/\/4\//,
        'g',
      ),
    [],
  );
  const navigation = useNavigation();
  const [category, setCategory] = useState(categories[1]);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState();
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [imagePlace, setImagePlace] = useState(0);

  useEffect(() => {
    if (title.length > 0 && content.length > 0) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [title, content]);

  // useEffect(() => {
  //   if (content.search(imageFlags) !== -1) {
  //     setPreview(InsertImageInContent(content));
  //   }
  // }, [content, InsertImageInContent, imageFlags]);

  const handleChoosePhoto = async () => {
    if (image.length >= 5) {
      // 이미지는 5개 이상 업로드할 수 없습니다 경고하기.
      return;
    }
    // 차후에 이미지 한번에 여러개 업로드 하는 방법 찾아보기.
    const result = await launchImageLibrary({includeBase64: true});
    if (result.didCancel) {
      return;
    }
    setImage([...image, result.assets[0]]);
    // setContent(`${content}${(<Image source={{uri: result.assets[0]}} />)}`);
    setContent(content + `\nimage://${imagePlace}/`);
    setImagePlace(imagePlace + 1);
  };

  const InsertImageInContent = useCallback(() => {
    const tempArray = content.slice();
    const arrayOfTemp = tempArray.split(imageFlags);
    const Result = [];
    let keyIndex = 0;
    for (let i = 0; i < arrayOfTemp.length; i++) {
      if (arrayOfTemp[i] !== '') {
        Result.push(<Text key={keyIndex}>{`${arrayOfTemp[i]}\n`}</Text>);
        keyIndex += 1;
      }
      if (i !== arrayOfTemp.length - 1) {
        if (image[i]) {
          Result.push(
            <FastImage
              key={keyIndex}
              style={{height: vs(75), width: hs(75)}}
              source={{uri: image[i].uri}}
            />,
          );
        } else {
          Result.push(
            <MaterialIcons
              key={keyIndex}
              name="image-not-supported"
              color={'#4682B4'}
              size={ss(30)}
            />,
          );
        }
      }
      keyIndex += 1;
    }
    return Result;
  }, [content, image, imageFlags]);

  const removeImageFromContent = index => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage([...newImages]);
    if (!image[index + 1]) {
      setContent(content.replace(`\nimage://${index}/`, ''));
    }
    // 해당 인덱스를 기준으로 content뒤에 다른 인덱스가 있다면 하나씩 땡겨줘야함.
    else {
      let newContent = content.replace(`\nimage://${index}/`, '');
      for (let i = index + 1; i < image.length; i++) {
        newContent = newContent.replace(
          `\nimage://${i}/`,
          `\nimage://${i - 1}/`,
        );
      }
    }
    setImagePlace(imagePlace - 1);
  };

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

  return (
    <View style={{flex: 1, marginHorizontal: hs(20), marginTop: vs(10)}}>
      <View
        style={{
          alignItems: 'flex-end',
          flex: 0.3,
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => {
            if (!isDisabled) {
              postBoard();
            }
          }}
          disabled={false}>
          <Text
            style={{color: isDisabled ? 'gray' : 'black', fontSize: ss(15)}}>
            등록
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 0.9}}>
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
              {topic ? changeTopicToKorean(topic) : '등록위치 선택'}
            </Text>
            <AntDesign name="caretdown" color={'blue'} size={ss(10)} />
          </View>
        </Pressable>

        <TypeModal
          isVisible={isDropDown}
          handleSetIsVisible={setIsDropDown}
          handleSetTopic={setTopic}
        />

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
    </View>
  );
}

export default Posting;
