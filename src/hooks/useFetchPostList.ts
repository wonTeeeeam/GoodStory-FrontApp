import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addBoardCount} from 'slice/boardCountDetailSlice';
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

type Props = {
  topic: string;
};

const useFetchPostList = ({topic}: Props) => {
  const [skip, setSkip] = useState(0);
  const [postList, setPostList] = useState<PostListElement[]>([]);
  const [isPostListExist, setIsPostListExist] = useState<boolean>();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const deletePost = (boardId: string) => {
    setPostList(postList.filter(post => post.BoardId !== boardId));
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

      //게시글이 존재하면(기존에 존재하는 게시글인데 가져온 경우)
      if (index !== -1) {
        postListUpdated.push(nextPostListCopyed[index]);
        nextPostListCopyed.splice(index, 1);
      }
      // 게시글이 존재하지 않을때(기존에는 존재하는데 새로운 게시글 목록에는 없는 경우.)
      else {
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
      const nextPostList = await axios.get('/board/getAll', {
        params: {
          top: numberOfNextPostList,
          skip: isRefreshing ? 0 : skip,
          Category: topic,
        },
      });
      const newUpdatePostList = updatePostList(nextPostList.data);
      setPostList(newUpdatePostList);
      // console.log(newUpdatePostList);
      dispatch(addBoardCount(newUpdatePostList));
      // 지금 가지고 있는 게시글 이후부터 가져오기 위한 skip
      setSkip(newUpdatePostList.length);

      postList.length === 0 && nextPostList.data.length === 0
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
export default useFetchPostList;
