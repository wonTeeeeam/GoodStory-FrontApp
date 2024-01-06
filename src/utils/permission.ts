import {PERMISSIONS, check} from 'react-native-permissions';

export const checkNotificationPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};
