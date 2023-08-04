import React from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import Post from './Post';
import {gray} from 'styles';
import {ss} from 'utils/scailing';
import NoPost from './NoPost';
import useFetchDataList from 'hooks/useFetchDataList';
import {useNavigation} from '@react-navigation/native';

export type Props = {
  filterValue: string;
  topic: string;
};

export type ListData = {
  BoardId: string;
  Category: string;
  Created_date: string;
  Updated_date: string;
  Title: string;
  Content: string;
  Like: number;
  Views: number;
  ReplyCount: number;
  user: {
    UserId: string;
    Nickname: string;
    Role: string;
    CompanyCode: string;
    CompanyName: string;
    Created_date: string;
    Updated_date: string;
    Deleted_date: null;
    ProfilePhoto: string;
  };
  BoardPhotos: [
    {
      BoardPhotoID: string;
      URL: string;
      Created_date: string;
    },
  ];
};

const PostList: React.FC<Props> = ({filterValue, topic}) => {
  const {onRefresh, fetchNextData, listData, isListDataExist, refreshing} =
    useFetchDataList({url: '/board/getAll', topic: topic});

  const navigation = useNavigation();

  const changeOrder = (currentListData: ListData[]) => {
    if (filterValue === '최신순') {
      currentListData.sort((firstValue, secondValue) => {
        //내림차순
        return (
          new Date(secondValue.Created_date).getTime() -
          new Date(firstValue.Created_date).getTime()
        );
      });
    } else if (filterValue === '추천순') {
      currentListData.sort((firstValue, secondValue) => {
        return secondValue.Like - firstValue.Like;
      });
    }
    return currentListData;
  };

  return (
    <View style={{flex: 1}}>
      {isListDataExist === true && (
        <FlatList
          data={changeOrder(listData)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <View
                testID={'flatListItems'}
                key={index}
                style={styles.container}>
                <Post singleData={item} />
              </View>
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={fetchNextData}
        />
      )}
      {/* fetchNextData하고 난 뒤에 게시글 없을 때만 보여줘야함. undefined일 때는 보여주면 안됨.*/}
      {isListDataExist === false && (
        <NoPost
          onPress={() => navigation.navigate('Posting')}
          btnText={'게시글 등록'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: gray.lightGray,
    borderBottomWidth: ss(1),
  },
});

export default PostList;
