import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {gray} from 'styles';
import {AntDesign} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';
import {ListData} from 'components/PostList';

import CommentModal from '../modal/CommentModal';
import {ReplyDatum} from 'screens/main/DetailPost';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {showToast} from 'utils/toast';

type Props = {
  scrollViewRef: React.RefObject<ScrollView | null>;
  singleData: ListData;
  handleSetReplyDatum: (newReplyData: ReplyDatum) => void;
};

const CommentBar: React.FC<Props> = ({
  scrollViewRef,
  singleData,
  handleSetReplyDatum,
}) => {
  const {userId} = useAppSelector((state: RootState) => state.user);

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const handleSetIsCommentModalVisible = (newValue: boolean) => {
    setIsCommentModalVisible(newValue);
  };

  const handleOnPressCommentBar = () => {
    if (!userId) {
      return showToast('로그인이 필요한 서비스입니다.');
    }
    setIsCommentModalVisible(true);
  };

  return (
    <View
      style={{
        height: vs(50),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={handleOnPressCommentBar}
        style={{
          marginLeft: hs(5),
          flexDirection: 'row',
          backgroundColor: gray.lightGray,
          width: '85%',
          height: '70%',
          borderRadius: ss(10),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            marginLeft: hs(10),
            color: gray.origin,
            fontSize: ss(15),
          }}>
          댓글 작성
        </Text>
      </Pressable>
      <View
        style={{
          backgroundColor: gray.lightGray,
          height: '70%',
          width: '10%',
          marginLeft: hs(5),
          alignItems: 'center',
          borderRadius: ss(100),
          justifyContent: 'center',
        }}>
        <AntDesign
          name="down"
          color={gray.origin}
          size={ss(20)}
          onPress={() => {
            scrollViewRef.current?.scrollToEnd();
          }}
        />
      </View>
      <CommentModal
        isCommentModalVisible={isCommentModalVisible}
        handleSetIsCommentModalVisible={handleSetIsCommentModalVisible}
        singleData={singleData}
        handleSetReplyDatum={handleSetReplyDatum}
      />
    </View>
  );
};

export default CommentBar;
