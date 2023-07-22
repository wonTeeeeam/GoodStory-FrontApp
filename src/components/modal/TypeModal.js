import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {AntDesign} from 'utils/react-native-vector-helper';

import {hs, ss, vs} from 'utils/scailing';
import {changeTopicToKorean} from 'utils/translation';

function TypeModal({category, handleSetCategory}) {
  const [isDropDown, setIsDropDown] = useState(false);

  const Item = (english, korean) => {
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
    <View style={{}}>
      <Pressable
        style={{}}
        onPress={() => {
          setIsDropDown(!isDropDown);
        }}>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: ss(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: vs(15),
          }}>
          <Text style={{color: 'black'}}>
            {category ? changeTopicToKorean(category) : '카테고리 선택'}
          </Text>
          <AntDesign name="caretdown" color={'blue'} size={ss(10)} />
        </View>
      </Pressable>
      {isDropDown ? (
        <Pressable
          style={{}}
          onPress={() => {
            setIsDropDown(false);
          }}>
          <View
            style={{
              // marginTop: vs(130),
              // marginHorizontal: hs(20),
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
}

export default TypeModal;
