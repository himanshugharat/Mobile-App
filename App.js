import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Mystack from './stack/Mystack';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './store/store';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const getData = async type => {
    try {
      const jsonValue = await AsyncStorage.getItem(type);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('..............', token);
    getData('user').then(re => {
      db.collection('messagingToken').doc(re.name).set({token});
    });
  };
  const db = firestore();
  const [versionData, setversionData] = useState('');
  const updateApp = () => {
    const version = DeviceInfo.getVersion();
    console.log(version);
    // setversionData(version)
    db.collection('version')
      .doc('main')
      .get()
      .then(re => {
        if (version !== re.data().id) {
          console.log(re.data().id);
          Alert.alert(
            'Update Available',
            'update app to latest version',
            [
              {
                text: 'ok',
                onPress: () => {
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.cloudfos',
                  );
                },
              },
            ],
            // Linking.openURL(
            //   'https://play.google.com/store/apps/details?id=com.cloudfos',
            // ),
          );
        }
        setversionData(re.data().id);
      });
    // if (parseInt(versionData) < parseInt(version)) {
    //   console.log(versionData != version);
    //   alert('you have a update');
    // }
  };
  useEffect(() => {
    updateApp();
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log();
      'A new FCM message arrived!', JSON.stringify(remoteMessage);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
  }, []);
  return (
    // <SafeAreaProvider>
    <Provider store={store}>
      <NavigationContainer>
        <Mystack />
      </NavigationContainer>
    </Provider>
    // </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
