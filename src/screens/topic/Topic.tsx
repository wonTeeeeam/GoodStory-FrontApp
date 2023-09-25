import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

import HandleTopicCard from 'components/HandleTopicCard';
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from 'utils/react-native-vector-helper';
import {black, gray, white} from 'styles';

const Topic = () => {
  return (
    <View style={{marginHorizontal: hs(20), flex: 1}}>
      <View style={{alignItems: 'center', marginTop: vs(20)}}>
        <Text style={{color: 'black', fontSize: ss(20)}}>주제별 게시판</Text>
      </View>

      <View style={styles.allCardContainer}>
        <View style={styles.cardRowContainer}>
          <HandleTopicCard text={'꿀팁'}>
            <Ionicons name="bulb" color={white.snow} size={ss(30)} />
          </HandleTopicCard>
          <HandleTopicCard text={'뒷담'}>
            <FontAwesome name="wechat" color={white.snow} size={ss(30)} />
          </HandleTopicCard>
        </View>
        <View style={styles.cardRowContainer}>
          <HandleTopicCard text={'연봉'}>
            <FontAwesome name="money" color={white.snow} size={ss(30)} />
          </HandleTopicCard>
          <HandleTopicCard text={'이직'}>
            <MaterialCommunityIcons
              name="bag-suitcase"
              color={white.snow}
              size={ss(30)}
            />
          </HandleTopicCard>
        </View>
        <View style={styles.cardRowContainer}>
          <HandleTopicCard text={'자유'}>
            <MaterialIcons name="flight" color={white.snow} size={ss(30)} />
          </HandleTopicCard>
          <HandleTopicCard text={'유머'}>
            <Fontisto name="smiley" color={white.snow} size={ss(30)} />
          </HandleTopicCard>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allCardContainer: {
    justifyContent: 'space-evenly',
    flex: 0.95,
    marginTop: vs(20),
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.3,
  },
});

export default Topic;
