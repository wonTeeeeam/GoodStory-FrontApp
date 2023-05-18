import React from 'react';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {hs, vs} from 'utils/scailing';

function TypeModal({isVisible, handleSetIsVisible, handleSetTopic}) {
  const Item = (english, korean) => {
    return (
      <Pressable
        onPress={() => {
          handleSetIsVisible(false);
          handleSetTopic(english);
        }}>
        <Text style={{color: 'black', marginVertical: vs(5)}}>{korean}</Text>
      </Pressable>
    );
  };
  return (
    <View>
      <Modal visible={isVisible} transparent animationtopic="none">
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            handleSetIsVisible(false);
          }}>
          <View
            style={{
              marginTop: vs(130),
              marginHorizontal: hs(20),
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
      </Modal>
    </View>
  );
}

export default TypeModal;
