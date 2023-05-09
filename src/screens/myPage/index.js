import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

function MyPage() {
  const version = DeviceInfo.getVersion();
  return (
    <View>
      <ScrollView>
        <Pressable>
          <Text style={{color: 'black'}}>프로필 이미지</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>받은 좋아요</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>좋아요 누른 글</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>비밀번호 변경</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>버전{version}</Text>
        </Pressable>
        <Pressable>
          <Text style={{color: 'black'}}>도움말</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default MyPage;
