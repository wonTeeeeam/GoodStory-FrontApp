import NoPost from 'components/NoPost';
import AnnouncementItem from 'components/myPage/AnnouncementItem';
import useFetchDataList from 'hooks/useFetchDataList';
import React, {useState} from 'react';
import {FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';

function Announcement() {
  // const {onRefresh, fetchNextData, listData, isListDataExist, refreshing} =
  //   useFetchDataList({url: '/board/getAll'});

  const listData = [
    {
      title: '문의 연락처입니다.',
      body: '여기로 연락 부탁드립니다.\ngoodStoryCert@gmail.com',
      createdDate: '2023-06-25',
    },
  ];
  return (
    <View style={{flex: 1}}>
      {/* 2차 개발 */}
      {/* <NoPost /> */}
      <FlatList
        data={listData}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={{}}>
              <AnnouncementItem singleData={item} />
            </View>
          );
        }}
      />
      {/* {isListDataExist === true ? (
        <FlatList
          data={listData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.container}>
                <Text></Text>
                <Post singleData={item} navigation={navigation} />
              </View>
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={fetchNextData}
        />
      ) : null} */}
      {/* fetchNextData하고 난 뒤에 게시글 없을 때만 보여줘야함. undefined일 때는 보여주면 안됨.*/}
      {/* {isListDataExist === false ? <NoPost /> : null} */}
    </View>
  );
}

export default Announcement;
