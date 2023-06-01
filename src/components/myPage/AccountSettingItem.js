import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hs, ss} from 'utils/scailing';

function AccountSettingItem({children, text, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>{children}</View>
        <View
          style={{
            marginLeft: hs(10),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{color: 'black', flex: 0.9, fontSize: ss(15)}}>
            {text}
          </Text>
          <View style={{marginLeft: hs(5)}}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'black'}
              size={ss(15)}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default AccountSettingItem;
