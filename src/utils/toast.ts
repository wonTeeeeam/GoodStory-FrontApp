const {ToastAndroid} = require('react-native');

export const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
