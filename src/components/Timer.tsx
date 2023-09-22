import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';

type Props = {startSeconds: number; endFunction?: any};

const Timer: React.FC<Props> = ({startSeconds, endFunction}) => {
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const [time, setTime] = useState(startSeconds * 1000);
  const startTimer = () => {
    const finishTime = new Date().getTime() + startSeconds * 1000;
    timerRef.current = setInterval(() => {
      setTime(finishTime - new Date().getTime());
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        endFunction();
      }
    };
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (
      Math.floor(time / 1000 / 60) === 0 &&
      Math.floor((time / 1000) % 60) === 0 &&
      timerRef.current
    ) {
      clearInterval(timerRef.current);
      endFunction();
    }
  }, [time]);

  const changeTimeToString = (numberTime: number) => {
    if (numberTime < 10) {
      return `0${numberTime}`;
    }
    return `${numberTime}`;
  };

  return (
    <View>
      <Text style={{color: 'red'}}>
        {changeTimeToString(Math.floor(time / 1000 / 60))}:
        {changeTimeToString(Math.floor((time / 1000) % 60))}
      </Text>
    </View>
  );
};

export default Timer;
