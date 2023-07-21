import React from 'react';
import {useMemo} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {hs, ss, vs} from 'utils/scailing';
import {useState} from 'react';
import ImageModal from 'components/modal/ImageModal';

function useHandleImage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const imageFlags = useMemo(
    () =>
      new RegExp(
        /image:\/\/0\/|image:\/\/1\/|image:\/\/2\/|image:\/\/3\/|image:\/\/4\//,
      ),
    [],
  );

  const imageRegex = useMemo(
    () =>
      new RegExp(
        /image:\/\/0\/|image:\/\/1\/|image:\/\/2\/|image:\/\/3\/|image:\/\/4\//,
        'g',
      ),
    [],
  );

  const InsertImageInContent = (content, image) => {
    let copyContent = content.slice();

    const Result = [];
    let keyIndex = 0;
    for (let i = 0; i < 5; i++) {
      const matchInfo = imageFlags.exec(copyContent);
      if (!matchInfo) {
        Result.push(<Text key={keyIndex}>{copyContent}</Text>);
        copyContent = null;
        break;
      }
      if (matchInfo.index !== 0) {
        Result.push(
          <Text key={keyIndex}>{copyContent.slice(0, matchInfo.index)}</Text>,
        );
        keyIndex += 1;
      }
      if (image[parseInt(matchInfo[0][8], 10)]) {
        const imgUrl =
          image[parseInt(matchInfo[0][8], 10)].uri ||
          image[parseInt(matchInfo[0][8], 10)].URL;
        Result.push(
          <View key={keyIndex}>
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
                setUrl(imgUrl);
              }}>
              <FastImage
                style={{height: vs(300), width: hs(300)}}
                resizeMode="contain"
                source={{
                  uri: imgUrl,
                }}
              />
            </Pressable>
          </View>,
        );
      } else {
        Result.push(
          <MaterialIcons
            key={keyIndex}
            name="image-not-supported"
            color={'#4682B4'}
            size={ss(50)}
          />,
        );
      }

      keyIndex += 1;
      copyContent = copyContent.slice(matchInfo.index + 10);
    }
    if (copyContent) {
      Result.push(<Text key={keyIndex}>{copyContent}</Text>);
      keyIndex += 1;
    }
    keyIndex += 1;
    Result.push(
      <ImageModal
        key={keyIndex}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        url={url}
      />,
    );
    return Result;
  };
  const deleteImageFlagsInContent = content => {
    return content.replaceAll(imageRegex, '');
  };

  return {InsertImageInContent, deleteImageFlagsInContent};
}
export default useHandleImage;
