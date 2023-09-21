import React from 'react';
import {hs, vs} from 'utils/scailing';
import FastImage from 'react-native-fast-image';

import {View, StyleSheet} from 'react-native';
import {AntDesign} from 'utils/react-native-vector-helper';
import {Asset} from 'react-native-image-picker';

type Props = {
  images: Asset[];
  removeImageFromContent: (index: number) => void;
};

const SelectedImage: React.FC<Props> = ({images, removeImageFromContent}) => {
  return (
    <View>
      {images.map((image, index) => {
        return (
          <View key={index} style={styles.totalContainer}>
            <FastImage
              source={{uri: image.uri}}
              style={{width: 50, height: 50}}
            />
            <View style={{marginLeft: hs(52), position: 'absolute'}}>
              <AntDesign
                name="closecircle"
                color={'#4682B4'}
                size={15}
                onPress={() => {
                  removeImageFromContent(index);
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    marginTop: vs(20),
    height: vs(100),
    alignItems: 'flex-start',
    paddingLeft: hs(10),
    paddingVertical: vs(5),
    flexDirection: 'row',
  },
});

export default SelectedImage;
