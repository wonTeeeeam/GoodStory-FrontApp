import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {gray, black} from 'styles';
import {hs, ss, vs} from 'utils/scailing';
import BottomModal from './modal/BottomModal';
import BottomModalElement from './BottomModalElement';
import {AntDesign} from 'utils/react-native-vector-helper';

export default function FilterBar({filterValue, changeFilterValue}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={{}}>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{filterValue}</Text>
          <AntDesign name="down" size={ss(20)} color={gray.dimGray} />
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
    color: gray.dimGray,
  },
  modalText: {
    color: black.origin,
    margin: ss(10),
  },
});
