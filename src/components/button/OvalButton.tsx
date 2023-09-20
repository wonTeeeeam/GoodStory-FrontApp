import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ss} from 'utils/scailing';

type Props = {
  buttonColor: string;
  textColor: string;
  onPressFunction: () => void;
  text: string;
};

const OvalButton: React.FC<Props> = ({
  buttonColor,
  textColor,
  onPressFunction,
  text,
}) => {
  return (
    <View style={styles(buttonColor).buttonContainer}>
      <Pressable onPress={onPressFunction}>
        <Text style={{color: textColor}}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = (buttonColor: string) =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: buttonColor,
      borderRadius: 15,
      width: ss(100),
      height: ss(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default OvalButton;
