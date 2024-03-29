import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ss, vs} from 'utils/scailing';

const ActivityFeedItem = ({
  title,
  value,
}: {
  title: string;
  value: number | undefined;
}) => {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={{color: '#FF6347', marginVertical: vs(10)}}>
          {value}개
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    marginTop: vs(10),
    fontWeight: 'bold',
    fontSize: ss(15),
  },
});

export default ActivityFeedItem;
