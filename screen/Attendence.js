import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {attendenceData} from '../store/taskAction';
import Snackbar from 'react-native-snackbar';
import {Card, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {employee} from '../assets/json/employee';
const Attendence = () => {
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };

  const [update, setupdate] = useState('checkIn');
  const [loading, setloading] = useState(true);
  const [timeAttendence, settimeAttendence] = useState(true);
  const [trigger, settrigger] = useState(false);

  useEffect(() => {
    getData()
      .then(re => {
        db.collection('userPreDefined')
          .doc(re.name)
          .collection('attendence')
          .doc(moment(new Date()).format('MM-YYYY').toString())
          .collection('day')
          .doc(data.toString())
          .get()
          .then(re => {
            if (!re.exists) {
              console.log(re);
            } else {
              console.log('lol', re.data().type);
              setupdate(re.data().type);
              console.log(re.data().type);
              if (re.data().type != 'checkIn' || undefined)
                dispatch(attendenceData('checkOut'));
              settimeAttendence(re.data());
            }
          });
      })
      .then(settrigger(!trigger));
  }, [loading, dispatch]);

  const getLocation = () => {
    Geolocation.setRNConfiguration(locationConfig);

    Geolocation.getCurrentPosition(data => {
      console.log(data);
      setData({lat: data.coords.latitude, lng: data.coords.longitude});
      // setData({lat: 20.324269, lng: 74.960117});
    });
  };
  const setData = async data => {
    await AsyncStorage.setItem('latLng', JSON.stringify(data));
  };

  const updateType = data1 => {
    getData().then(re => {
      db.collection('userPreDefined')
        .doc(re.name)
        .collection('attendence')
        .doc(data.toString())
        .update({
          type: data1,
        });
    });
  };
  var data = moment().format('LL');
  const dispatch = useDispatch(attendenceData);

  const db = firestore();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const checkIn = () => {
    setupdate('checkOut');
    updateType('checkOut');
    setloading(!loading);
    getData().then(re => {
      db.collection('userPreDefined')
        .doc(re.name)
        .collection('attendence')
        .doc(moment(new Date()).format('MM-YYYY').toString())
        .collection('day')
        .doc(moment().format('LL'))
        .set(
          {
            checkDate: moment().format('LL'),
            checkInTime: moment().format('HH:mm:ss'),

            enggId: re.name,
            type: 'checkOut',
          },
          {merge: true},
        )
        .then(() => {
          getLocation();
        })
        .then(() => {
          db.collection('attendanceMonthly')
            .doc(moment(new Date()).format('MM-YYYY').toString())
            .collection('day')

            .add({
              checkDate: moment().format('LL'),
              checkInTime: moment().format('HH:mm:ss'),
              enggId: re.name,
              type: 'checkOut',
            });
        })

        .then(() => {
          dispatch(attendenceData('checkOut'));

          Snackbar.show({
            text: 'Check In successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .then(() => {
          let name = employee.filter(na => na.id === re.name);
          db.collection('attendanceSummary')
            .doc(moment(new Date()).format('MM-YYYY').toString())
            .collection('day')
            .doc(moment(new Date()).format('DD-MM-YYYY'))
            .set(
              {
                totalNumberOfCheckin: firestore.FieldValue.increment(1),
                date: moment(new Date()).format('DD-MM-YYYY'),
                loginName: firestore.FieldValue.arrayUnion({
                  ...name[0],
                  time: moment(new Date()).format('DD-MM-YYYY hh:mm:ss'),
                }),
              },
              {merge: true},
            );
        });
    });
  };
  const checkOut = () => {
    setupdate('done');
    updateType('done');
    setloading(!loading);
    getData().then(re => {
      db.collection('userPreDefined')
        .doc(re.name)
        .collection('attendence')
        .doc(moment(new Date()).format('MM-YYYY').toString())
        .collection('day')
        .doc(data.toString())
        .update({
          checkOutTime: moment().format('HH:mm:ss'),
          type: 'done',
        })
        .then(() => {
          db.collection('attendanceMonthly')
            .doc(moment(new Date()).format('MM-YYYY').toString())
            .collection('day')

            .add({
              checkOutTime: moment().format('HH:mm:ss'),
              type: 'done',
            });
        })
        .then(() => {
          db.collection('attendanceSummary')
            .doc(moment(new Date()).format('MM-YYYY').toString())
            .collection('day')
            .doc(moment(new Date()).format('DD-MM-YYYY'))
            .set(
              {
                totalNumberOfCheckout: firestore.FieldValue.increment(1),
              },
              {merge: true},
            );
        })
        .then(() => {
          dispatch(attendenceData('done'));
          Snackbar.show({
            text: 'Check Out successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerTime}>
          {!timeAttendence.checkInTime && (
            <Text style={styles.attendanceDetails}>Have a Great Day Ahead</Text>
          )}
          {timeAttendence.checkInTime && (
            <Text style={styles.attendanceDetails}>
              CheckIn at: {timeAttendence.checkInTime}
            </Text>
          )}
          {timeAttendence.checkOutTime && (
            <Text style={styles.attendanceDetails}>
              CheckOut at: {timeAttendence.checkOutTime}
            </Text>
          )}
          {timeAttendence.checkInHr && !timeAttendence.checkOutHr && (
            <>
              <Text style={styles.attendanceDetails}>
                You need to complete 9hr
              </Text>
              <Text style={styles.attendanceDetails}>
                to get attendence approved
              </Text>
            </>
          )}
        </View>
        <View style={styles.attendenceButton}>
          {update === 'checkIn' && (
            <Button
              title="CheckIn"
              buttonStyle={[styles.checkButton, {backgroundColor: '#52BE80'}]}
              titleStyle={styles.checkInTitle}
              onPress={() => {
                checkIn();
              }}
            />
          )}
          {/* {update == 'checkOut' && new Date().getHours() >= 18 && ( */}
          {update == 'checkOut' && (
            <Button
              title="CheckOut"
              buttonStyle={[styles.checkButton, {backgroundColor: '#ef5350'}]}
              titleStyle={styles.checkOutTitle}
              onPress={() => {
                checkOut();
              }}
            />
          )}

          {update == 'done' && (
            <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
              Done for Today
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Attendence;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,

    padding: 1,
    backgroundColor: '#fff',
  },
  containerTime: {
    display: 'flex',

    justifyContent: 'center',
  },
  attendenceButton: {
    display: 'flex',

    justifyContent: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  attendanceDetails: {
    fontFamily: 'Montserrat-Regular',
  },
  checkButton: {
    borderRadius: 50,
    fontFamily: 'Montserrat-SemiBold',
  },

  checkInTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },
  checkOutTitle: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
});
