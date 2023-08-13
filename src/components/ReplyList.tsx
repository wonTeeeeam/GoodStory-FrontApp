import React from 'react';
import {View, StyleSheet} from 'react-native';
import {gray} from 'styles';
import {ss, hs, vs} from 'utils/scailing';
import Reply from './Reply';
import {ReplyDatum} from 'screens/main/DetailPost';

type Props = {
  replyData: ReplyDatum[];
};

const ReplyList: React.FC<Props> = ({replyData}) => {
  return (
    <View style={styles.replyBox}>
      <View style={{marginHorizontal: hs(5)}}>
        {replyData.map((singleData, index) => {
          return (
            <View key={index} style={styles.Replycontainer}>
              <View style={{paddingHorizontal: hs(10)}}>
                <Reply singleData={singleData} />
              </View>
            </View>
          );
        })}
        <View style={{borderTopColor: gray.lightGray, borderTopWidth: ss(1)}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  replyBox: {
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
  Replycontainer: {
    borderTopColor: gray.lightGray,
    borderTopWidth: ss(1),
    paddingTop: vs(5),
    paddingBottom: vs(8),
  },
});

export default ReplyList;
