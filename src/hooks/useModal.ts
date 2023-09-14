import {useState} from 'react';

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = (newValue: boolean) => {
    setIsModalVisible(newValue);
  };

  return {isModalVisible, changeModalVisible};
};

export default useModal;
