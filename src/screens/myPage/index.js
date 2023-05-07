import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

function MyPage() {
  return (
    <View>
      <ScrollView>
        <Pressable>
          <Text style={{color: 'black'}}>비밀번호 변경</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>버전</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>도움말</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default MyPage;
