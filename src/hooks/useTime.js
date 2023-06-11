import {useState} from 'react';

function useTime() {
  const [time, setTime] = useState('');

  const startTime = seconds => {
    const minute = Math.floor(seconds / 60);
    const second = seconds - minute * 60;
    setTime(`${minute}:${second}`);
    while (seconds > 0) {
      seconds -= 1;
      setTimeout(() => {
        const minute = Math.floor(seconds / 60);
        const second = seconds - minute * 60;
        setTime(`${minute}:${second}`);
      }, '1000');
    }
  };

  const stopTime = () => {
    // clearInterval(timer);
    setTime(`0:00`);
  };

  return {time, startTime};
}

export default useTime;
