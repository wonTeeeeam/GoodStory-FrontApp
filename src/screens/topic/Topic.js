import React from 'react';
import {Text, View} from 'react-native';
import {hs, ss, vs} from '../../utils/scailing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import HandleTopicCard from '../../components/organisms/HandleTopicCard';

function Topic() {
  return (
    <View style={{marginHorizontal: hs(20), flex: 1}}>
      <View style={{alignItems: 'center', marginTop: vs(20)}}>
        <Text style={{color: 'black', fontSize: ss(20)}}>주제별 게시판</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: vs(20)}}>
        <Text style={{color: 'black', fontSize: ss(15)}}>
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
          <HandleTopicCard color={'#d070fb'} text={'꿀팁'}>
            <Ionicons name="bulb" color={'white'} size={ss(30)} />
          </HandleTopicCard>
          <HandleTopicCard color={'#FFC0CB'} text={'뒷담'}>
            <FontAwesome name="wechat" color={'white'} size={ss(30)} />
          </HandleTopicCard>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.3,
          }}>
          <HandleTopicCard color={'#F0E68C'} text={'연봉'}>
            <FontAwesome name="money" color={'white'} size={ss(30)} />
          </HandleTopicCard>
          <HandleTopicCard color={'#00BFFF'} text={'이직'}>
            <MaterialCommunityIcons
              name="bag-suitcase"
              color={'white'}
              size={ss(30)}
            />
          </HandleTopicCard>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.3,
          }}>
          <HandleTopicCard color={'#ADFF2F'} text={'자유'}>
            <MaterialIcons name="flight" color={'white'} size={ss(30)} />
          </HandleTopicCard>
          <HandleTopicCard color={'#808000'} text={'유머'}>
            <Fontisto name="smiley" color={'white'} size={ss(30)} />
          </HandleTopicCard>
        </View>
      </View>
    </View>
  );
}

export default Topic;
