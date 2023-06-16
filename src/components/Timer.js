import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';

function Timer({startSeconds, endFunction}) {
  const changeTimeToString = time => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const [minutes, setMinutes] = useState(
    changeTimeToString(Math.floor(startSeconds / 60)),
  );
  const [seconds, setSeconds] = useState(
    changeTimeToString(Math.floor(startSeconds % 60)),
  );
  let restTime = startSeconds;
  const intervalRef = useRef(null);

  const calculateTime = () => {
    restTime -= 1;

    if (restTime === 0) {
      setMinutes(`00`);
      setSeconds(`00`);
      clearInterval(intervalRef.current);
      endFunction();
    }
    setMinutes(changeTimeToString(Math.floor(restTime / 60)));
    setSeconds(changeTimeToString(Math.floor(restTime % 60)));
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => calculateTime(), 1000);

    return () => clearInterval(intervalRef.current);
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
