import {ListData} from 'components/PostList';
import usePlusView from './usePlusView';
import usePressLike from './usePressLike';
import {useNavigation} from '@react-navigation/native';

const useLikeAndView = () => {
  const navigation = useNavigation();
  const {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    isLikePressed,
    setIsLikePressed,
  } = usePressLike();
  const {viewCnt, setViewCnt, handlePlusView} = usePlusView();

  const navigateDetailPost = (singleData: ListData) => {
    navigation.navigate('DetailPost', {
      singleData,
      firstViewCnt: viewCnt + 1,
      firstLikeCnt: likeCnt,
      firstIsLikePressed: isLikePressed,
    });
  };

  return {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    isLikePressed,
    setIsLikePressed,
    viewCnt,
    setViewCnt,
    handlePlusView,
    navigateDetailPost,
  };
};

export default useLikeAndView;
