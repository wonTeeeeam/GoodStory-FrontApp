import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';

import FilterBar from '../../components/molecules/FilterBar';
import PostList from '../../components/organisms/PostList';

import {BackgroundColor} from '../../styles/BackgroundColor';

export default function Board() {
  const navigation = useNavigation();
  const [filterValue, setFilterValue] = useState('최신순');

  const mockDatas = [
    {
      BoardId: 10,
      Category: 'Life',
      Created_date: new Date('2022-12-30T11:54:44.827Z'),
      Title: '원재 사랑한다1',
      Content: '원재 좋다1.',
      Like: 5,
      Views: 0,
      ReplyCount: 0,
      PhotoURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWX',
      user: {
        UserId: '0c9b9956-6ec9-437c-afc4-e98cbcead68b',
        Nickname: '한원석',
        CompanyCode: 'ZH001000',
        CompanyName: '진학사',
        Created_date: new Date('2022-12-30T11:53:13.002Z'),
      },
    },
    {
      BoardId: 11,
      Category: 'Life',
      Created_date: new Date('2022-12-30T12:19:06.636Z'),
      Title: '원재 사랑한다2',
      Content: '원재 좋다2.',
      Like: 0,
      Views: 0,
      ReplyCount: 0,
      PhotoURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWX',
      user: {
        UserId: '0c9b9956-6ec9-437c-afc4-e98cbcead68b',
        Nickname: '한원석',
        CompanyCode: 'ZH001000',
        CompanyName: '진학사',
        Created_date: new Date('2022-12-30T11:53:13.002Z'),
      },
    },
  ];

  const changeFilterValue = newFilterValue => {
    setFilterValue(newFilterValue);
  };

  // 마운트시 바로 데이터 받아오기. useEffect(() => {});
  return (
    <View style={styles.allContainer}>
      <View style={styles.filterBar}>
        <FilterBar
          filterValue={filterValue}
          changeFilterValue={changeFilterValue}
        />
      </View>
      <View style={styles.postList}>
        <PostList listData={mockDatas} filterValue={filterValue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
  },
  filterBar: {
    flex: 0.04,
    backgroundColor: BackgroundColor.lightGray,
    justifyContent: 'center',
  },
  postList: {
    flex: 0.96,
    backgroundColor: BackgroundColor.snow,
  },
});
