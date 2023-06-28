import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';

function Timer({startSeconds, endFunction}) {
  const timerRef = useRef(null);
  const [time, setTime] = useState(startSeconds * 1000);
  const startTimer = () => {
    const finishTime = new Date().getTime() + startSeconds * 1000;
    timerRef.current = setInterval(() => {
      setTime(finishTime - new Date().getTime());
    }, 1000);
    return () => clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (
      Math.floor(time / 1000 / 60) === 0 &&
      Math.floor((time / 1000) % 60) === 0
    ) {
      clearInterval(timerRef.current);
    }
  }, [time]);

  const changeTimeToString = numberTime => {
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
}

export default Timer;
