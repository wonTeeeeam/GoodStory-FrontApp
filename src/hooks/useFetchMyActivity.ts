import {
  requestMyBoards,
  requestMyLikeBoards,
  requestMyReplies,
} from 'api/myPage/myActivityFeed';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {myPageAddBoardCount} from 'slice/myActivityCountDetailSlice';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {alert} from 'utils/alert';

export type PostListElement = {
  BoardId: string;
  Category: string;
  Created_date: string;
  Updated_date: string;
  Title: string;
  Content: string;
  Like: number;
  Views: number;
  ReplyCount: number;
  user: User;
  BoardPhotos: PostPhoto[];
};

export type User = {
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

export type PostPhoto = {
  BoardPhotoID: string;
  URL: string;
  Created_date: string;
};

const useFetchMyActivity = (type: string) => {
  const [skip, setSkip] = useState(0);
  const [postList, setPostList] = useState<any[]>([]);
  const [isPostListExist, setIsPostListExist] = useState<boolean>();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const {userId} = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    postList.length === 0
      ? setIsPostListExist(false)
      : setIsPostListExist(true);
  }, [postList]);

  const deletePost = (boardId: string) => {
    const newPostList = postList.filter(post => post.BoardId !== boardId);
    setPostList(newPostList);
  };

  const updatePostList = (nextPostList: PostListElement[]) => {
    const postListUpdated: PostListElement[] = [];
    const nextPostListCopyed: PostListElement[] = JSON.parse(
      JSON.stringify(nextPostList),
    );
    postList.forEach(oldPost => {
      const index = nextPostListCopyed.findIndex(
        newPost => newPost.BoardId === oldPost.BoardId,
      );

      //게시글이 존재하면
      if (index !== -1) {
        postListUpdated.push(nextPostListCopyed[index]);
        nextPostListCopyed.splice(index, 1);
      } else {
        postListUpdated.push(oldPost);
      }
    });
    nextPostListCopyed.forEach(remainedPost =>
      postListUpdated.push(remainedPost),
    );
    return postListUpdated;
  };

  const fetchNextPostList = async (
    numberOfNextPostList: number,
    isRefreshing?: boolean,
  ) => {
    try {
      let nextPostList;
      switch (type) {
        case '좋아요':
          nextPostList = await requestMyLikeBoards(
            userId,
            numberOfNextPostList,
            isRefreshing ? 0 : skip,
          );
          break;
        case '게시글':
          nextPostList = await requestMyBoards(
            userId,
            numberOfNextPostList,
            isRefreshing ? 0 : skip,
          );
          break;
        case '댓글':
          nextPostList = await requestMyReplies(
            userId,
            numberOfNextPostList,
            isRefreshing ? 0 : skip,
          );
          break;
      }

      const newUpdatePostList = updatePostList(nextPostList);
      setPostList(newUpdatePostList);
      // console.log(newUpdatePostList);
      dispatch(myPageAddBoardCount(newUpdatePostList));
      // // 지금 가지고 있는 게시글 이후부터 가져오기 위한 skip
      setSkip(newUpdatePostList.length);

      postList.length === 0 && nextPostList.length === 0
        ? setIsPostListExist(false)
        : setIsPostListExist(true);
    } catch (e) {
      setIsPostListExist(false);
      alert({
        title: '게시글 불러오기 실패',
        body: `게시글을 불러오는 데 실패하였습니다.\n${e}`,
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setSkip(0);
    await fetchNextPostList(postList.length > 0 ? postList.length : 10, true);
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    onRefresh,
    fetchNextPostList,
    postList,
    isPostListExist,
    refreshing,
    deletePost,
  };
};
export default useFetchMyActivity;
