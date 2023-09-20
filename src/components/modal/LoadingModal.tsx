import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

const LoadingModal = ({isVisible}: {isVisible: boolean}) => {
  return (
    <Modal visible={isVisible} transparent={true} style={{}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} style={{}} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
