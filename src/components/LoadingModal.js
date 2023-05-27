import React from 'react';
import {ActivityIndicator, Modal} from 'react-native';

function LoadingModal({isVisible}) {
  return (
    <Modal visible={isVisible}>
      <ActivityIndicator size={'large'} />
    </Modal>
  );
}

export default LoadingModal;
