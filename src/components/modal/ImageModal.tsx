import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {white} from 'styles';
import {AntDesign} from 'utils/react-native-vector-helper';
import {hs, ss} from 'utils/scailing';

type Props = {
  isModalVisible: boolean;
  handleSetIsModalVisible: (newValue: boolean) => void;
  url: string;
};

const ImageModal: React.FC<Props> = ({
  isModalVisible,
  handleSetIsModalVisible,
  url,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{margin: 0, backgroundColor: white.origin}}
      onBackButtonPress={() => handleSetIsModalVisible(false)}
      onBackdropPress={() => handleSetIsModalVisible(false)}>
      <TouchableOpacity
        style={{alignItems: 'flex-end', marginRight: hs(10)}}
        onPress={() => handleSetIsModalVisible(false)}>
        <AntDesign name="close" size={ss(30)} color={'black'} />
      </TouchableOpacity>
      <View style={{height: '90%', width: '100%'}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <ImageZoom
            uri={url}
            resizeMode="contain"
            minScale={0.5}
            maxScale={3}
          />
        </GestureHandlerRootView>
      </View>

      {/* <FastImage
        style={{height: '90%', width: '100%'}}
        resizeMode="contain"
        source={{
          uri: url,
        }}
      /> */}
    </Modal>
  );
};

export default ImageModal;
