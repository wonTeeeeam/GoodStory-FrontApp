import React, {useState} from 'react';

const useImageModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState('');

  const handleSetIsModalVisible = (newValue: boolean) => {
    setIsModalVisible(newValue);
  };

  const handleSetUrl = (newUrl: string) => {
    setUrl(newUrl);
  };

  return {isModalVisible, handleSetIsModalVisible, url, handleSetUrl};
};

export default useImageModal;
