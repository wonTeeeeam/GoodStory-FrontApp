import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import {TextColor} from 'styles/TextColor';
import {hs, ss, vs} from 'utils/scailing';
import BottomModal from './BottomModal';
import BottomModalElement from './BottomModalElement';

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
      <BottomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}>
        <BottomModalElement
          onPress={() => {
            changeFilterValue('최신순');
            setIsModalVisible(false);
          }}
          text={'최신순'}
        />
        <BottomModalElement
          onPress={() => {
            changeFilterValue('추천순');
            setIsModalVisible(false);
          }}
          text={'추천순'}
        />
      </BottomModal>
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
  modalText: {
    color: TextColor.black,
    margin: ss(10),
  },
});
