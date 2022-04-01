import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
const RatingModel = ({id, name}) => {
  const db = firestore();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  function ratingCompleted(rating) {
    console.log(id);
    console.log(name);
    console.log('Rating is: ' + rating);
    if (name === 'stb') {
      getData().then(re => {
        db.collection('stb')
          // .doc(re.companyName)
          // .collection('uer')
          // .doc(re.name)
          // .collection('task')
          .doc(id.toString())
          .update({
            customerRating: rating,
          });
      });
    }
    if (name === 'digital') {
      getData().then(re => {
        db.collection('compnayTed')
          .doc(re.companyName)
          .collection('uer')
          .doc(re.name)
          .collection('task')
          .doc(id.toString())
          .update({
            customerRating: rating,
          });
      });
    }

    // getData().then(re => {
    //   db.collection('compnayTed')
    //     .doc(re.companyName)
    //     .collection('uer')
    //     .doc(re.name)
    //     .collection('task')
    //     .doc(id.toString())
    //     .update({
    //       customerRating: rating,
    //     });
    // });
  }
  return (
    <>
      <AirbnbRating
        count={5}
        reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
        defaultRating={0}
        onFinishRating={ratingCompleted}
        size={30}
        starContainerStyle={{marginTop: -10}}
      />
    </>
  );
};

export default RatingModel;

const styles = StyleSheet.create({});
