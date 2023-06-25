import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text, RefreshControl} from 'react-native';
import Post from './Post';
import {BackgroundColor} from 'styles/BackgroundColor';
import {ss} from 'utils/scailing';
import NoPost from './NoPost';
import useFetchDataList from 'hooks/useFetchDataList';
import {useNavigation} from '@react-navigation/native';

export default function PostList({filterValue, topic}) {
  const {onRefresh, fetchNextData, listData, isListDataExist, refreshing} =
    useFetchDataList({url: '/board/getAll', topic: topic});

  const navigation = useNavigation();

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

  return (
    <View style={{flex: 1}}>
      {isListDataExist === true ? (
        <FlatList
          data={listData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.container}>
                <Post singleData={item} />
              </View>
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={fetchNextData}
        />
      ) : null}
      {/* fetchNextData하고 난 뒤에 게시글 없을 때만 보여줘야함. undefined일 때는 보여주면 안됨.*/}
      {isListDataExist === false ? (
        <NoPost
          onPress={() => navigation.navigate('Posting')}
          btnText={'게시글 등록'}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: BackgroundColor.lightGray,
    borderBottomWidth: ss(3),
  },
});
