import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Message} from 'App';
import {PostListElement} from 'hooks/useFetchPostList';
import {MainStackProps} from 'navigations/types';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {myPageAddBoardCount} from 'slice/myActivityCountDetailSlice';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {black, blue, gray, white} from 'styles';
import {checkNotificationPermission} from 'utils/permission';
import {AntDesign} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';
import {convertTimeToKorean} from 'utils/timeConverter';

const Alarm = () => {
  const [canAlarmAccessed, setCanAlarmAccessed] = useState(false);
  const [alarmList, setAlarmList] = useState<Message[]>([]);
  const boardCountDetails = useAppSelector(
    (state: RootState) => state.myActivityCountDetail,
  );

  const {likeBoards} = useAppSelector((state: RootState) => state.user);

  const navigation = useNavigation<MainStackProps['navigation']>();

  const dispatch = useDispatch();

  const addDetailBoard = (boardItem: PostListElement) => {
    dispatch(myPageAddBoardCount([...boardCountDetails, boardItem]));
  };

  const checkIsDetailBoardExist = (alarm: Message) => {
    const isExist = boardCountDetails.some(
      boardCountDetail => boardCountDetail.BoardId === alarm.boardItem.BoardId,
    );
    if (!isExist) addDetailBoard(alarm.boardItem);
  };

  const checkPermission = async () => {
    const result = await checkNotificationPermission();
    if (result === 'granted') setCanAlarmAccessed(true);
    else setCanAlarmAccessed(false);
  };

  const settingInitList = async () => {
    const listData = await AsyncStorage.getItem('alarmList');
    setAlarmList(listData ? JSON.parse(listData) : []);
  };

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    settingInitList();
  }, []);

  const deleteAlarm = (alarm: Message) => {
    const newAlarmList = alarmList.filter(
      element => element.messageId !== alarm.messageId,
    );
    setAlarmList(newAlarmList);
    AsyncStorage.setItem('alarmList', JSON.stringify(newAlarmList));
  };

  return (
    <View style={{}}>
      {!canAlarmAccessed && (
        <View style={{marginTop: vs(20), marginHorizontal: hs(20)}}>
          <Text style={{color: black.origin, fontSize: ss(20)}}>
            알람설정이 꺼져있습니다
          </Text>
          <Text style={{color: black.origin, marginTop: vs(20)}}>
            알람이 꺼져있으면 내 게시글의 댓글이나 메시지를 놓칠 수 있습니다.
            알람받기를 허용해주세요!
          </Text>
          <View style={{marginTop: vs(15), alignSelf: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: blue.dodgerblue,
                paddingVertical: vs(10),
                paddingHorizontal: hs(15),
                borderRadius: ss(20),
              }}
              onPress={() => Linking.openSettings()}>
              <Text style={{color: white.origin, fontSize: ss(15)}}>
                설정으로 이동하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{marginTop: canAlarmAccessed ? 0 : vs(30)}}>
        <ScrollView>
          {alarmList.map((alarm, index) => (
            <TouchableOpacity
              onPress={() => {
                checkIsDetailBoardExist(alarm);
                navigation.navigate('DetailBoardStack', {
                  screen: 'DetailPost',
                  params: {
                    singleData: alarm.boardItem,
                    firstIsLikePressed: likeBoards.some(
                      boardId => boardId === alarm.boardItem.BoardId,
                    ),
                  },
                });
              }}
              style={{
                borderTopWidth: ss(1),
                borderBottomWidth: ss(1),
                borderColor: gray.lightGray,
                paddingVertical: vs(20),
              }}
              key={`${index}-${alarm.boardItem.BoardId}`}>
              <View style={{marginHorizontal: hs(20)}}>
                <Pressable
                  style={{position: 'absolute', right: 0, zIndex: 10000000}}
                  onPress={() => {
                    deleteAlarm(alarm);
                  }}>
                  <AntDesign name="close" size={ss(20)} color={'black'} />
                </Pressable>
                <Text
                  style={{
                    color: black.origin,
                    fontSize: ss(10),
                  }}>
                  {alarm.title}
                </Text>
                <Text style={{color: black.origin, paddingTop: vs(10)}}>
                  {alarm.body}
                </Text>
                <Text
                  style={{
                    color: black.origin,
                    fontSize: ss(10),
                    paddingTop: vs(10),
                  }}>
                  {convertTimeToKorean(alarm.sendTime)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Alarm;
