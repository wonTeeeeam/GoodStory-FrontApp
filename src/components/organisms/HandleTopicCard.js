import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {ss, vs} from '../../utils/scailing';
import {useNavigation} from '@react-navigation/native';

function HandleTopicCard({color, text, children}) {
  const navigation = useNavigation();
  const makeTopicEnglish = () => {
    if (text === '꿀팁') return 'Tip';
    else if (text === '뒷담') return 'Backbiting';
    else if (text === '연봉') return 'Salary';
    else if (text === '이직') return 'Turnover';
    else if (text === '자유') return 'Free';
    else if (text === '유머') return 'Humor';
  };
  return (
    <Pressable
      style={{
        backgroundColor: color,
        flex: 0.48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ss(10),
      }}
      onPress={() => {
        const boardTopic = makeTopicEnglish();
        navigation.reset({
          routes: [{name: 'BoardStack', params: {boardTopic}}],
        });
      }}>
      {children}
      <View style={{marginTop: vs(20)}}>
        <Text style={{color: 'white'}}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default HandleTopicCard;
