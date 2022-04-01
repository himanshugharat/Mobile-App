import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppRegistry, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
const Barcode = () => {
  const [state, setstate] = useState('');
  function onSuccess(e) {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
    setstate(e.data);
    console.log(e.data);
  }
  return (
    <QRCodeScanner
      onRead={onSuccess}
      //   flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={<Text style={styles.centerText}>{state}</Text>}
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default Barcode;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
