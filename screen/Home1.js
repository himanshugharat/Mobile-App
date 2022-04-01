import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';
import Attendence from './Attendence';
import {TouchableOpacity} from 'react-native';
const Home1 = ({navigation}) => {
  const [allTask, setallTask] = useState([]);
  const [trigger, settrigger] = useState(false);
  const [triggerTime, settriggerTime] = useState(true);
  const [loginData, setloginData] = useState('');
  const [loginDataName, setloginDataName] = useState([]);
  const [Home, setHome] = useState(false);
  // DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //   console.log(batteryLevel);
  // });
  const updateLocal = useSelector(state => state);
  console.log('bc', updateLocal);
  const db = firestore();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      dispatch(addLocalData(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  //   setTimeout(() => {
  //     settriggerTime(false);
  //   }, 5000);
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('Refreshed!');
    // setTimeout(() => {}, 2000);
    getData().then(re => {
      setloginData(re);
      setloginDataName(re.name.split(' '));
      console.log(re);
      let item = [];
      db.collection('compnayTed')
        .doc(re.companyName)
        .collection('uer')
        .doc(re.name)
        .collection('task')
        .limit(200)
        .get()
        .then(book => {
          book.forEach(doc => {
            if (
              doc.data()['Due date'].split('-').reverse().join('') >
              moment('2021/07/25', 'YYYYMMDD').add(3, 'd').format('YYYYMMDD')
            )
              item.push(doc.data());
          });
          // console.log(item);
          // console.log('inner', item);
          setallTask(item);
          // setloading(true);
          dispatch(getAllTask(item));
        })
        .then(settrigger(!trigger));
      // taskData.forEach(doc => {
      //   db.collection('compnayTed')
      //     .doc('ted')
      //     .collection('uer')
      //     .doc('himan')
      //     .collection('task')
      //     .add(doc);
      // });
    });
    // });
    setTimeout(() => {
      settrigger(!trigger);
    }, 3000);
    // // return unsubscribe;
    // setTimeout(() => {
    //   settriggerTime(false);
    // }, 5000);
  }, []);
  // useEffect(() => {
  //   settrigger(false);
  //   settriggerTime(true);
  //   setTimeout(() => {
  //     settriggerTime(false);
  //   }, 3000);

  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log('Refreshed!');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  if (false) {
    return <Loading />;
  } else {
    return (
      <>
        {allTask.length > 0 ||
          (true && (
            <View style={styles.mainContainer}>
              <View style={styles.helloContainer}>
                {/* {loginData && (
                  <Text style={styles.helloTextHeading}>
                    Hello
                    <Text style={styles.helloText}> {loginDataName[0]}</Text>
                  </Text>
                )} */}
              </View>
              <View style={styles.attendenceContainer}>
                <Attendence />
              </View>

              <View style={styles.formContainer}>
                <View style={styles.parent}>
                  {/* {!triggerTime && ( */}
                  <>
                    <TouchableOpacity
                      //   disabled={triggerTime}
                      style={styles.childBig}
                      onPress={() => {
                        navigation.push('Task Summary', {data: allTask});
                      }}>
                      <Text style={styles.childTitle}>
                        {triggerTime ? 'Loading...' : 'Task'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.child}
                      onPress={() => {
                        navigation.push('Technical', {data: allTask});
                      }}>
                      <Text style={styles.childTitle}>Technical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.child}
                      onPress={() => {
                        navigation.push('Sales', {data: allTask});
                      }}>
                      <Text style={styles.childTitle}>Sales</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.childBig}
                      onPress={() => {
                        navigation.push('Collection', {data: allTask});
                      }}>
                      <Text style={styles.childTitle}>Collection</Text>
                    </TouchableOpacity>
                  </>
                  {/* )} */}
                </View>
              </View>
            </View>
          ))}
      </>
    );
  }
};

export default Home1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  attendenceContainer: {
    flex: 0.3,
    padding: 10,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',

    padding: 10,
    flex: 2,
  },
  formButton: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 30,
    height: 30,
    //  marginRight: 10,
  },
  taskContainer: {
    flex: 2,
  },
  collectionContainer: {
    //flex: 1,
  },
  helloContainer: {
    flex: 0.3,
  },
  helloText: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textTransform: 'capitalize',
  },
  helloTextHeading: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textTransform: 'capitalize',
  },
  button: {
    marginBottom: 20,
    padding: 20,
    height: 10,
  },

  childTitle: {
    fontSize: 25,
    fontFamily: 'Montserrat',
  },
  parent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  child: {
    width: '48%',
    height: '48%',
    margin: '1%',
    aspectRatio: 1.4,
    backgroundColor: '#64ffda',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
  },
  childBig: {
    width: '98%',
    height: 10,
    margin: '1%',
    aspectRatio: 3.1,
    backgroundColor: '#64ffda',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
  },
});
