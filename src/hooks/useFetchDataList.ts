import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';

type Props = {
  url: string;
  topic: string;
};

type BoardPhotoList = {
  BoardPhotoID: string;
  URL: string;
  Created_date: string;
};

export type ListData = {
  BoardId: string;
  Category: string;
  Created_date: string;
  Updated_date: string;
  Title: string;
  Content: string;
  Like: number;
  Views: number;
  ReplyCount: number;
  user: {
    UserId: string;
    Nickname: string;
    Role: string;
    CompanyCode: string;
    CompanyName: string;
    Created_date: string;
    Updated_date: string;
    Deleted_date: string | null;
    ProfilePhoto: string;
  };
  BoardPhotos: BoardPhotoList[];
};

const useFetchDataList = ({url, topic}: Props) => {
  const [skip, setSkip] = useState(0);
  const [listData, setListData] = useState<any[]>();
  const [isListDataExist, setIsListDataExist] = useState<boolean>();
  const [refreshing, setRefreshing] = React.useState(false);

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
  }, [onRefresh]);

  return {
    onRefresh,
    fetchNextData,
    listData,
    isListDataExist,
    refreshing,
  };
};
export default useFetchDataList;
