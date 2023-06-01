import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text, RefreshControl} from 'react-native';

import Post from './Post';

import {BackgroundColor} from 'styles/BackgroundColor';
import {ss, vs} from 'utils/scailing';
import axios from 'axios';

export default function PostList({filterValue, navigation, topic}) {
  const [skip, setSkip] = useState(0);
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSkip(0);
    await fetchNextData();
    setRefreshing(false);
  }, [fetchNextData]);

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

    try {
      const nextData = await axios.get('/board/getAll', {
        params: {
          top: top,
          skip: skip,
          Category: topic,
        },
      });
      setSkip(skip + 5);
      skip === 0
        ? setListData([...nextData.data])
        : setListData([...listData, ...nextData.data]);
    } catch (e) {
      console.log(e);
    }
  }, [skip, listData, topic]);

  return (
    <View>
      <FlatList
        data={listData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
