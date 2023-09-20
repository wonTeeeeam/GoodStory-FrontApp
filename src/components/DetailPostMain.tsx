import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {black, gray} from 'styles';
import {ss, vs} from 'utils/scailing';
import useHandleImage from 'hooks/useHandleImage';
import {PostListElement} from 'hooks/useFetchPostList';

const DetailPostMain = ({singleData}: {singleData: PostListElement}) => {
  const {InsertImageInContent} = useHandleImage();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{singleData.Title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          {InsertImageInContent(singleData.Content, singleData.BoardPhotos)}
        </Text>
      </View>
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
