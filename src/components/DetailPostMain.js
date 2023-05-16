import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {TextColor} from '../styles/TextColor';
import {ss, vs} from '../utils/scailing';

export default function DetailPostMain({singleData}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{singleData.Title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{singleData.Content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {},
  title: {
    color: TextColor.black,
    fontSize: ss(20),
  },
  content: {
    color: TextColor.gray,
  },
  contentContainer: {
    marginTop: vs(10),
  },
});
