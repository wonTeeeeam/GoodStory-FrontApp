import {PostListElement} from './useFetchPostList';
import usePlusView from './usePlusView';
import usePressLike from './usePressLike';
import {useNavigation} from '@react-navigation/native';
import {MainStackProps} from 'navigations/types';

const useLikeAndView = () => {
  const navigation = useNavigation<MainStackProps['navigation']>();
  const {handlePressLike, isLikePressed, setIsLikePressed} = usePressLike();
  const {handlePlusView} = usePlusView();

  const navigateDetailPost = async (singleData: PostListElement) => {
    navigation.navigate('DetailBoardStack', {
      screen: 'DetailPost',
      params: {
        singleData: singleData,
        firstIsLikePressed: isLikePressed,
      },
    });
    await handlePlusView(singleData);
  };

  return {
    handlePressLike,
    isLikePressed,
    setIsLikePressed,
    handlePlusView,
    navigateDetailPost,
  };
};

export default useLikeAndView;
