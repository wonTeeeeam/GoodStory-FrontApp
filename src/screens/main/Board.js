import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';

import FilterBar from 'components/FilterBar';
import PostList from 'components/PostList';

import {BackgroundColor} from 'styles/BackgroundColor';
import {showToast} from 'utils/toast';

export default function Board({route}) {
  const [filterValue, setFilterValue] = useState('최신순');
  const [backPressCount, setBackPressCount] = useState(0);

  const changeFilterValue = newFilterValue => {
    setFilterValue(newFilterValue);
  };

  useEffect(() => {
    const backAction = () => {
      setTimeout(() => {
        setBackPressCount(0);
      }, 2000);
      setBackPressCount(backPressCount + 1);
      if (backPressCount === 0) {
        showToast('한번 더 누르시면 앱이 종료됩니다');
      }
      if (backPressCount > 0) {
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, [backPressCount]);

  return (
    <View style={styles.allContainer}>
      <View style={styles.filterBar}>
        <FilterBar
          filterValue={filterValue}
          changeFilterValue={changeFilterValue}
        />
      </View>
      <View style={styles.postList}>
        <PostList filterValue={filterValue} topic={route.params.boardTopic} />
      </View>
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
