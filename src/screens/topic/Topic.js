import React from 'react';
import {Text, View} from 'react-native';
import {hs, ss, vs} from '../../utils/scailing';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Topic() {
  function HandleTopicCard(color, text) {
    return (
      <View
        style={{
          backgroundColor: color,
          flex: 0.48,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: ss(10),
        }}>
        <Ionicons name="bulb" color={'white'} size={ss(30)} />
        <View style={{marginTop: vs(20)}}>
          <Text style={{color: 'white'}}>꿀팁</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{marginHorizontal: hs(20), flex: 1}}>
      <View style={{alignItems: 'center', marginTop: vs(20)}}>
        <Text style={{color: 'black'}}>주제별 게시판</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: vs(20)}}>
        <Text style={{color: 'black'}}>
          이 회사가 좋소라고 생각한 가장 큰 이유
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-evenly',
          flex: 0.8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.3,
          }}>
          {HandleTopicCard('#d070fb', '꿀팁')}
          <View
            style={{
              backgroundColor: 'pink',
              flex: 0.48,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: ss(10),
            }}>
            <Ionicons name="bulb" color={'white'} size={ss(30)} />
            <View style={{marginTop: vs(20)}}>
              <Text style={{color: 'white'}}>꿀팁</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.3,
          }}>
          <View style={{backgroundColor: 'yellow'}}>
            <Ionicons name="bulb" color={'#4682B4'} size={ss(30)} />
            <Text style={{color: 'black'}}>꿀팁</Text>
          </View>
          <View style={{backgroundColor: 'pink'}}>
            <Ionicons name="bulb" color={'#4682B4'} size={ss(30)} />
            <Text style={{color: 'black'}}>꿀팁</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.3,
          }}>
          <View style={{backgroundColor: 'purple'}}>
            <Ionicons name="bulb" color={'#4682B4'} size={ss(30)} />
            <Text style={{color: 'black'}}>꿀팁</Text>
          </View>
          <View style={{backgroundColor: 'pink'}}>
            <Ionicons name="bulb" color={'#4682B4'} size={ss(30)} />
            <Text style={{color: 'black'}}>꿀팁</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Topic;
