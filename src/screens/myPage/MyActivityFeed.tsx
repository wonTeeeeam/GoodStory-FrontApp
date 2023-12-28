import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {black, gray} from 'styles';
import {hs, ss, vs} from 'utils/scailing';

import NoPost from 'components/NoPost';
import Post from 'components/Post';
import {MainStackProps, MyPageStackProps} from 'navigations/types';
import useFetchMyActivity from 'hooks/useFetchMyActivity';
import {useNavigation} from '@react-navigation/native';
import {AntDesign, Octicons} from 'utils/react-native-vector-helper';
import useDelete from 'hooks/useDelete';
import {PostListElement} from 'hooks/useFetchPostList';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';

const MyActivityFeed: React.FC<MyPageStackProps> = ({route}) => {
  const {type} = route.params as {type: string};
  const {userId} = useAppSelector((state: RootState) => state.user);

  const navigation = useNavigation<MainStackProps['navigation']>();

  const nextPostListLength = 10;

  const {onRefresh, fetchNextPostList, postList, isPostListExist, refreshing} =
    useFetchMyActivity(type);

  const {deleteBoard, deleteReply} = useDelete();

  const handleOnPressDelete = (item: PostListElement) => {
    console.log(item);
    switch (type) {
      case '게시글':
        deleteBoard({UserId: userId}, item.BoardId);
        break;
      case '댓글':
        deleteReply(item.BoardId);
    }
  };

  useEffect(() => {}, []);

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
                <Post singleData={item} />
                <TouchableOpacity
                  style={{position: 'absolute', right: hs(50), top: vs(15)}}>
                  <Octicons name="pencil" color={black.origin} size={ss(18)} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleOnPressDelete(item);
                  }}
                  style={{position: 'absolute', right: hs(15), top: vs(15)}}>
                  <AntDesign name="delete" color={black.origin} size={ss(18)} />
                </TouchableOpacity>
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
            navigation.navigate('BottomStack', {screen: 'Posting'})
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
