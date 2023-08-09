import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {gray} from 'styles';
import {ss} from 'utils/scailing';

type Props = {
  isModalVisible: boolean;
  changeModalVisible: (newValue: boolean) => void;
  children: React.ReactNode;
};

const BottomModal: React.FC<Props> = ({
  isModalVisible,
  changeModalVisible,
  children,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{justifyContent: 'flex-end', margin: 0}}
      backdropColor="transparent"
      onBackButtonPress={() => changeModalVisible(false)}
      onBackdropPress={() => changeModalVisible(false)}>
      <View style={{backgroundColor: gray.lightGray, padding: ss(10)}}>
        {children}
      </View>
    </Modal>
  );
};

export default BottomModal;
