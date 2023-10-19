import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

import {AntDesign, Ionicons} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';

type Props = {
  profileImage: ImageOrVideo | undefined;
  handleSetProfileImage: (newImage: ImageOrVideo) => void;
};

const ProfileSetting: React.FC<Props> = ({
  profileImage,
  handleSetProfileImage,
}) => {
  const selectProfileImage = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: '원안에 사진을 맞춰주세요!',
      showCropGuidelines: true,
    });
    handleSetProfileImage(image);
  };

  return (
    <View>
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

export default ProfileSetting;
