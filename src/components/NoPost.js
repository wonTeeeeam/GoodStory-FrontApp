import React from 'react';
import {Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ss, vs} from 'utils/scailing';
import OvalButton from './OvalButton';
import {useNavigation} from '@react-navigation/native';

function NoPost() {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Posting');
  };
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
      <Text style={{color: '#B2B0B0', marginBottom: vs(10)}}>
        게시글을 등록해주세요!
      </Text>
      <OvalButton
        buttonColor={'#6495ED'}
        text={'게시글 등록'}
        textColor={'white'}
        onPressFunction={onPress}
      />
    </View>
  );
}

export default NoPost;
