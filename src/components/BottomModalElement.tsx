import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {black} from 'styles';
import {ss} from 'utils/scailing';

type props = {
  onPress?: () => void;
  text: string;
};

const BottomModalElement: React.FC<props> = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{color: black.origin, margin: ss(10)}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BottomModalElement;
