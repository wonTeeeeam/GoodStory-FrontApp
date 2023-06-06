import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {BackgroundColor} from 'styles/BackgroundColor';
import {hs, ss, vs} from 'utils/scailing';

function ImageModal({isModalVisible, setIsModalVisible, url}) {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{margin: 0, backgroundColor: 'white'}}
      //   backdropColor="transparent"
      onBackButtonPress={() => setIsModalVisible(false)}
      onBackdropPress={() => setIsModalVisible(false)}>
      <FastImage
        style={{height: '100%', width: '100%'}}
        resizeMode="contain"
        source={{
          uri: url,
        }}
      />
    </Modal>
  );
}

export default ImageModal;
