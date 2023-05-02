import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FilterBar from '../../components/molecules/FilterBar';
import PostList from '../../components/organisms/PostList';

import {BackgroundColor} from '../../styles/BackgroundColor';
import {ss} from '../../utils/scailing';

export default function Board({route}) {
  const navigation = useNavigation();
  const [filterValue, setFilterValue] = useState('최신순');

  const changeFilterValue = newFilterValue => {
    setFilterValue(newFilterValue);
  };

  // const BottomTab = createBottomTabNavigator();

  return (
    <View style={styles.allContainer}>
      <View style={styles.filterBar}>
        <FilterBar
          filterValue={filterValue}
          changeFilterValue={changeFilterValue}
        />
      </View>
      <View style={styles.postList}>
        <PostList
          filterValue={filterValue}
          navigation={navigation}
          topic={route.params.boardTopic}
        />
      </View>
      {/* <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={Board} />
        {/* <BottomTab.Screen name="Settings" component={SettingsScreen} /> */}
      {/* </BottomTab.Navigator>  */}
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
  },
  filterBar: {
    flex: 0.04,
    backgroundColor: BackgroundColor.lightGray,
    justifyContent: 'center',
  },
  postList: {
    flex: 0.96,
    backgroundColor: BackgroundColor.snow,
  },
});
