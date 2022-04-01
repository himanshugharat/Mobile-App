import AsyncStorage from '@react-native-async-storage/async-storage';

// const storeData = async (key, value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };
// const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value !== null) {
//       // value previously stored
//       const jsonValue = await AsyncStorage.getItem(key);
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     }
//   } catch (e) {
//     // error reading value
//   }
// };
const storeData = val => {
  AsyncStorage.setItem('key', 'hello');
};
const getData = key => {
  AsyncStorage.setItem(key).then(re => {
    return re;
  });
};
export {storeData, getData};
