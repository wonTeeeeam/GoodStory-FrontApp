import React from 'react';
import {View, StyleSheet} from 'react-native';
import {gray} from 'styles';
import {ss, hs, vs} from 'utils/scailing';
import Reply from './Reply';

export default function ReplyList({replyData, replyCnt = 0}) {
  return (
    <View style={styles.replyBox}>
      <View style={{marginHorizontal: hs(5)}}>
        {replyData.map((singleData, index) => {
          return (
            <View key={index} style={styles.flatList}>
              <View style={{paddingHorizontal: hs(10)}}>
                <Reply singleData={singleData} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  replyBox: {
    // backgroundColor: 'red',
    marginTop: vs(0),
  },
  replyIconContainer: {
    flexDirection: 'row',
    paddingVertical: vs(5),
  },
  replyList: {
    marginLeft: hs(5),
    color: '#4682B4',
  },
  flatList: {
    borderTopColor: gray.lightGray,
    borderTopWidth: ss(1),
    paddingVertical: vs(10),
  },
});
