import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackgroundColor} from '../styles/BackgroundColor';
import {ss, hs, vs} from '../utils/scailing';
import Reply from './Reply';

export default function ReplyList({replyData}) {
  const mockDatas = [
    {
      replyTitle: '안녕',
    },
  ];
  return (
    <View style={styles.replyBox}>
      <View style={{marginHorizontal: hs(5)}}>
        <View style={styles.replyIconContainer}>
          <MaterialCommunityIcons
            name="message-reply-text-outline"
            color={'#4682B4'}
            size={20}
          />
          <Text style={styles.replyList}>댓글목록</Text>
        </View>
        {replyData.map((singleData, index) => {
          return (
            <View key={index} style={styles.flatList}>
              <Reply singleData={singleData} />
              {index === replyData.length - 1 ? undefined : (
                <View
                  style={{
                    backgroundColor: '#C0C0C0',
                    alignSelf: 'stretch',
                    height: vs(1),
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  replyBox: {
    marginTop: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  replyIconContainer: {
    flexDirection: 'row',
  },
  replyList: {
    marginLeft: hs(5),
    color: '#4682B4',
  },
  flatList: {
    borderTopColor: BackgroundColor.lightGray,
    borderTopWidth: ss(3),
  },
});
