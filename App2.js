// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useEffect, useState} from 'react';
// import type {Node} from 'react';
// import {StyleSheet, Text, View, FlatList} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {Provider} from 'react-redux';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import store from './store/store';
// import MyStack from './stack/MyStack';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   useColorScheme,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// // const Section = ({children, title}): Node => {
// //   const isDarkMode = useColorScheme() === 'dark';
// //   return (
// //     <View style={styles.sectionContainer}>
// //       <Text
// //         style={[
// //           styles.sectionTitle,
// //           {
// //             color: isDarkMode ? Colors.white : Colors.black,
// //           },
// //         ]}>
// //         {title}
// //       </Text>
// //       <Text
// //         style={[
// //           styles.sectionDescription,
// //           {
// //             color: isDarkMode ? Colors.light : Colors.dark,
// //           },
// //         ]}>
// //         {children}
// //       </Text>
// //     </View>
// //   );
// // };

// const App: () => Node = () => {
//   // const isDarkMode = useColorScheme() === 'dark';

//   // const backgroundStyle = {
//   //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   // };

//   return (
//     // <SafeAreaView style={backgroundStyle}>
//     //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//     //   <ScrollView
//     //     contentInsetAdjustmentBehavior="automatic"
//     //     style={backgroundStyle}>
//     //     <Header />
//     //     <View
//     //       style={{
//     //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//     //       }}>
//     //       <Section title="Step One">
//     //         Edit <Text style={styles.highlight}>App.js</Text> to change this
//     //         screen and then come back to see your edits.
//     //       </Section>
//     //       <Section title="See Your Changes">
//     //         <ReloadInstructions />
//     //       </Section>
//     //       <Section title="Debug">
//     //         <DebugInstructions />
//     //       </Section>
//     //       <Section title="Learn More">
//     //         Read the docs to discover what to do next:
//     //       </Section>
//     //       <LearnMoreLinks />
//     //     </View>
//     //   </ScrollView>
//     // </SafeAreaView>
//     <SafeAreaProvider>
//       <Provider store={store}>
//         <NavigationContainer>
//           <MyStack />
//         </NavigationContainer>
//       </Provider>
//     </SafeAreaProvider>
//   );
// };

// // const styles = StyleSheet.create({
// //   sectionContainer: {
// //     marginTop: 32,
// //     paddingHorizontal: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //   },
// //   sectionDescription: {
// //     marginTop: 8,
// //     fontSize: 18,
// //     fontWeight: '400',
// //   },
// //   highlight: {
// //     fontWeight: '700',
// //   },
// // });

// export default App;

// // import React, {useEffect, useState} from 'react';
// // import {StyleSheet, Text, View, FlatList} from 'react-native';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {Provider} from 'react-redux';
// // import {SafeAreaProvider} from 'react-native-safe-area-context';
// // import store from './store/store';
// // import MyStack from './stack/MyStack';

// // const App = () => {
// //   return (
// //     <SafeAreaProvider>
// //       <Provider store={store}>
// //         <NavigationContainer>
// //           <MyStack />
// //         </NavigationContainer>
// //       </Provider>
// //     </SafeAreaProvider>
// //   );
// // };

// // export default App;

// // const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Mystack from './stack/Mystack';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './store/store';
// import messaging from '@react-native-firebase/messaging';
const App = () => {
  // const getToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('..............', token);
  // };
  // useEffect(() => {
  //   getToken();
  //   messaging().onMessage(async remoteMessage => {
  //     console.log();
  //     'A new FCM message arrived!', JSON.stringify(remoteMessage);
  //   });
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );
  //       }
  //     });
  // }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Mystack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
