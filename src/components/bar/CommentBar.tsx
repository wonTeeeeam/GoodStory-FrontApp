import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {gray} from 'styles';
import {AntDesign} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';
import {showToast} from 'utils/toast';

type Props = {
  scrollViewRef: React.RefObject<ScrollView | null>;
};

const CommentBar: React.FC<Props> = ({scrollViewRef}) => {
  const [img, setImage] = useState<Asset>();

  const handleChoosePhoto = async () => {
    if (img && img.uri) {
      showToast('이미지는 최대 1개만 가능합니다');
      return;
    }
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
      return;
    } else if (result.assets && result.assets[0]) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View
      style={{
        height: vs(50),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
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
        <Pressable onPress={handleChoosePhoto} style={{marginRight: hs(10)}}>
          <AntDesign name="picture" color={'#4682B4'} size={ss(20)} />
        </Pressable>
      </View>
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
    </View>
  );
};

export default CommentBar;
