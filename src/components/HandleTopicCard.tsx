import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {ss, vs} from 'utils/scailing';
import {useNavigation} from '@react-navigation/native';
import {BottomStackProps} from 'navigations/types';
import {blue, white} from 'styles';
import {changeTopicToEnglish} from 'utils/translation';

type Props = {text: string; children: React.ReactNode};

const HandleTopicCard: React.FC<Props> = ({text, children}) => {
  const navigation = useNavigation<BottomStackProps['navigation']>();

  return (
    <TouchableOpacity
      style={styles.totalContainer}
      onPress={() => {
        navigation.reset({
          routes: [
            {name: 'Board', params: {boardTopic: changeTopicToEnglish(text)}},
          ],
        });
      }}>
      {children}
      <View style={{marginTop: vs(20)}}>
        <Text style={{color: white.snow}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    backgroundColor: blue.aero,
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ss(10),
  },
});

export default HandleTopicCard;
