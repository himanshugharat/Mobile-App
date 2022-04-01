import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Drop} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {ListItem, Avatar} from 'react-native-elements';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {Picker} from '@react-native-picker/picker';
const Test = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
