import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackgroundColor} from 'styles/BackgroundColor';
import {hs, ss, vs} from 'utils/scailing';
import OvalButton from './OvalButton';
import axios from 'axios';
import {useSelector} from 'react-redux';

export default function ReplyInput({imgURL, inputImage, singleData}) {
  const [input, setInput] = useState('');
  const {userId} = useSelector(state => state.user);

  const makeFormData = () => {
    const formData = new FormData();
    formData.append('Content', input);
    formData.append('user[UserId]', userId);
    formData.append('board[BoardId]', singleData.BoardId);

    inputImage &&
      formData.append('file', {
        name: inputImage.fileName,
        type: inputImage.type,
        uri:
          Platform.OS === 'ios'
            ? inputImage.uri.replace('file://', '')
            : inputImage.uri,
      });

    return formData;
  };

  const registerReply = async () => {
    const formData = makeFormData();
    try {
      const result = await axios.post('/reply/create', formData, {
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
    <View>
      <View style={styles.replyInputBox}>
        <View style={{marginHorizontal: hs(5)}}>
          <View style={styles.replyInputIcon}>
            <MaterialCommunityIcons
              name="message-reply-text-outline"
              color={'#4682B4'}
              size={20}
            />
            <View style={{marginLeft: hs(5)}}>
              <Text style={styles.replyInputText}>댓글쓰기</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: vs(10),
              flexDirection: 'row',
              flex: 1,
            }}>
            {imgURL ? (
              <FastImage
                style={{
                  height: vs(20),
                  width: hs(20),
                  borderRadius: ss(30),
                  borderColor: '#D3D3D3',
                  borderWidth: ss(1),
                }}
                source={{uri: imgURL}}
                resizeMode="contain"
              />
            ) : (
              <Ionicons
                name="person-outline"
                color={'white'}
                size={ss(20)}
                style={{
                  backgroundColor: '#D3D3D3',
                  // width: '100%',
                  alignItems: 'center',
                  height: vs(20),
                  width: hs(20),
                  borderRadius: ss(100),
                }}
              />
            )}

            <View
              style={{
                marginLeft: hs(10),
                flex: 1,
              }}>
              <TextInput
                style={{
                  color: 'black',
                  padding: 0,
                  // backgroundColor: 'red',
                }}
                // autoFocus={true}
                placeholder={'댓글을 남겨주세요'}
                placeholderTextColor={'gray'}
                maxLength={300}
                multiline={true}
                onChangeText={setInput}
                value={input}
                textAlign={'left'}
              />
            </View>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={{color: 'black'}}>{input.length}/300자</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'flex-end',
        }}>
        <View style={{marginBottom: vs(20)}}>
          <OvalButton
            buttonColor={'#6495ED'}
            text={'댓글등록'}
            textColor={'white'}
            onPressFunction={registerReply}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  replyInputBox: {
    marginTop: 5,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  replyInputText: {
    color: '#4682B4',
  },
  replyInputIcon: {
    flexDirection: 'row',
    paddingVertical: vs(5),
    borderBottomColor: BackgroundColor.lightGray,
    borderBottomWidth: ss(3),
  },
});
