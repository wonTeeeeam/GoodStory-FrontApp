import React, {useState, useEffect} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {hs, ss, vs} from 'utils/scailing';
import ActivityFeed from 'components/myPage/ActivityFeed';
import AccountSettingItem from 'components/myPage/AccountSettingItem';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import useLogout from 'hooks/useLogout';
import {alert} from 'utils/alert';
import LoadingModal from 'components/modal/LoadingModal';
import ImagePicker from 'react-native-image-crop-picker';
import {changeProfile} from 'slice/userSlice';
import {showToast} from 'utils/toast';
import {Feather, MaterialIcons} from 'utils/react-native-vector-helper';
import {useAppSelector} from 'store/hooks';
import {
  requestMyPageUserData,
  requestMyPageWithDrawal,
  requestPostUserProfile,
} from 'api/myPage';
import {MyPageStackProps} from 'navigations/types';
import ProfileSetting from 'components/ProfileSetting';

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

  const navigation = useNavigation<MyPageStackProps['navigation']>();
  const {nickName, profileImage, userId} = useAppSelector(state => state.user);
  const {handleLogout} = useLogout();

  useEffect(() => {
    const fetchMypageData = async () => {
      setIsLoading(true);
      const myPageUserData = await requestMyPageUserData(userId);
      setIsLoading(false);
      if (myPageUserData) {
        setUserData(myPageUserData);
      }
    };
    fetchMypageData();
  }, []);

  const handleWithdrawal = async () => {
    const keepGoing = await alert({
      title: '회원탈퇴',
      body: '회원탈퇴하시겠습니까?',
      isConfirm: true,
    });
    if (!keepGoing) {
      return;
    }
    const withDrawalResult = await requestMyPageWithDrawal(userId);
    if (withDrawalResult) {
      setIsLoading(true);
      await handleLogout();
      setIsLoading(false);
      alert({title: '회원탈퇴 성공', body: '회원 탈퇴되었습니다!'});
    }
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
    <View style={{marginHorizontal: hs(20)}}>
      <View style={styles.mypageTextContainer}>
        <Text style={styles.mypageText}>마이페이지</Text>
        <View>
          <Feather name="bell" color={'#696969'} size={ss(25)} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.profileImageContainer}>
          <ProfileSetting />
          <Pressable style={styles.gogoIcon}>
            <Text style={{color: 'black', fontSize: ss(15)}}>{nickName}님</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'black'}
              size={ss(15)}
              style={{marginLeft: hs(5)}}
            />
          </Pressable>
        </View>
        <View style={styles.ActivityFeedContainer}>
          <ActivityFeed
            like={userData?.likeBoards}
            post={userData?.boards}
            reply={userData?.replies}
          />
        </View>
        <View
          style={{
            marginTop: vs(50),
          }}>
          <AccountSettingItem
            text={'비밀번호 변경'}
            handleOnPressBtn={() => {
              if (!userData) {
                return showToast('유저정보를 조회하는 데 실패하였습니다!');
              }
              navigation.navigate('ResetPassword', {
                account: userData.Account,
              });
            }}
          />
          <View style={{marginTop: vs(20), borderTopWidth: ss(1)}}>
            <AccountSettingItem
              text={'공지사항'}
              handleOnPressBtn={() => navigation.navigate('Announcement')}
            />
          </View>
          <View style={{marginTop: vs(20), borderTopWidth: ss(1)}}>
            <AccountSettingItem
              text={'환경설정'}
              handleOnPressBtn={() => navigation.navigate('Configuration')}
            />
          </View>
          <View style={{marginTop: vs(20), borderTopWidth: ss(1)}}>
            <AccountSettingItem
              text={'로그아웃'}
              handleOnPressBtn={handlePressLogout}
            />
          </View>
          <View style={{marginTop: vs(20), borderTopWidth: ss(1)}}>
            <AccountSettingItem
              text={'회원탈퇴'}
              handleOnPressBtn={handleWithdrawal}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mypageTextContainer: {
    marginTop: vs(20),
    flexDirection: 'row',
    borderBottomWidth: ss(1),
    borderBottomColor: '#D8D8D8',
    paddingBottom: vs(10),
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
  },
});

export default MyPageScreen;
