import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getData} from '../store/localstorage';
const Task = () => {
  const [data, setdata] = useState('');
  const [value, setvalue] = useState('');
  const db = firestore();

  useEffect(() => {
    getData('data').then(re => {
      console.log(re);
    });
    let item = [];
    db.collection('admin')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          item.push(doc.data());
        });
        setdata(item);
      });
    console.log(value);
  }, []);

  return (
    <View>
      <Text>hello</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            {/* {value && <Text>{value.data}</Text>} */}
            <Text>{item.hello}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({});
