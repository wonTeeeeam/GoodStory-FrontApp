import React from 'react';
import {hs, vs} from '../utils/scailing';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {View} from 'react-native';

function SelectedImage({images, setImage}) {
  return images.map((image, index) => {
    return (
      <View
        key={index}
        style={{
          marginTop: vs(20),
          height: vs(100),
          alignItems: 'flex-start',
          paddingLeft: hs(10),
          paddingVertical: vs(5),
          flexDirection: 'row',
        }}>
        <FastImage source={{uri: image.uri}} style={{width: 50, height: 50}} />
        <View style={{marginLeft: hs(52), position: 'absolute'}}>
          <AntDesign
            name="closecircle"
            color={'#4682B4'}
            size={15}
            onPress={() => {
              const newImages = [...images];
              newImages.splice(index, 1);
              setImage([...newImages]);
            }}
          />
        </View>
      </View>
    );
  });
}

export default SelectedImage;
