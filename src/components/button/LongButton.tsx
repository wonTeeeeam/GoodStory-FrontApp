import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

type Props = {
  isAbled: boolean;
  handleOnPressBtn: () => Promise<void> | void;
  text?: string;
};

const LongButton: React.FC<Props> = ({
  isAbled,
  handleOnPressBtn,
  text = '다음',
}) => {
  return (
    <Pressable
      style={{
        ...styles.joinBtn,
        backgroundColor: isAbled ? '#029BFE' : '#B2B0B0',
      }}
      onPress={() => {
        isAbled && handleOnPressBtn();
      }}>
      <Text style={{fontSize: ss(17)}}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  joinBtn: {
    height: vs(50),
    marginTop: vs(30),
    marginHorizontal: hs(20),
    borderRadius: ss(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LongButton;
