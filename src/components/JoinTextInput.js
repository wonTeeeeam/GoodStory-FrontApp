import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

function JoinTextInput({text, Icon, placeholder, value, setValue}) {
  return (
    <View style={{marginHorizontal: hs(20)}}>
      <Text style={{color: 'black', marginTop: vs(30)}}>{text}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: vs(20),
          alignItems: 'center',
          backgroundColor: 'white',
          height: hs(50),
          borderRadius: ss(20),
          paddingLeft: vs(10),
        }}>
        {Icon}
        <TextInput
          style={{
            flex: 1,
            marginLeft: vs(5),
            borderLeftWidth: ss(1),
            height: hs(40),
            borderColor: '#B2B0B0',
            color: '#B2B0B0',
            paddingLeft: hs(10),
          }}
          placeholder={placeholder}
          placeholderTextColor={'#B2B0B0'}
          value={value}
          onChangeText={setValue}
          secureTextEntry={placeholder === '비밀번호' ? true : false}
        />
      </View>
    </View>
  );
}

export default JoinTextInput;
