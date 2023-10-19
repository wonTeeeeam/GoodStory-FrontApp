import {useState} from 'react';
import {ImageOrVideo} from 'react-native-image-crop-picker';

const useProfileSetting = () => {
  const [profileImage, setProfileImage] = useState<ImageOrVideo>();
  const handleSetProfileImage = (newImage: ImageOrVideo) => {
    setProfileImage(newImage);
  };
  return {profileImage, handleSetProfileImage};
};

export default useProfileSetting;
