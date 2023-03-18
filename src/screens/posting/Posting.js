import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
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

function Posting() {
  const navigation = useNavigation();
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
    const result = await launchImageLibrary();
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

  return (
    <View style={{flex: 1, marginHorizontal: hs(20), marginTop: vs(10)}}>
      <View style={{alignItems: 'flex-end'}}>
        <Pressable onPress={() => {}} disabled={isDisabled}>
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
