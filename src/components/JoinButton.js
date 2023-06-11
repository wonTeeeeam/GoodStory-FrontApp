import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

function JoinButton({isAbled, onPress}) {
  return (
    <Pressable
      style={{
        backgroundColor: isAbled ? '#029BFE' : '#B2B0B0',
        height: vs(50),
        marginTop: vs(30),
        marginHorizontal: hs(20),
        borderRadius: ss(20),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={isAbled ? onPress : null}>
      <Text style={{fontSize: ss(17)}}>다음</Text>
    </Pressable>
  );
}

export default JoinButton;
