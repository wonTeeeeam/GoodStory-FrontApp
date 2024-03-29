import React, {useEffect, useState} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';

import FilterBar from 'components/bar/FilterBar';
import PostList from 'components/PostList';
import {gray, white} from 'styles';
import {showToast} from 'utils/toast';
import {BottomStackProps} from 'navigations/types';

const Board: React.FC<BottomStackProps> = ({route}) => {
  const {boardTopic} = route.params as {boardTopic: string};
  const [filterValue, setFilterValue] = useState('최신순');
  const [backPressCount, setBackPressCount] = useState(0);

  const changeFilterValue = (newFilterValue: string) => {
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
    <View style={styles.mainContainer}>
      <View style={styles.filterBarContainer}>
        <FilterBar
          filterValue={filterValue}
          changeFilterValue={changeFilterValue}
        />
      </View>
      <View style={styles.postListContainer}>
        <PostList filterValue={filterValue} topic={boardTopic || 'Free'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  filterBarContainer: {
    flex: 0.04,
    backgroundColor: gray.lightGray,
    justifyContent: 'center',
  },
  postListContainer: {
    flex: 0.96,
    backgroundColor: white.snow,
  },
});

export default Board;
