import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import moment from 'moment';

import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import {Card} from 'react-native-elements';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateTaskListInComplete} from '../../../store/taskAction';
import Geocoder from 'react-native-geocoding';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import axios from 'axios';
import Map from '../../STB/form/Map';
import MapViewDirections from 'react-native-maps-directions';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'CloudFos Location Permission',
        message: 'cloudFos needs access to your Location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const DetailTask = ({route, navigation}) => {
  Geocoder.init('AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0');
  const updateButton = useSelector(state => state.updateButton);
  const dispatch = useDispatch();
  useEffect(() => {
    getData('latLng').then(re => console.log(re));
  }, []);
  const setData = async data => {
    await AsyncStorage.setItem('detailLatLng', JSON.stringify(data));
  };
  const getData = async type => {
    try {
      const jsonValue = await AsyncStorage.getItem(type);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  const db = firestore();
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };

  const getLocation = () => {
    Geolocation.setRNConfiguration(locationConfig);

    Geolocation.getCurrentPosition(data => {
      Geocoder.from(data.coords.latitude, data.coords.longitude).then(
        json => {
          console.log(json);
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          console.log(data);

          getData('user')
            .then(re => {
              console.log(re);
              db.collection('compnayTed')
                .doc(re.companyName)
                .collection('uer')
                .doc(re.name)
                .collection('task')
                .doc(route.params.data.id.toString())
                .update({
                  startLat: data.coords.latitude,
                  startLong: data.coords.longitude,
                  StartDatetime: moment().format('DD-MM-YYYY HH:mm:ss'),
                  'task status': 'incomplete',
                  StartlocationData: addressComponent,
                });
              setData({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
              });
              console.log('in get data');
            })
            .then(() => {
              dispatch(updateTaskListInComplete(route.params.data.id));
              navigation.navigate('Task Form', {data: route.params.data});
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
  const initateCall = async (to, from) => {
    try {
      console.log(
        `http://182.76.59.106:8080/CC/Asterisk/API/MB_C2C?api_key=crm_click2cal@88555&from=${route.params.data['Contact Details']}&to=${route.params.data['Users_Mobile']}`,
      );

      await axios
        .get(
          `http://182.76.59.106:8080/CC/Asterisk/API/MB_C2C?api_key=crm_click2cal@88555&from=${route.params.data['Contact Details']}&to=${route.params.data['Users_Mobile']}`,
        )

        .then(re => {
          if (re.data.message == 'Call Initiated Successfully') {
            console.log(re.data.message);
            console.log(re.status);
            console.log();
            console.log('to', route.params.data['Contact Details']);
            console.log('form', route.params.data['Users_Mobile']);
            Alert.alert('connecting to server ');
          } else {
            Alert.alert('Local');
            Linking.openURL(`tel:${route.params.data['Contact Details']}`);
          }
        })
        .catch(err => {
          Linking.openURL(`tel:${route.params.data['Contact Details']}`);
          Alert.alert('catch');
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    });
    requestCameraPermission();
  }, []);

  return (
    <ScrollView style={styles.main}>
      <View style={{backgroundColor: '#DCDCDC', marginVertical: 5, padding: 5}}>
        <Text style={styles.formHeader}>Task Information</Text>
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 15,
            borderColor: '#5DADE2',
          }}>
          <Text style={styles.formTitle}>Subscriber Detail</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Name :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['Name']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Address :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['Address']}
                  </Text>
                </View>
                {route.params.data['Users_Mobile'] && (
                  <>
                    <View style={formStyles.columnFlex}>
                      <Text style={formStyles.columnTitle}>
                        Contact Details :-
                      </Text>
                      <Text style={formStyles.columnDetails}>
                        {route.params.data['Contact Details']}
                        &nbsp;&nbsp;&nbsp;
                        <Icon
                          // raised
                          small
                          name="phone"
                          type="font-awesome"
                          color="#f50"
                          iconStyle={{fontSize: 20}}
                          onPress={() => {
                            getData('user').then(re => {
                              console.log(re.phone);
                              initateCall(
                                route.params.data['Contact Details'],
                                route.params.data['Users_Mobile'],
                              );
                            });

                            getData('user').then(re => {
                              console.log(re);
                              db.collection('compnayTed')
                                .doc(re.companyName)
                                .collection('uer')
                                .doc(re.name)
                                .collection('task')
                                .doc(route.params.data.id.toString())
                                .update({
                                  CallClickTIme: moment(new Date()).format(
                                    'DD-MM-YYYY HH:mm:ss',
                                  ),
                                });
                              db.collection('callLog')
                                .doc(re.companyName)
                                .collection('uer')
                                .doc(re.name)
                                .collection(
                                  moment(new Date()).format('DD-MM-YYYY'),
                                )
                                .add({
                                  CAN: route.params.data.id.toString(),
                                  CallClickTIme: moment(new Date()).format(
                                    'DD-MM-YYYY HH:mm:ss',
                                  ),
                                });
                              console.log(
                                moment(new Date()).format(
                                  'DD-MM-YYYY HH:mm:ss',
                                ),
                              );
                            });
                          }}
                        />
                      </Text>
                    </View>
                    <View style={formStyles.columnFlex}>
                      <Text style={formStyles.columnTitle}>
                        Product Name :-
                      </Text>
                      <Text style={formStyles.columnDetails}>
                        {route.params.data['Product Name']}
                      </Text>
                    </View>
                  </>
                )}
                {!route.params.data['Users_Mobile'] && (
                  <>
                    <View style={formStyles.columnFlex}>
                      <Text style={formStyles.columnTitle}>
                        Contact Details :-
                      </Text>
                      <Text style={formStyles.columnDetails}>
                        {route.params.data['Contact Details']}
                        &nbsp;&nbsp;&nbsp;
                        <Icon
                          // raised
                          small
                          name="phone"
                          type="font-awesome"
                          color="#f50"
                          iconStyle={{fontSize: 20}}
                          onPress={() => {
                            Linking.openURL(
                              `tel:${route.params.data['Contact Details']}`,
                            );
                            getData('user').then(re => {
                              console.log(re);
                              db.collection('compnayTed')
                                .doc(re.companyName)
                                .collection('uer')
                                .doc(re.name)
                                .collection('task')
                                .doc(route.params.data.id.toString())
                                .update({
                                  CallClickTIme: moment(new Date()).format(
                                    'DD-MM-YYYY HH:mm:ss',
                                  ),
                                });
                              db.collection('callLog')
                                .doc(re.companyName)
                                .collection('uer')
                                .doc(re.name)
                                .collection(
                                  moment(new Date()).format('DD-MM-YYYY'),
                                )
                                .add({
                                  CAN: route.params.data.id.toString(),
                                  CallClickTIme: moment(new Date()).format(
                                    'DD-MM-YYYY HH:mm:ss',
                                  ),
                                });
                              console.log(
                                moment(new Date()).format(
                                  'DD-MM-YYYY HH:mm:ss',
                                ),
                              );
                            });
                          }}
                        />
                      </Text>
                    </View>
                    <View style={formStyles.columnFlex}>
                      <Text style={formStyles.columnTitle}>
                        Product Name :-
                      </Text>
                      <Text style={formStyles.columnDetails}>
                        {route.params.data['Product Name']}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </Card>
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 15,
            borderColor: '#5DADE2',
          }}>
          <Text style={styles.formTitle}>Technical Detail</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Parent CAN :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['Parent CAN']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>CAN :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['CAN']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>STB number :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['STB number']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Account Status :-</Text>
                  <Text style={formStyles.columnDetails}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#868889',
                        marginBottom: 10,
                        fontFamily: 'Montserrat-Bold',
                        color:
                          route.params.data['Account Status'] === 'ACTIVE'
                            ? 'green'
                            : 'red',
                      }}>
                      {route.params.data['Account Status']}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 15,
            borderColor: '#5DADE2',
          }}>
          <Text style={styles.formTitle}>Plan / Recharge Detail</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Monthly Rental :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Monthly Rental']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    LDR 12M Amount :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['LDR 12M Amount']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    LDR 6M Amount :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['LDR 6M Amount']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    LDR 3M Amount :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['LDR 3M Amount']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Last mode of Recharge:-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Last mode of Recharge']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Last recharge amount :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Last recharge amount']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Last recharge date :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Last recharge date']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>Due Date :-</Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Due date']}
                  </Text>
                </View>

                {/* <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>Amount due :-</Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Amount due']}
                  </Text>
                </View> */}
              </View>
            </View>
          </View>
        </Card>
      </View>
      <Button
        type="outline"
        title="Start Task"
        buttonStyle={{
          backgroundColor: '#0264d6',
          borderRadius: 50,
          width: '100%',
          alignSelf: 'center',
          marginBottom: 10,
          margin: 10,
        }}
        titleStyle={{color: '#fff', fontFamily: 'Montserrat-SemiBold'}}
        onPress={() => {
          getLocation();
        }}
      />

      {/* <MapViewDirections
        origin={{latitude: 22.193703, longitude: 72.941939}}
        destination={{latitude: 18.96459, longitude: 72.962402}}
        // destination={{latitude: lat, longitude: lng}}
        apikey={'AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0'}
        strokeWidth={3}
        strokeColor="hotpink"
        onReady={re => {
          console.log('distance', re.distance);
          console.log('distance', re.duration);
        }}
      /> */}
    </ScrollView>
  );
};

export default DetailTask;
const styles = StyleSheet.create({
  main: {
    padding: 10,
  },

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
