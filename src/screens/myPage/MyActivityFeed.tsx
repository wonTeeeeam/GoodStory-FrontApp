import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {gray} from 'styles';
import {ss} from 'utils/scailing';

import NoPost from 'components/NoPost';
import Post from 'components/Post';
import {PostListElement} from 'hooks/useFetchPostList';
import {MyPageStackProps} from 'navigations/types';
import useFetchMyActivity from 'hooks/useFetchMyActivity';

const MyActivityFeed: React.FC<MyPageStackProps> = ({route}) => {
  const {type} = route.params;
  const {onRefresh, fetchNextPostList, postList, isPostListExist, refreshing} =
    useFetchMyActivity(type);

  useEffect(() => {}, []);

  return (
    <View style={{flex: 1}}>
      {/* {isPostListExist === true && (
        <FlatList
          data={list}
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
          onEndReached={() => fetchNextPostList(nextPostListLength)}
        />
      )} */}
      {/* fetchNextData하고 난 뒤에 게시글 없을 때만 보여줘야함. undefined일 때는 보여주면 안됨.*/}
      {/* {isPostListExist === false && (
        <NoPost
          onPress={() => navigation.navigate('Posting')}
          btnText={'게시글 등록'}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: gray.lightGray,
    borderBottomWidth: ss(1),
  },
});

export default MyActivityFeed;
