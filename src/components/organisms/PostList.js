import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import Post from '../molecules/Post';

import {BackgroundColor} from '../../styles/BackgroundColor';
import {ss} from '../../utils/scailing';
import axios from 'axios';

export default function PostList({filterValue, navigation}) {
  const [skip, setSkip] = useState(0);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchNextData();
  }, [fetchNextData]);

  useEffect(() => {
    if (filterValue === '최신순') {
      listData.sort((firstValue, secondValue) => {
        return secondValue.Board_Created_date - firstValue.Board_Created_date;
      });
    } else if (filterValue === '추천순') {
      listData.sort((firstValue, secondValue) => {
        return secondValue.Board_Like - firstValue.Board_Like;
      });
    }
  }, [filterValue, listData]);

  const fetchNextData = useCallback(async () => {
    const top = 5;
    const BoardTopic = [
      'Tip',
      'Backbiting',
      'Salary',
      'Turnover',
      'Free',
      'Humor',
    ];
    try {
      const nextData = await axios.get('http://3.35.111.44:3001/board/getAll', {
        params: {top: top, skip: skip, Category: BoardTopic[4]},
      });
      setSkip(skip + 5);
      setListData([...listData, ...nextData.data]);
    } catch (e) {
      console.log(e);
    }
  }, [skip, listData]);

  return (
    <View>
      <FlatList
        data={listData}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.container}>
              <Post singleData={item} navigation={navigation} />
            </View>
          );
        }}
        onEndReachedThreshold={0.1}
        onEndReached={fetchNextData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: BackgroundColor.lightGray,
    borderBottomWidth: ss(3),
  },
});
