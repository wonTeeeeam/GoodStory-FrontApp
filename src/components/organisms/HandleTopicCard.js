import React from 'react';
import {Text, View} from 'react-native';
import {ss, vs} from '../../utils/scailing';

function HandleTopicCard({color, text, children}) {
  return (
    <View
      style={{
        backgroundColor: color,
        flex: 0.48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ss(10),
      }}>
      {children}
      <View style={{marginTop: vs(20)}}>
        <Text style={{color: 'white'}}>{text}</Text>
      </View>
    </View>
  );
}

export default HandleTopicCard;
