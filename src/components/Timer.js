import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';

function Timer({startSeconds}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let restTime = startSeconds;

  const calculateTime = () => {
    restTime -= 1;
    if (restTime <= 0) {
      return;
    }
    setMinutes(Math.floor(restTime / 60));
    setSeconds(Math.floor(restTime % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => calculateTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text style={{color: 'red'}}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
}

export default Timer;
