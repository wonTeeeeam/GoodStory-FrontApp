const {ToastAndroid} = require('react-native');

export const showToast = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
