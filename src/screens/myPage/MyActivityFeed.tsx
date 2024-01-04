import React from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {gray} from 'styles';
import {ss} from 'utils/scailing';

import NoPost from 'components/NoPost';
import Post from 'components/Post';
import {MainStackProps, MyPageStackProps} from 'navigations/types';
import useFetchMyActivity from 'hooks/useFetchMyActivity';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';

const MyActivityFeed: React.FC<MyPageStackProps> = ({route}) => {
  const {type} = route.params as {type: string};

  const boardCountDetails = useAppSelector(
    (state: RootState) => state.myActivityCountDetail,
  );

  const navigation = useNavigation<MainStackProps['navigation']>();

  const nextPostListLength = 10;

  const {onRefresh, fetchNextPostList, postList, isPostListExist, refreshing} =
    useFetchMyActivity(type);

  return (
    <View style={{flex: 1}}>
      {isPostListExist === true && (
        <FlatList
          data={postList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <View
                testID={'flatListItems'}
                key={index}
                style={styles.container}>
                <Post singleData={item} boardCountDetails={boardCountDetails} />
              </View>
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={() => fetchNextPostList(nextPostListLength)}
        />
      )}
      {/* fetchNextData하고 난 뒤에 게시글 없을 때만 보여줘야함. undefined일 때는 보여주면 안됨.*/}
      {isPostListExist === false && (
        <NoPost
          onPress={() =>
            navigation.navigate('BottomStack', {
              screen: 'Posting',
            })
          }
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

export default MyActivityFeed;
