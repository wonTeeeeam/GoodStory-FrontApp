import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {BackgroundColor} from 'styles/BackgroundColor';
import {ss, vs} from 'utils/scailing';

function CommonModal({isModalVisible, setIsModalVisible, title, body}) {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{justifyContent: 'center'}}
      //   backdropColor="transparent"
      onBackButtonPress={() => setIsModalVisible(false)}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View
        style={{
          backgroundColor: BackgroundColor.white,
          padding: ss(10),
        }}>
        <Text style={{color: 'black', fontSize: ss(20)}}>{title}</Text>
        <Text style={{color: '#B2B0B0', marginTop: vs(20), fontSize: ss(15)}}>
          {body}
        </Text>
        <Pressable
          onPress={() => setIsModalVisible(false)}
          style={{
            backgroundColor: '#029BFE',
            alignItems: 'center',
            marginTop: vs(20),
            height: vs(30),
            justifyContent: 'center',
            borderRadius: ss(20),
          }}>
          <Text style={{color: 'white'}}>확인</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

export default CommonModal;
