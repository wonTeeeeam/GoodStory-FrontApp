import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

function JoinButton({destination, params}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#029BFE',
        height: vs(50),
        marginTop: vs(50),
        marginHorizontal: hs(20),
        borderRadius: ss(20),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable onPress={() => navigation.navigate(destination, {...params})}>
        <Text style={{fontSize: ss(20)}}>다음</Text>
      </Pressable>
    </View>
  );
}

export default JoinButton;