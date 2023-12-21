import React, {useCallback, useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  requestMyPageUserData,
  requestMyPageWithDrawal,
  requestPostUserProfile,
} from 'api/myPage/myPage';
import LoadingModal from 'components/modal/LoadingModal';
import AccountSettingItem from 'components/myPage/AccountSettingItem';
import ActivityFeed from 'components/myPage/ActivityFeed';
import useLogout from 'hooks/useLogout';
import {MainStackProps} from 'navigations/types';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {changeProfile} from 'slice/userSlice';
import {useAppSelector} from 'store/hooks';
import {gray, red, white} from 'styles';
import {alert} from 'utils/alert';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  Entypo,
} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';
import {showToast} from 'utils/toast';

type UserData = {
  UserId: string;
  Account: string;
  Role: string;
  CompanyCode: string;
  Created_date: string;
  Updated_date: string;
  Deleted_date: string;
  likeBoards: number;
  boards: number;
  replies: number;
};

const MyPageScreen = () => {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(false);

  // const version = DeviceInfo.getVersion();
  const dispatch = useDispatch();

  const navigation = useNavigation<MainStackProps['navigation']>();
  const {nickName, profileUrl, userId} = useAppSelector(state => state.user);

  const {handleLogout, handleDeleteLocalDatas} = useLogout();

  // 화면 포커싱 될 때 유저정보 업데이트 해줍니다.
  useFocusEffect(
    useCallback(() => {
      const fetchMypageData = async () => {
        setIsLoading(true);
        const myPageUserData = await requestMyPageUserData(userId);
        setIsLoading(false);
        if (myPageUserData) {
          setUserData(myPageUserData);
        }
      };
      fetchMypageData();
    }, [userId]),
  );

  const handleWithdrawal = async () => {
    const keepGoing = await alert({
      title: '회원탈퇴',
      body: '회원탈퇴하시겠습니까?',
      isConfirm: true,
    });
    if (!keepGoing) return;

    setIsLoading(true);
    if (await requestMyPageWithDrawal(userId)) {
      await handleDeleteLocalDatas();
      alert({title: '회원탈퇴 성공', body: '회원 탈퇴되었습니다!'});
    }
    setIsLoading(false);
  };

  const handlePressLogout = async () => {
    const result = await alert({
      title: '로그아웃',
      body: '로그아웃하시겠습니까?',
      isConfirm: true,
    });
    setIsLoading(true);
    result && (await handleLogout());
    setIsLoading(false);
  };

  const selectProfileImage = async () => {
    if (!userData) {
      alert({
        title: '유저 정보 조회 실패',
        body: '유저정보를 조회하는 데 실패하였습니다!',
      });
      return null;
    }
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: '원안에 사진을 맞춰주세요!',
      showCropGuidelines: true,
    });
    const formData = new FormData();
    formData.append('file', {
      name: image.modificationDate,
      type: image.mime,
      uri:
        Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
    });
    formData.append('Account', userData.Account);
    return formData;
  };

  const changeProfileImage = async () => {
    const formData = await selectProfileImage();
    if (!formData) {
      return;
    }
    setIsLoading(true);
    const profileResult = await requestPostUserProfile(formData);
    setIsLoading(false);
    if (!profileResult) return;
    dispatch(changeProfile(profileResult.data));
    showToast('프로필이 변경되었습니다');
  };

  if (isLoading) {
    return <LoadingModal isVisible={isLoading} />;
  }

  return (
    <ScrollView
      contentContainerStyle={{backgroundColor: gray.lightGray, flex: 1}}>
      <View style={{flex: 0.45}}>
        <View style={{backgroundColor: white.origin}}>
          <View style={styles.mypageTextContainer}>
            <Text style={styles.mypageText}>마이페이지</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyPageStack', {screen: 'Alarm'});
              }}>
              <Feather name="bell" color={'#696969'} size={ss(25)} />
              <View style={{position: 'absolute'}}>
                <Entypo name={'dot-single'} size={ss(40)} color={red.hotLips} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: white.origin, marginTop: vs(2)}}>
          <View style={styles.profileImageContainer}>
            <Pressable
              style={styles.profileImagePressable}
              onPress={changeProfileImage}>
              <AntDesign
                name="setting"
                color={'#DCDCDC'}
                size={ss(20)}
                style={styles.settingIcon}
              />
              {profileUrl ? (
                <FastImage
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: ss(100),
                  }}
                  // resizeMode="contain"
                  source={{
                    uri: profileUrl + `?` + new Date().getTime(),
                  }}
                />
              ) : (
                <Ionicons name="person-outline" color={'white'} size={ss(55)} />
              )}
            </Pressable>
            <Pressable style={styles.gogoIcon}>
              <Text style={{color: 'black', fontSize: ss(15)}}>
                {nickName}님
              </Text>
              <MaterialIcons
                name="arrow-forward-ios"
                color={'black'}
                size={ss(15)}
                style={{marginLeft: hs(5)}}
              />
            </Pressable>
          </View>
        </View>
        <View style={{backgroundColor: white.origin, paddingBottom: vs(40)}}>
          <View style={styles.ActivityFeedContainer}>
            <ActivityFeed
              like={userData?.likeBoards || 0}
              post={userData?.boards || 0}
              reply={userData?.replies || 0}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: white.origin,
          marginTop: vs(2),
          flex: 0.61,
        }}>
        <View
          style={{
            paddingVertical: vs(10),
            marginHorizontal: hs(10),
            borderBottomWidth: ss(1),
            borderBottomColor: gray.lightGray,
          }}>
          <AccountSettingItem
            text={'비밀번호 변경'}
            handleOnPressBtn={() => {
              if (!userData) {
                return showToast('유저정보를 조회하는 데 실패하였습니다!');
              }
              navigation.navigate('MyPageStack', {
                screen: 'ResetPassword',
                params: {account: userData.Account},
              });
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: vs(10),
            marginHorizontal: hs(10),
            borderBottomWidth: ss(1),
            borderBottomColor: gray.lightGray,
          }}>
          <AccountSettingItem
            text={'공지사항'}
            handleOnPressBtn={() =>
              navigation.navigate('MyPageStack', {
                screen: 'Announcement',
              })
            }
          />
        </View>
        <View
          style={{
            paddingVertical: vs(10),
            marginHorizontal: hs(10),
            borderBottomWidth: ss(1),
            borderBottomColor: gray.lightGray,
          }}>
          <AccountSettingItem
            text={'환경설정'}
            handleOnPressBtn={() =>
              navigation.navigate('MyPageStack', {
                screen: 'Configuration',
              })
            }
          />
        </View>
        <View
          style={{
            paddingVertical: vs(10),
            marginHorizontal: hs(10),
            borderBottomWidth: ss(1),
            borderBottomColor: gray.lightGray,
          }}>
          <AccountSettingItem
            text={'로그아웃'}
            handleOnPressBtn={handlePressLogout}
          />
        </View>
        <View
          style={{
            paddingVertical: vs(10),
            marginHorizontal: hs(10),
          }}>
          <AccountSettingItem
            text={'회원탈퇴'}
            handleOnPressBtn={handleWithdrawal}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mypageTextContainer: {
    marginTop: vs(20),
    flexDirection: 'row',
    paddingBottom: vs(10),
    marginHorizontal: hs(20),
  },
  mypageText: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: ss(20),
  },
  profileImageContainer: {
    marginTop: vs(20),
    flexDirection: 'row',
    marginHorizontal: hs(20),
  },
  profileImagePressable: {
    backgroundColor: '#D3D3D3',
    width: '20%',
    alignItems: 'center',
    height: vs(60),
    borderRadius: ss(100),
  },
  settingIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    borderRadius: ss(10),
    zIndex: 1,
  },
  gogoIcon: {
    alignSelf: 'flex-end',
    marginLeft: hs(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ActivityFeedContainer: {
    marginTop: vs(20),
    borderWidth: ss(1),
    borderRadius: ss(10),
    marginHorizontal: hs(20),
  },
});

export default MyPageScreen;
