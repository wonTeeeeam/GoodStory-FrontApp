import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AntDesign} from 'utils/react-native-vector-helper';

import {hs, ss, vs} from 'utils/scailing';
import {changeTopicToKorean} from 'utils/translation';

const TypeModal = ({
  category,
  handleSetCategory,
}: {
  category: string;
  handleSetCategory: (newValue: string) => void;
}) => {
  const [isDropDown, setIsDropDown] = useState(false);

  const Item = (english: string, korean: string) => {
    return (
      <Pressable
        onPress={() => {
          setIsDropDown(false);
          handleSetCategory(english);
        }}>
        <Text style={{color: 'black', marginVertical: vs(5)}}>{korean}</Text>
      </Pressable>
    );
  };
  return (
    <View>
      <Pressable
        onPress={() => {
          setIsDropDown(!isDropDown);
        }}>
        <View style={styles.categoryContainer}>
          <Text style={{color: 'black'}}>
            {category ? changeTopicToKorean(category) : '카테고리 선택'}
          </Text>
          <AntDesign name="caretdown" color={'blue'} size={ss(10)} />
        </View>
      </Pressable>
      {isDropDown ? (
        <Pressable
          onPress={() => {
            setIsDropDown(false);
          }}>
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <ScrollView
              style={{paddingHorizontal: hs(10)}}
              nestedScrollEnabled={true}>
              {Item('Tip', '꿀팁')}
              {Item('Backbiting', '뒷담')}
              {Item('Salary', '연봉')}
              {Item('Turnover', '이직')}
              {Item('Free', '자유')}
              {Item('Humor', '유머')}
            </ScrollView>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: ss(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vs(15),
  },
});

export default TypeModal;
