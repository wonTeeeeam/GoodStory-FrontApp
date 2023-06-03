import React from 'react';
import {Pressable, Text} from 'react-native';
import {ss} from 'utils/scailing';

function BottomModalElement({onPress, text}) {
  return (
    <Pressable onPress={onPress}>
      <Text style={{color: 'black', margin: ss(10)}}>{text}</Text>
    </Pressable>
  );
}

export default BottomModalElement;
