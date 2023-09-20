import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from 'utils/react-native-vector-helper';
import {hs, ss} from 'utils/scailing';

type Props = {
  children: React.ReactNode;
  text: string;
  handleOnPressBtn: () => void;
};

const AccountSettingItem: React.FC<Props> = ({
  children,
  text,
  handleOnPressBtn,
}) => {
  return (
    <Pressable onPress={handleOnPressBtn}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>{children}</View>
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
    marginLeft: hs(10),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default AccountSettingItem;
