import React, {useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {black, blue, gray, white} from 'styles';
import {AntDesign} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';

const Alarm = () => {
  const [canAlarmAccessed, setCanAlarmAccessed] = useState(false);
  return (
    <View style={{}}>
      {!canAlarmAccessed && (
        <View style={{marginTop: vs(20), marginHorizontal: hs(20)}}>
          <Text style={{color: black.origin, fontSize: ss(20)}}>
            알람설정이 꺼져있습니다
          </Text>
          <Text style={{color: black.origin, marginTop: vs(20)}}>
            알람이 꺼져있으면 내 게시글의 댓글이나 메시지를 놓칠 수 있습니다.
            알람받기를 허용해주세요!
          </Text>
          <View style={{marginTop: vs(15), alignSelf: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: blue.dodgerblue,
                paddingVertical: vs(10),
                paddingHorizontal: hs(15),
                borderRadius: ss(20),
              }}
              onPress={() => Linking.openSettings()}>
              <Text style={{color: white.origin, fontSize: ss(15)}}>
                설정으로 이동하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{marginTop: vs(30)}}>
        <View
          style={{
            borderTopWidth: ss(1),
            borderBottomWidth: ss(1),
            borderColor: gray.lightGray,
            paddingVertical: vs(20),
          }}>
          <View style={{marginHorizontal: hs(20)}}>
            <View style={{position: 'absolute', right: 0}}>
              <AntDesign name="close" size={ss(20)} color={'black'} />
            </View>
            <Text
              style={{
                color: black.origin,
                fontSize: ss(10),
              }}>
              새 댓글이 있습니다
            </Text>
            <Text style={{color: black.origin, paddingTop: vs(10)}}>
              {'한원석 멍청한데요?'}
            </Text>
            <Text
              style={{
                color: black.origin,
                fontSize: ss(10),
                paddingTop: vs(10),
              }}>
              {'어제'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Alarm;
