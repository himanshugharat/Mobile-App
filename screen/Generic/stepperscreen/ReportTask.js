import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {Card} from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import {updateTaskList} from '../../../store/taskAction';
import {useDispatch} from 'react-redux';
import Mainsignature from '../../addOn/Mainsignature';
import RatingModel from '../../addOn/RatingModel';
import MapViewDirections from 'react-native-maps-directions';

const ReportTask = ({route, navigation}) => {
  var data = moment().format('LL');
  const [checkinLat, setcheckinLat] = useState();
  const [DetailLat, setDetailLat] = useState();
  useEffect(() => {
    getDataLatLng().then(re => {
      setcheckinLat({latitude: re.lat, longitude: re.lng});
    });
    getDataLatLng1().then(re => {
      setDetailLat({latitude: re.latitude, longitude: re.longitude});
    });
  }, []);

  Geocoder.init('AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0');
  const [report, setreport] = useState('');
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getDataLatLng = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('latLng');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getDataLatLng1 = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('detailLatLng');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  console.log(route.params.data.id);
  const db = firestore();
  const [lat, setlat] = useState('');
  const [long, setlong] = useState('');
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };
  const getLocation = () => {
    const setData = async data => {
      console.log(data);
      await AsyncStorage.setItem('latLng', JSON.stringify(data));
    };
    Geolocation.setRNConfiguration(locationConfig);

    Geolocation.getCurrentPosition(data => {
      Geocoder.from(data.coords.latitude, data.coords.longitude).then(
        json => {
          console.log(
            json.results[0].address_components[
              json.results[0].address_components.length - 1
            ].long_name,
          );
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          setlat(data.coords.latitude);
          setlong(data.coords.longitude);
          console.log(data);
          setData({lat: data.coords.latitude, lng: data.coords.longitude});

          getData().then(re => {
            db.collection('compnayTed')
              .doc(re.companyName)
              .collection('uer')
              .doc(re.name)
              .collection('task')
              .doc(route.params.data.id.toString())
              .update({
                // 'Account Status': 'data',
                endLat: data.coords.latitude,
                endlong: data.coords.longitude,
                // enddate: moment().format('DD-MM:YYYY'),
                EndDatetime: moment().format('DD-MM-YYYY HH:mm:ss'),
                endlocationData: addressComponent,
                // locationDataLat: addressComponent.short_name,
                'task status': 'done',
              })
              .then(() => {})
              .then(() => {
                console.log('in');
                getData().then(re => {
                  console.log(re);
                  db.collection('compnayTed')
                    .doc(re.companyName)
                    .collection('uer')
                    .doc(re.name)
                    .collection('task')
                    .doc(route.params.data.id.toString())
                    .get()
                    .then(data => {
                      db.collection('mainDB')
                        .doc(re.companyName)
                        .collection('uer')
                        .doc(re.name)
                        .collection(moment(new Date()).format('DD-MM-YYYY'))
                        .doc(route.params.data.id.toString())
                        .set(data.data());
                    });
                });
              })
              .then(() => {
                console.log('in');
                getData().then(re => {
                  console.log(re);
                  db.collection('compnayTed')
                    .doc(re.companyName)
                    .collection('uer')
                    .doc(re.name)
                    .collection('task')
                    .doc(route.params.data.id.toString())
                    .get()
                    .then(data => {
                      db.collection('BackupDb')
                        .doc(moment(new Date()).format('MM-YYYY').toString())
                        .collection('backup')
                        .add(data.data());
                      db.collection('dailyBackup')
                        .doc(moment(new Date()).format('DD-MM-YYYY').toString())
                        .collection('backup')
                        .add(data.data());
                    });
                });
              })
              .then(() => {
                db.collection('TotalSummary')
                  .doc(moment(new Date()).format('MM-YYYY').toString())
                  .collection('data')
                  .doc(new Date().getDate().toString())
                  .set(
                    {
                      date: moment(new Date()).format('DD-MM-YYYY'),
                      completedTask: firestore.FieldValue.increment(1),
                    },
                    {merge: true},
                  );
              })
              .then(() => {
                console.log('inLatLngSummary');
                db.collection('LatLngSummary').doc(re.name).set({
                  endLat: data.coords.latitude,
                  endlong: data.coords.longitude,
                });
              })
              .then(() => {
                console.log('in dataSummary');
                db.collection('dataSummary')
                  .doc(re.name)
                  .collection('date')
                  .doc(moment(new Date()).format('MM-YYYY').toString())
                  .collection('day')
                  .doc(new Date().getDate().toString())
                  .set(
                    {
                      date: moment(new Date()).format('DD-MM-YYYY'),
                      completedTask: firestore.FieldValue.increment(1),
                      [report['Visit type']]: firestore.FieldValue.increment(1),
                    },
                    {merge: true},
                  );
              })
              .then(re => {
                getDataLatLng().then(re => {
                  console.log(re);
                });
              })
              .then(() => {
                dispatch(updateTaskList(route.params.data.id));
                navigation.navigate('Task Summary', {data1: 'update'});
              });
          });
        },
        error => {
          console.log(
            'The location could not be loaded because ',
            error.message,
          ),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000};
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          });
        },
      );
    });
  };
  console.log(lat, long);
  useEffect(() => {
    getData().then(re => {
      db.collection('compnayTed')
        .doc(re.companyName)
        .collection('uer')
        .doc(re.name)
        .collection('task')
        .doc(route.params.data.id.toString())
        .get()
        .then(re => {
          setreport(re.data());
          console.log(re.data());
        });
    });
  }, []);

  return (
    <ScrollView>
      <Card>
        {/* <Text
        h4
        h4Style={{
          fontSize: 20,
          color: '#000',
          textDecorationLine: 'underline',
          // marginLeft: 10,
          marginBottom: 10,
        }}>
        Minutes Of Meeting
      </Text> */}
        {/* {!report ? (
        <Loading />
      ) : (
        <View>
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Person Met:
            </Text>
            &nbsp;{report['Person Met']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Amount Collected:
            </Text>
            &nbsp; {report['Amount Collected']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Any New Requirement:
            </Text>
            &nbsp; {report['Any New Requirement']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              New Mobile Number:
            </Text>
            &nbsp; {report['New Mobile Number']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Online Recharge Process Explained:
            </Text>
            &nbsp; {report['Online Recharge Process Explained']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Purpose of Visit:
            </Text>
            &nbsp; {report['Purpose of Visit']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Reason of DC:
            </Text>
            &nbsp; {report['Reason of DC']}
          </Text>
          <Card.Divider />
          <Text>
            <Text
              h4
              h4Style={{
                fontSize: 15,
                color: '#868889',
                // textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              ChildDC/Reason:
            </Text>
            &nbsp; {report['ChildDC']}
            {report['ChildDc']}
          </Text>
        </View>
      )}
      <Button
        type="outline"
        title="Submit"
        buttonStyle={{
          backgroundColor: '#008CBA',
          borderRadius: 50,
          marginTop: 10,
        }}
        titleStyle={{color: '#fff'}}
        title="Complete task"
        onPress={() => {
          getLocation();
        }}
      />
      <Button
        type="outline"
        title="Submit"
        buttonStyle={{
          backgroundColor: '#008CBA',
          borderRadius: 50,
          marginTop: 10,
        }}
        titleStyle={{color: '#fff'}}
        title="Back to task"
        onPress={() => {
          // setActive(p => p - 1);
        }}
      /> */}
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 15,
            borderColor: '#5DADE2',
          }}>
          <Text style={styles.formTitle}>Minutes Of Meeting</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Person Met :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {report['Person Met']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>
                    Amount Collected :-
                  </Text>
                  <Text style={formStyles.columnDetails}>
                    {report['Amount Collected']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>
                    Any New Requirement :-
                  </Text>
                  <Text style={formStyles.columnDetails}>
                    {report['Any New Requirement']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>
                    New Mobile Number :-
                  </Text>
                  <Text style={formStyles.columnDetails}>
                    {report['New Mobile Number']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>
                    Online Recharge Process Explained :-
                  </Text>
                  <Text style={formStyles.columnDetails}>
                    {report['Online Recharge Process Explained']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>
                    Purpose of Visit :-
                  </Text>
                  <Text style={formStyles.columnDetails}>
                    {report['Purpose of Visit']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Reason of DC :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {report['Reason of DC']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>ChildDC/Reason :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {report['ChildDC']}
                    {report['ChildDc']}
                  </Text>
                </View>

                {/* <Button
        type="outline"
        title="Submit"
        buttonStyle={{
          backgroundColor: '#008CBA',
          borderRadius: 50,
          marginTop: 10,
        }}
        titleStyle={{color: '#fff'}}
        title="Back to task"
        onPress={() => {
          // setActive(p => p - 1);
        }}
      /> */}
              </View>
            </View>
          </View>
          <Mainsignature name="digital" id={route.params.data.id} />
          <RatingModel name="digital" id={route.params.data.id} />
        </Card>
        <Button
          type="outline"
          buttonStyle={{
            backgroundColor: '#008CBA',
            borderRadius: 50,
            marginTop: 10,
          }}
          titleStyle={{color: '#fff'}}
          title="Complete task"
          onPress={() => {
            getLocation();
          }}
        />
      </Card>
      <MapViewDirections
        origin={checkinLat}
        destination={DetailLat}
        // destination={{latitude: lat, longitude: lng}}
        apikey={'AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0'}
        strokeWidth={3}
        strokeColor="hotpink"
        onReady={re => {
          console.log('distance', re.distance);
          console.log('distance', re.duration);
          console.log(typeof re.distance);
          let numbervalue = re.distance;
          getData().then(re => {
            db.collection('userPreDefined')
              .doc(re.name)
              .collection('attendence')
              .doc(moment(new Date()).format('MM-YYYY').toString())
              .collection('day')
              .doc(data.toString())
              .update({
                distanceTravelled: firestore.FieldValue.increment(numbervalue),
              });
          });
        }}
      />
    </ScrollView>
  );
};

export default ReportTask;

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  // inputField: {
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   height: 15,
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   fontSize: 14,
  //   color: 'black',
  // },
  // radioButton: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   paddingTop: 10,
  // },
  // errorMessage: {
  //   color: '#dc143c',
  //   fontSize: 12,
  //   paddingLeft: 15,
  // },
  formHeader: {
    // textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign: 'center',
    color: '#0264d6',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 30,
  },
  formTitle: {
    // textDecorationLine: 'underline',
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
  },
  inputField: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
  },
  inputLabel: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'normal',
  },
  radioButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginRight: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
  },
  errorMessage: {
    color: '#dc143c',
    fontSize: 12,
    paddingLeft: 15,
    fontFamily: 'Montserrat-Regular',
  },
  pickerLabel: {
    fontSize: 15,
    color: '#87949f',
    // textDecorationLine: 'underline',
    marginLeft: 10,
    // marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'normal',
  },
  picker: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
  },
  pickerPopUp: {
    // color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
  },
  submitButton: {
    backgroundColor: '#008CBA',
    borderRadius: 50,
    marginTop: 10,
  },
  submitTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },
});
const formStyles = StyleSheet.create({
  cardFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardDetail: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
  },
  columnFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  columnTitle: {
    // textDecorationLine: 'underline',
    fontFamily: 'Montserrat-SemiBold',
    // width: '45%',
    flex: 1,
  },
  columnDetails: {
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
    // width: '80%',
    flex: 1,
  },
  columnPlanTitle: {
    // textDecorationLine: 'underline',
    fontFamily: 'Montserrat-SemiBold',
    // width: '70%',
    flex: 1.4,
  },
  columnPlanDetails: {
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
    // width: '65%',
    flex: 1,
  },
});
