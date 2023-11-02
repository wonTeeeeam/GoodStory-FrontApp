import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from 'utils/react-native-vector-helper';
import {hs, ss} from 'utils/scailing';

type Props = {
  text: string;
  handleOnPressBtn: () => Promise<void>;
};

const AccountSettingItem: React.FC<Props> = ({text, handleOnPressBtn}) => {
  return (
    <Pressable onPress={handleOnPressBtn}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.textContainer}>
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
};

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: hs(5),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default AccountSettingItem;
