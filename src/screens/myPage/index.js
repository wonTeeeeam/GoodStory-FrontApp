import React, {useState} from 'react';
import {Platform, Pressable, ScrollView, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {hs, ss, vs} from 'utils/scailing';
import ActivityFeed from 'components/myPage/ActivityFeed';
import AccountSettingItem from 'components/myPage/AccountSettingItem';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import useLogout from 'hooks/useLogout';
import axios from 'axios';
import {alert} from 'utils/alert';
import LoadingModal from 'components/LoadingModal';
import ImagePicker from 'react-native-image-crop-picker';
import {changeProfile} from 'slice/userSlice';
import {showToast} from 'utils/toast';

function MyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const version = DeviceInfo.getVersion();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const {
    nickName,
    account,
    profileImage,
    userId,
    likeBoards,
    likeReReplys,
    likeReplys,
  } = useSelector(state => state.user);
  const {handleLogout} = useLogout();

  const handleWithdrawal = async () => {
    try {
      const result = await alert({
        title: '회원탈퇴',
        body: '회원탈퇴하시겠습니까?',
        isConfirm: true,
      });
      if (result) {
        setIsLoading(true);
        const result = await axios.delete('/user/delete', {id: userId});
        await handleLogout();
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handlePressLogout = async () => {
    const result = await alert({
      title: '로그아웃',
      body: '로그아웃하시겠습니까?',
      isConfirm: true,
    });
    if (result) {
      setIsLoading(true);
      await handleLogout();
      setIsLoading(false);
    }
  };

  const imagePicker = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: '원안에 사진을 맞춰주세요!',
      showCropGuidelines: true,
    });
    const formData = new FormData();
    formData.append('files', {
      name: image.modificationDate,
      type: image.mime,
      uri:
        Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
    });
    try {
      setIsLoading(true);
      const result = await axios.post('/user/updateProfilePhoto', formData, {
        headers: {
          'Content-topic': 'multipart/form-data',
        },
      });
      dispatch(changeProfile(image.path));
      setIsLoading(false);
      showToast('프로필이 변경되었습니다');
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      showToast('프로필 변경에 실패했습니다. 잠시후에 시도해주세요');
    }
  };

  return (
    <View style={{marginHorizontal: hs(20)}}>
      <View
        style={{
          marginTop: vs(20),
          flexDirection: 'row',
          borderBottomWidth: ss(1),
          borderBottomColor: '#D8D8D8',
          paddingBottom: vs(10),
        }}>
        <Text
          style={{
            flex: 1,
            color: 'black',
            fontWeight: 'bold',
            fontSize: ss(20),
          }}>
          마이페이지
        </Text>
        <View style={{}}>
          <Feather name="bell" color={'#696969'} size={ss(25)} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            marginTop: vs(20),
            flexDirection: 'row',
          }}>
          <Pressable
            style={{
              backgroundColor: '#D3D3D3',
              width: '20%',
              alignItems: 'center',
              height: vs(60),
              borderRadius: ss(100),
            }}
            onPress={imagePicker}>
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
            {profileImage ? (
              <FastImage
                style={{height: '100%', width: '100%', borderRadius: ss(100)}}
                // resizeMode="contain"
                source={{
                  uri: profileImage,
                }}
              />
            ) : (
              <Ionicons name="person-outline" color={'white'} size={ss(55)} />
            )}
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'flex-end',
              marginLeft: hs(10),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: ss(15)}}>{nickName}님</Text>
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
          <ActivityFeed
            like={likeBoards.length + likeReReplys.length + likeReplys.length}
            post={10}
            reply={10}
          />
        </View>
        <View style={{marginTop: vs(50)}}>
          <AccountSettingItem
            text={'비밀번호 변경'}
            onPress={() =>
              navigation.navigate('MyPageStack', {screen: 'ResetPassword'})
            }>
            <Entypo name="lock" color={'black'} size={ss(20)} />
          </AccountSettingItem>
          <View style={{marginTop: vs(30)}}>
            <AccountSettingItem
              text={'공지사항'}
              onPress={() =>
                navigation.navigate('MyPageStack', {screen: 'Announcement'})
              }>
              <Entypo name="help" color={'black'} size={ss(20)} />
            </AccountSettingItem>
          </View>
          <View style={{marginTop: vs(30)}}>
            <AccountSettingItem
              text={'환경설정'}
              onPress={() =>
                navigation.navigate('MyPageStack', {screen: 'Configuration'})
              }>
              <AntDesign name="setting" color={'black'} size={ss(20)} />
            </AccountSettingItem>
          </View>
          <View style={{marginTop: vs(30)}}>
            <AccountSettingItem text={'로그아웃'} onPress={handlePressLogout}>
              <Ionicons name="exit" color={'black'} size={ss(20)} />
            </AccountSettingItem>
          </View>
          <View style={{marginTop: vs(30)}}>
            <AccountSettingItem text={'회원탈퇴'} onPress={handleWithdrawal}>
              <MaterialCommunityIcons
                name="exit-run"
                color={'black'}
                size={ss(20)}
              />
            </AccountSettingItem>
          </View>
        </View>
      </ScrollView>
      <LoadingModal isVisible={isLoading} />
    </View>
  );
}

export default MyPage;
