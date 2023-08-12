import {ListData} from 'components/PostList';
import usePlusView from './usePlusView';
import usePressLike from './usePressLike';
import {useNavigation} from '@react-navigation/native';
import {MainStackProps} from 'navigations/types';

const useLikeAndView = () => {
  const navigation = useNavigation<MainStackProps['navigation']>();
  const {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    isLikePressed,
    setIsLikePressed,
  } = usePressLike();
  const {viewCnt, setViewCnt, handlePlusView} = usePlusView();

  const navigateDetailPost = (singleData: ListData) => {
    navigation.navigate('DetailBoardStack', {
      screen: 'DetailPost',
      params: {
        singleData: singleData,
        firstViewCnt: viewCnt + 1,
        firstLikeCnt: likeCnt,
        firstIsLikePressed: isLikePressed,
      },
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
