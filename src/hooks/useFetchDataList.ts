import axios from 'axios';
import {useCallback, useState} from 'react';
import {useEffect} from 'react';

type Props = {
  url: string;
  topic: string;
};

const useFetchDataList = ({url, topic}: Props) => {
  const [skip, setSkip] = useState(0);
  const [listData, setListData] = useState<any[]>([]);
  const [isListDataExist, setIsListDataExist] = useState<boolean>();
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSkip(0);
    await fetchNextData();
    setRefreshing(false);
  }, [fetchNextData]);

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    onRefresh,
    fetchNextData,
    listData,
    isListDataExist,
    refreshing,
  };
};
export default useFetchDataList;
