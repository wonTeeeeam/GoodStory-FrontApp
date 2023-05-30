import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hs, ss} from 'utils/scailing';

function AccountSettingItem({children, text}) {
  return (
    <Pressable>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {children}
        <Text style={{color: 'black'}}>{text}</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          color={'black'}
          size={ss(15)}
          style={{marginLeft: hs(5)}}
        />
      </View>
    </Pressable>
  );
}

export default AccountSettingItem;
