import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import TesseractOcr, {LANG_ENGLISH} from 'react-native-tesseract-ocr';

const JoinCamera = ({route}) => {
  // 카메라에서 이미지 캡처 후 Tesseract.js로 OCR 수행
  const captureImageAndRecognizeText = async () => {
    try {
      const tessOptions = {};
      // const text = await TesseractOcr.recognize(
      //   'https://tesseract.projectnaptha.com/img/eng_bw.png',
      //   LANG_ENGLISH,
      //   tessOptions,
      // );
      // console.log(text);
    } catch (e) {}
  };
  return (
    <View>
      <Pressable onPress={() => captureImageAndRecognizeText()}>
        <Text style={{color: 'red', fontSize: 100}}>fff</Text>
      </Pressable>
    </View>
  );
};

export default JoinCamera;
