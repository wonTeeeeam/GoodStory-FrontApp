import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {black, gray} from 'styles';
import {hs, ss, vs} from 'utils/scailing';
import {PostListElement} from 'hooks/useFetchPostList';
import FastImage from 'react-native-fast-image';
import {MaterialIcons} from 'utils/react-native-vector-helper';
import ImageModal from './modal/ImageModal';
import useImageModal from 'hooks/useImageModal';

const DetailPostMain = ({singleData}: {singleData: PostListElement}) => {
  const {isModalVisible, handleSetIsModalVisible, url, handleSetUrl} =
    useImageModal();
  const handleImages = () => {
    return singleData.BoardPhotos.map((photo, idx) =>
      photo.URL ? (
        <View key={idx}>
          <Pressable
            style={{marginVertical: vs(10)}}
            onPress={() => {
              handleSetIsModalVisible(true);
              handleSetUrl(photo.URL);
            }}>
            <FastImage
              style={{height: vs(300), width: hs(300)}}
              resizeMode="contain"
              source={{
                uri: photo.URL,
              }}
            />
          </Pressable>
        </View>
      ) : (
        <View style={{marginVertical: vs(10)}}>
          <MaterialIcons
            key={idx}
            name="image-not-supported"
            color={'#4682B4'}
            size={ss(50)}
          />
        </View>
      ),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{singleData.Title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{singleData.Content}</Text>
        {handleImages()}
      </View>
      <ImageModal
        isModalVisible={isModalVisible}
        handleSetIsModalVisible={() => handleSetIsModalVisible(!isModalVisible)}
        url={url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {},
  title: {
    color: black.origin,
    fontSize: ss(20),
  },
  content: {
    color: gray.dimGray,
  },
  contentContainer: {
    marginTop: vs(40),
  },
});

export default DetailPostMain;
