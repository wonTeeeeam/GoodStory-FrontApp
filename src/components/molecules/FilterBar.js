import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

import {BackgroundColor} from '../../styles/BackgroundColor';
import {TextColor} from '../../styles/TextColor';
import {hs, ss, vs} from '../../utils/scailing';

export default function FilterBar({filterValue, changeFilterValue}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={{}}>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{filterValue}</Text>
          <Icon name="down" size={ss(20)} color={TextColor.gray} />
        </View>
      </Pressable>

      <Modal
        isVisible={isModalVisible}
        style={styles.bottomModal}
        backdropColor="transparent"
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContents}>
          <Pressable
            onPress={() => {
              changeFilterValue('최신순');
              setIsModalVisible(false);
            }}>
            <Text style={styles.modalText}>최신순</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              changeFilterValue('추천순');
              setIsModalVisible(false);
            }}>
            <Text style={styles.modalText}>추천순</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: ss(20),
  },
  text: {
    color: TextColor.gray,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContents: {
    backgroundColor: BackgroundColor.white,
    padding: ss(10),
  },
  modalText: {
    color: TextColor.black,
    margin: ss(10),
  },
});
