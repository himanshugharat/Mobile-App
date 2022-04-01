import React from 'react';
import {Button} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

const Board = ({navigation}) => {
  return (
    <View>
      <Button title="signature" onPress={() => navigation.push('signature')} />
      <Button title="barcode" onPress={() => navigation.push('barcode')} />
      <Button
        title="UploadImage"
        onPress={() => navigation.push('UploadImage')}
      />
      <Button title="Rating" onPress={() => navigation.push('Rating')} />
      <Button
        title="UploadVideo"
        onPress={() => navigation.push('UploadVideo')}
      />
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({});
