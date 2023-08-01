import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {gray, black} from 'styles';
import {ss} from 'utils/scailing';
import BottomModal from './modal/BottomModal';
import BottomModalElement from './BottomModalElement';
import {AntDesign} from 'utils/react-native-vector-helper';

export type Props = {
  filterValue: string;
  changeFilterValue: (newFilterValue: string) => void;
};

const FilterBar: React.FC<Props> = ({filterValue, changeFilterValue}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = (newValue: boolean) => {
    setIsModalVisible(newValue);
  };

  const handleFilterValueChange = (newValue: string) => {
    changeFilterValue(newValue);
    changeModalVisible(false);
  };

  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => changeModalVisible(true)}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{filterValue}</Text>
          <AntDesign name="down" size={ss(20)} color={gray.dimGray} />
        </View>
      </TouchableOpacity>
      <BottomModal
        isModalVisible={isModalVisible}
        changeModalVisible={changeModalVisible}>
        <BottomModalElement
          onPress={() => handleFilterValueChange('최신순')}
          text={'최신순'}
        />
        <BottomModalElement
          onPress={() => handleFilterValueChange('추천순')}
          text={'추천순'}
        />
      </BottomModal>
    </View>
  );
};

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

export default FilterBar;
