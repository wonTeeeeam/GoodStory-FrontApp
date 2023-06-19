import {Alert} from 'react-native';

export const alert = ({title = '', body = '', isConfirm = false}) => {
  if (isConfirm) {
    return new Promise(resolve => {
      Alert.alert(title, body, [
        {
          text: '확인',
          onPress: () => {
            resolve(true);
          },
        },
        {
          text: '취소',
          onPress: () => {
            resolve(false);
          },
        },
      ]);
    });
  }
  return new Promise(resolve => {
    Alert.alert(title, body, [
      {
        text: '확인',
        onPress: () => {
          resolve(true);
        },
      },
    ]);
  });
};
