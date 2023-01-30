import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {TextColor} from '../../styles/TextColor';
import {convertTimeToStandardFormat} from '../../utils/timeConverter';

export default function DetailPost({route}) {
  const {postData} = route.params;

  return (
    <View style={styles.totalContainer}>
      <View style={styles.userContainer}>
        <Text style={styles.user}>{postData.user.NickName}</Text>
        <Text style={styles.user}>총 좋아요 개수</Text>
      </View>
      <View>
        <Text style={styles.user}>
          {convertTimeToStandardFormat(postData.Created_date)}
        </Text>
        <Text style={styles.user}>{postData.Title}</Text>
        <Text style={styles.user}>{postData.Content}</Text>
      </View>
      <View>
        <AntDesignIcon name="heart" color={TextColor.red} />
        <Text style={styles.user}>추천</Text>
        <Text style={styles.user}>{postData.Like}</Text>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  totalContainer: {margin: 50},
  userContainer: {marginBottom: 50},
  user: {
    color: TextColor.black,
  },
});
