import React from 'react';
import {Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ss, vs} from 'utils/scailing';
import OvalButton from './OvalButton';
import {white} from 'styles';

function NoPost({onPress = null, btnText = null}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Entypo name={'emoji-sad'} size={ss(50)} color={'#B2B0B0'} style={{}} />
      <Text style={{color: '#B2B0B0', marginTop: vs(10)}}>
        게시글이 존재하지 않습니다.
      </Text>
      {onPress && btnText ? (
        <Text style={{color: '#B2B0B0', marginBottom: vs(10)}}>
          게시글을 등록해주세요!
        </Text>
      ) : null}
      {onPress && btnText ? (
        <OvalButton
          buttonColor={'#6495ED'}
          text={btnText}
          textColor={white.origin}
          onPressFunction={onPress}
        />
      ) : null}
    </View>
  );
}

export default NoPost;
