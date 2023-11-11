import {registerUserInfo} from 'api/join';
import JoinButton from 'components/button/JoinButton';
import LoadingModal from 'components/modal/LoadingModal';
import {JoinStackProps} from 'navigations/types';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from 'slice/navigationSlice';
import {alert} from 'utils/alert';
import {AntDesign, Ionicons} from 'utils/react-native-vector-helper';

import {hs, ss, vs} from 'utils/scailing';

const JoinProfile: React.FC<JoinStackProps> = ({route, navigation}) => {
  const {Email, Password, Nickname} = route.params as {
    Email: string;
    Password: string;
    Nickname: string;
  };

  const [profileImage, setProfileImage] = useState<ImageOrVideo>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const makeFormData = () => {
    const formData = new FormData();
    if (profileImage?.path) {
      formData.append('file', {
        name: profileImage.modificationDate,
        type: profileImage.mime,
        uri:
          Platform.OS === 'ios'
            ? profileImage.path.replace('file://', '')
            : profileImage.path,
      });
    }

    formData.append('Account', Email);
    formData.append('Password', Password);
    formData.append('Nickname', Nickname);
    formData.append('CompanyCode', 123123);
    formData.append('CompanyName', '중소');
    return formData;
  };

  const handlePressButton = async () => {
    setIsLoading(true);
    const result = await registerUserInfo(makeFormData());
    setIsLoading(false);
    if (result) {
      alert({title: '회원가입 성공', body: '회원가입에 성공하였습니다!'});
      dispatch(handleIsUserStartJoin());
    }
  };

  const selectProfileImage = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: '원안에 사진을 맞춰주세요!',
      showCropGuidelines: true,
    });
    setProfileImage(image);
  };

  return (
    <View>
      {isLoading && <LoadingModal isVisible={isLoading} />}
      <View style={{marginHorizontal: hs(20)}}>
        <Text style={{color: 'black', marginTop: vs(30)}}>
          프로필 이미지를 설정해주세요
        </Text>
        <View style={{alignItems: 'center', marginTop: vs(30)}}>
          <Pressable
            style={styles.profileImagePressable}
            onPress={selectProfileImage}>
            <AntDesign
              name="setting"
              color={'#DCDCDC'}
              size={ss(25)}
              style={styles.settingIcon}
            />
            {profileImage ? (
              <FastImage
                style={{height: '100%', width: '100%', borderRadius: ss(100)}}
                // resizeMode="contain"
                source={{
                  uri: profileImage.path + `?` + new Date().getTime(),
                }}
              />
            ) : (
              <Ionicons name="person-outline" color={'white'} size={ss(100)} />
            )}
          </Pressable>
        </View>
        <JoinButton isAbled={true} handleOnPressBtn={handlePressButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImagePressable: {
    backgroundColor: '#D3D3D3',
    width: hs(100),
    alignItems: 'center',
    height: vs(100),
    borderRadius: ss(100),
  },
  settingIcon: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    backgroundColor: 'white',
    borderRadius: ss(10),
    zIndex: 1,
  },
});

export default JoinProfile;
