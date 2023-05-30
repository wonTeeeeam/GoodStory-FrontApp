import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {hs, ss, vs} from 'utils/scailing';
import ActivityFeed from 'components/myPage/ActivityFeed';
import AccountSettingItem from 'components/myPage/AccountSettingItem';

function MyPage() {
  const version = DeviceInfo.getVersion();
  return (
    <View style={{marginHorizontal: hs(20)}}>
      <View
        style={{
          marginTop: vs(20),
          flexDirection: 'row',
          borderBottomWidth: ss(1),
          borderBottomColor: '#D8D8D8',
          paddingBottom: vs(10),
          // justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: ss(20),
            flex: 1,
          }}>
          마이페이지
        </Text>
        <View style={{}}>
          <Feather name="bell" color={'#696969'} size={ss(25)} />
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop: vs(20), flexDirection: 'row'}}>
          <Pressable
            style={{
              backgroundColor: '#D3D3D3',
              width: '20%',
              alignItems: 'center',
              height: vs(60),
              borderRadius: ss(100),
            }}>
            <AntDesign
              name="setting"
              color={'#DCDCDC'}
              size={ss(20)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: 'white',
                borderRadius: ss(10),
                zIndex: 1,
              }}
            />
            <Ionicons name="person-outline" color={'white'} size={ss(55)} />
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'flex-end',
              marginLeft: hs(10),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: ss(15)}}>반원재님</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'black'}
              size={ss(15)}
              style={{marginLeft: hs(5)}}
            />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: vs(20),
            borderWidth: ss(1),
            borderRadius: ss(10),
          }}>
          <ActivityFeed like={10} post={10} reply={10} />
        </View>
        <AccountSettingItem text={'비밀번호 변경'}>
          <Entypo name="lock" color={'black'} size={ss(20)} />
        </AccountSettingItem>
        <AccountSettingItem text={'도움말'}>
          <Entypo name="help" color={'black'} size={ss(20)} />
        </AccountSettingItem>
        <AccountSettingItem text={'로그아웃'}>
          <Ionicons name="exit" color={'black'} size={ss(20)} />
        </AccountSettingItem>
      </ScrollView>
    </View>
  );
}

export default MyPage;
