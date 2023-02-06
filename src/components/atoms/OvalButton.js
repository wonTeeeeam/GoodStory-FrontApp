import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from '../../utils/scailing';

export default function OvalButton({
  buttonColor,
  textColor,
  onPressFunction,
  text,
}) {
  return (
    <View style={styles(buttonColor).buttonContainer}>
      <Pressable onPress={onPressFunction}>
        <Text>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = buttonColor =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: buttonColor,
      borderRadius: 15,
      width: moderateScale(100),
      height: moderateScale(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
