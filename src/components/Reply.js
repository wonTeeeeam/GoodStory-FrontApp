import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {hs, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';

export default function Reply({singleData}) {
  return (
    <View style={{marginTop: vs(5)}}>
      <View style={styles.replyNickName}>
        <Text style={{color: 'black'}}>사진</Text>
        <View style={{marginLeft: hs(10), flexDirection: 'row'}}>
          <Text style={styles.user}>{singleData.user.Nickname}</Text>
          <View style={styles.replyDate}>
            <Text style={styles.user}>
              {convertTimeToKorean(singleData.Created_date)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: vs(10), marginLeft: hs(35)}}>
        <Text style={styles.user}>{singleData.Content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  replyNickName: {flexDirection: 'row'},
  replyDate: {marginLeft: 20},
  user: {color: 'black'},
});
