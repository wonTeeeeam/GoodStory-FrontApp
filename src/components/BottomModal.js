import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {gray} from 'styles';
import {ss} from 'utils/scailing';

function BottomModal({isModalVisible, setIsModalVisible, children}) {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{justifyContent: 'flex-end', margin: 0}}
      backdropColor="transparent"
      onBackButtonPress={() => setIsModalVisible(false)}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={{backgroundColor: gray.lightGray, padding: ss(10)}}>
        {children}
      </View>
    </Modal>
  );
}

export default BottomModal;
