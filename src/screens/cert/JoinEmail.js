import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

function JoinEmail() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: 'true',
      });
  }, [navigation]);

  return (
    <View>
      <Text style={{color: 'red'}}>가즈아</Text>
    </View>
  );
}

export default JoinEmail;
