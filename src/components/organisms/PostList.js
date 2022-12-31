import React from 'react';
import {View, StyleSheet} from 'react-native';

import Post from '../molecules/Post';

import {BackgroundColor} from '../../styles/BackgroundColor';
import {moderateScale} from '../../utils/Scaling';

export default function PostList({listData, filterValue}) {
  const MakePostList = () => {
    const newListData = [...listData];
    if (filterValue === '최신순') {
      newListData.sort((firstValue, secondValue) => {
        return secondValue.Created_date - firstValue.Created_date;
      });
    } else if (filterValue === '추천순') {
      newListData.sort((firstValue, secondValue) => {
        return secondValue.Like - firstValue.Like;
      });
    }
    return newListData.map((singleData, index) => {
      return (
        <View key={index} style={styles.container}>
          <Post singleData={singleData} />
        </View>
      );
    });
  };
  return <View>{MakePostList()}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: BackgroundColor.lightGray,
    borderBottomWidth: moderateScale(3),
  },
});
