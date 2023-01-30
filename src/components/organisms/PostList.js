import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import Post from '../molecules/Post';

import {BackgroundColor} from '../../styles/BackgroundColor';
import {moderateScale} from '../../utils/scailing';
import axios from 'axios';

export default function PostList({filterValue, navigation}) {
  const mockDatas = useMemo(() => {
    return [
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
  }, []);

  useEffect(() => {
    fetchNextData();
  }, []);

  useEffect(() => {
    if (filterValue === '최신순') {
      mockDatas.sort((firstValue, secondValue) => {
        return secondValue.Created_date - firstValue.Created_date;
      });
    } else if (filterValue === '추천순') {
      mockDatas.sort((firstValue, secondValue) => {
        return secondValue.Like - firstValue.Like;
      });
    }
  }, [filterValue, mockDatas]);

  const fetchNextData = async () => {
    try {
      // const result = await axios.get(
      //   'http://3.35.111.44:3001/board/getAll?top=2&skip=0&category=Life',
      // );
      // alert('gi!');
    } catch (e) {}
  };
  return (
    <View>
      <FlatList
        data={mockDatas}
        renderItem={(singleData, index) => {
          return (
            <View key={index} style={styles.container}>
              <Post singleData={singleData} navigation={navigation} />
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
    borderBottomWidth: moderateScale(3),
  },
});
