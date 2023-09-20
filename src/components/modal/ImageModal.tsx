import React from 'react';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {white} from 'styles';

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
      <FastImage
        style={{height: '100%', width: '100%'}}
        resizeMode="contain"
        source={{
          uri: url,
        }}
      />
    </Modal>
  );
};

export default ImageModal;
