import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackgroundColor} from 'styles/BackgroundColor';
import {hs, ss, vs} from 'utils/scailing';

export default function ReplyInput({imgURL}) {
  const [input, setInput] = useState('');
  return (
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
            {/* <Text style={{color: 'black'}}>ㅋㅋㅋㅋㅋㅋㅋ ㅈㄴ 병신같네</Text> */}
          </View>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Text style={{color: 'black'}}>{input.length}/300자</Text>
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
