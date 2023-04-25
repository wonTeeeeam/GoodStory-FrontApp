import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {hs, ss, vs} from '../../utils/scailing';

function JoinTextInput({
  text,
  Icon,
  placeholder,
  value,
  setValue,
  destination,
  params,
}) {
  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal: hs(20)}}>
      <Text style={{color: 'black', marginTop: vs(30)}}>{text}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: vs(50),
          alignItems: 'center',
          backgroundColor: 'white',
          height: hs(50),
          borderRadius: ss(10),
          paddingLeft: hs(10),
        }}>
        {Icon}

        <TextInput
          style={{
            flex: 1,
            marginLeft: vs(5),
            borderLeftWidth: ss(1),
            height: hs(40),
            color: 'red',
          }}
          placeholder={placeholder}
          placeholderTextColor={'red'}
          value={value}
          onChangeText={setValue}
          secureTextEntry={placeholder === '비밀번호' ? true : false}
        />
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          height: vs(50),
          marginTop: vs(50),
          borderRadius: ss(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => navigation.navigate(destination, {...params})}>
          <Text style={{fontSize: ss(20)}}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default JoinTextInput;
