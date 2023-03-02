import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {TextColor} from '../../styles/TextColor';
import {ss, vs} from '../../utils/scailing';

export default function DetailPostMain({singleData}) {
  const [numberOfLine, setNumberOfLine] = useState();

  const longData = `I am going to do it. I have made up my mind. These are the first few
  words of the new… the best … the Longest Text In The Entire History Of
  The Known Universe! This Has To Have Over 35,000 words the beat the
  current world record set by that person who made that flaming chicken
  handbooky thingy. I might just be saying random things the whole time
  I type in this so you might get confused a lot. I just discovered
  something terrible. autocorrect is on!! no!!! this has to be crazy, so
  I will have to break all the English language rules and the basic
  knowledge of the average human being. I am not an average human being,
  however I am special. no no no, not THAT kind of special ;). Why do
  people send that wink face! it always gives me nightmares! it can make
  a completely normal sentence creepy. imagine you are going to a
  friend’s house, so you text this: [ see you soon 🙂 ] seems normal,
  right? But what is you add the word semi to that colon? (Is that
  right? or is it the other way around) what is you add a lorry to that
  briquettes? (Semi-truck to that coal-on) anyway, back to the point: [
  see you soon 😉 ]THAT IS JUST SO CREEPY! is that really your`;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{singleData.Title}</Text>
      </View>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.content}>{singleData.Content}</Text> */}
        <Text style={styles.content}>{longData}</Text>
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
