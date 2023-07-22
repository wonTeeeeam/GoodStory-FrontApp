import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {AntDesign, Entypo} from 'utils/react-native-vector-helper';

import {hs, ss, vs} from 'utils/scailing';

function UTextInput({
  text,
  Icon,
  placeholder,
  value,
  setValue,
  maxLength,
  setNeedAlert,
  isPassword = false,
  validateValue,
  isNumeric = false,
}) {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [needSecure, setNeedSecure] = useState(isPassword ? true : false);
  const textInputRef = useRef();
  useEffect(() => {
    if (value.length > 0) {
      setIsIconVisible(true);
    } else {
      setIsIconVisible(false);
    }
  }, [value]);

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
          ref={textInputRef}
          style={{
            flex: 1,
            marginLeft: vs(5),
            borderLeftWidth: ss(1),
            height: hs(40),
            borderColor: '#B2B0B0',
            color: '#B2B0B0',
            paddingLeft: hs(10),
          }}
          keyboardType={isNumeric ? 'numeric' : 'default'}
          placeholder={placeholder}
          autoCapitalize={'none'}
          placeholderTextColor={'#B2B0B0'}
          value={value}
          onChangeText={setValue}
          secureTextEntry={needSecure ? true : false}
          maxLength={maxLength}
          onFocus={() => {
            value.length > 0 && setIsIconVisible(true);
            if (value.length > 0 && !validateValue(value)) {
              setNeedAlert(true);
            }
          }}
          onBlur={() => {
            setIsIconVisible(false);
            setNeedAlert(false);
          }}
        />
        {isIconVisible ? (
          <View style={{flexDirection: 'row'}}>
            {isPassword ? (
              <Pressable onPress={() => setNeedSecure(!needSecure)}>
                <Entypo
                  name={needSecure ? 'eye' : 'eye-with-line'}
                  size={ss(20)}
                  color={'#B2B0B0'}
                  style={{marginRight: hs(10)}}
                />
              </Pressable>
            ) : null}
            <Pressable onPress={() => setValue('')}>
              <AntDesign
                name="closecircle"
                size={ss(20)}
                color={'#B2B0B0'}
                style={{marginRight: hs(10)}}
              />
            </Pressable>
          </View>
        ) : undefined}
      </View>
    </View>
  );
}

export default UTextInput;
