import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
// import Modal from 'react-native-modal';

function LoadingModal({isVisible}) {
  return (
    <Modal visible={isVisible} transparent={true} style={{}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} style={{}} />
      </View>
    </Modal>
  );
}

export default LoadingModal;
