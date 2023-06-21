import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';

function useFetchDataList({url, topic = null}) {
  const [skip, setSkip] = useState(0);
  const [listData, setListData] = useState([]);
  const [isListDataExist, setIsListDataExist] = useState(undefined);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSkip(0);
    await fetchNextData();
    setRefreshing(false);
  }, [fetchNextData]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const fetchNextData = useCallback(async () => {
    const top = 5;

    try {
      const nextData = await axios.get(url, {
        params: {
          top: top,
          skip: skip,
          Category: topic,
        },
      });
      setSkip(skip + 5);
      skip === 0 && nextData.data.length === 0
        ? setIsListDataExist(false)
        : setIsListDataExist(true);

      skip === 0
        ? setListData([...nextData.data])
        : setListData([...listData, ...nextData.data]);
    } catch (e) {
      console.log(e);
    }
  }, [url, skip, listData, topic]);
  return {onRefresh, fetchNextData, listData, isListDataExist, refreshing};
}
export default useFetchDataList;
