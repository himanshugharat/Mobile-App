import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Stepper from 'react-native-stepper-ui';
import moment from 'moment';
import {useDispatch, useSelector, Connect} from 'react-redux';
import {updateStepperButton} from '../../store/taskAction';
import DetailTask from './stepperscreen/DetailTask';
import FillForm from './stepperscreen/FillForm';
import ReportTask from './stepperscreen/ReportTask';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import {Card, Button, Text} from 'react-native-elements';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import {Input, Icon} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import Loading from '../Loading';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
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
const formschema = yup.object({
  // title: yup.string().required().min(4),
  // body: yup.string().required().min(4),
  // rating: yup
  //   .string()
  //   .required()
  //   .test('is', 'falied', val => {
  //     return parseInt(val) < 6 && parseInt(val) > 0;
  //   }),
  // 'Minutes of Meeting': yup.number().required(),
  // 'Date of Visit': yup.string().required(),
  'Person Met': yup.string().required(),
  'New Mobile Number': yup
    .number()
    .required()
    .test('10 dgiit phone number', '10 dgiit phone number', val => {
      return parseInt(val.toString().length) == 10;
    }),
  'Customer Category': yup.string().required(),
  'Online Recharge Process Explained': yup.string().required(),
  'Purpose of Visit': yup.string().required(),
  'Amount Collected': yup.number(),
  'Any New Requirement': yup.string().required(),

  'Reason of DC': yup.string(),
  // ChildDC: yup.string().required(),
});

const GenericTaskDetails = ({route, nav}) => {
  Geocoder.init('AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0');
  // const DetailTask = props => {
  //   const updateButton = useSelector(state => state.updateButton);
  //   const dispatch = useDispatch();

  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('user');
  //       return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     } catch (e) {
  //       // error reading value
  //     }
  //   };
  //   const db = firestore();
  //   // const [lat, setlat] = useState('');
  //   // const [long, setlong] = useState('');
  //   const locationConfig = {
  //     skipPermissionRequests: false,
  //     authorizationLevel: 'whenInUse',
  //   };
  //   // async function requestPermissions() {
  //   //   await PermissionsAndroid.request(
  //   //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   //     {
  //   //       title: 'Cool Photo App Camera Permission',
  //   //       message:
  //   //         'Cool Photo App needs access to your camera ' +
  //   //         'so you can take awesome pictures.',
  //   //       buttonNeutral: 'Ask Me Later',
  //   //       buttonNegative: 'Cancel',
  //   //       buttonPositive: 'OK',
  //   //     },
  //   //   );
  //   // }

  //   const getLocation = () => {
  //     Geolocation.setRNConfiguration(locationConfig);

  //     Geolocation.getCurrentPosition(data => {
  //       Geocoder.from(
  //         data.coords.latitude.toFixed(2),
  //         data.coords.longitude.toFixed(2),
  //       ).then(
  //         json => {
  //           var addressComponent = json.results[0].address_components[0];
  //           console.log(addressComponent);
  //           // setlat(data.coords.latitude);
  //           // setlong(data.coords.longitude);
  //           console.log(data);
  //           getData().then(re => {
  //             console.log(re);
  //             db.collection('compnayTed')
  //               .doc(re.companyName)
  //               .collection('uer')
  //               .doc(re.name)
  //               .collection('task')
  //               .doc(props.data.id)
  //               .update({
  //                 startLat: data.coords.latitude,
  //                 startLong: data.coords.longitude,
  //                 startTime: data.timestamp,
  //                 'task status': 'incomplete',
  //                 locationDataLong: addressComponent.long_name,
  //                 locationDataLat: addressComponent.short_name,
  //               });
  //           });
  //           // .then(setActive(p => p + 1));
  //         },
  //         error => {
  //           console.log(
  //             'The location could not be loaded because ',
  //             error.message,
  //           ),
  //             {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000};

  //           RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
  //             interval: 10000,
  //             fastInterval: 5000,
  //           }).then();
  //         },
  //       );
  //     });
  //   };
  //   // console.log(lat, long);

  //   useEffect(() => {}, []);

  //   return (
  //     <View>
  //       {/* {!ready && <Text>loading...</Text>}
  //       {error && <Text>error</Text>}
  //       {ready && <Text>ok</Text>} */}
  //       {/* {lat && <Text>data</Text>}
  //       {long && <Text>data</Text>} */}
  //       <Card containerStyle={{padding: 1, marginRight: 0, marginLeft: 0}}>
  //         <Text
  //           h4
  //           h4Style={{
  //             // fontSize: 15,
  //             color: '#000',
  //             textDecorationLine: 'underline',
  //             margin: 10,
  //           }}>
  //           Task Information
  //         </Text>
  //         <Card>
  //           <Text
  //             h4
  //             h4Style={{
  //               fontSize: 20,
  //               color: '#000',
  //               textDecorationLine: 'underline',
  //               marginBottom: 10,
  //             }}>
  //             Subscriber Detail
  //           </Text>
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Name:
  //             </Text>
  //             &nbsp; {props.data['Name']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Contact Detail:
  //             </Text>
  //             &nbsp;{props.data['Contact Details']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Address:
  //             </Text>
  //             &nbsp;{props.data['Address']}
  //           </Text>
  //         </Card>
  //         <Card>
  //           <Text
  //             h4
  //             h4Style={{
  //               fontSize: 20,
  //               color: '#000',
  //               textDecorationLine: 'underline',
  //               marginBottom: 10,
  //             }}>
  //             Technical Detail
  //           </Text>
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Parent CAN:
  //             </Text>
  //             &nbsp;{props.data['Parent CAN']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               CAN:
  //             </Text>
  //             &nbsp; {props.data['CAN']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               STB number:
  //             </Text>
  //             &nbsp; {props.data['STB number']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Account Status: &nbsp;
  //             </Text>

  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //                 color:
  //                   props.data['Account Status'] === 'ACTIVE' ? 'green' : 'red',
  //               }}>
  //               {props.data['Account Status']}
  //             </Text>
  //           </Text>
  //         </Card>
  //         <Card>
  //           <Text
  //             h4
  //             h4Style={{
  //               fontSize: 20,
  //               color: '#000',
  //               textDecorationLine: 'underline',
  //               marginBottom: 10,
  //             }}>
  //             Plan/Recharge Detail
  //           </Text>
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Product Name:
  //             </Text>
  //             &nbsp;{props.data['Product Name']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Last mode of Recharge:
  //             </Text>
  //             &nbsp;{props.data['Last mode of Recharge']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Last recharge date:
  //             </Text>
  //             &nbsp; {props.data['Last recharge date']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Last recharge amount:
  //             </Text>
  //             &nbsp; {props.data['Last recharge amount']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Due date:
  //             </Text>
  //             &nbsp; {props.data['Due date']}
  //           </Text>
  //           <Card.Divider />

  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Amount due:
  //             </Text>
  //             &nbsp; {props.data['Amount due']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               Monthly Rental:
  //             </Text>
  //             &nbsp; {props.data['Monthly Rental']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               LDR 3M Amount:
  //             </Text>
  //             &nbsp; {props.data['LDR 3M Amount']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 10,
  //               }}>
  //               LDR 6M Amount:
  //             </Text>
  //             &nbsp; {props.data['LDR 6M Amount']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginBottom: 15,
  //               }}>
  //               LDR 12M Amount:
  //             </Text>
  //             &nbsp; {props.data['LDR 12M Amount']}
  //           </Text>
  //         </Card>
  //         {/* <Text>assigned_to:{props.data['assigned_to']}</Text>
  //         <Text>Customer Stage:{props.data['Customer Stage']}</Text> */}
  //         <Button
  //           type="outline"
  //           titleStyle={{color: '#ffffff'}}
  //           buttonStyle={{
  //             backgroundColor: '#0264d6',
  //             borderRadius: 50,
  //             width: '100%',
  //             alignSelf: 'center',
  //             marginBottom: 10,
  //             margin: 10,
  //           }}
  //           title="Start Task"
  //           onPress={() => {
  //             getLocation();
  //             setupdate(!update);
  //           }}
  //         />
  //       </Card>
  //     </View>
  //   );
  // };

  // const FillForm = props => {
  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('user');
  //       return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     } catch (e) {
  //       // error reading value
  //     }
  //   };
  //   console.log('idLelo', props.data.id);
  //   const db = firestore();
  //   const localData = useSelector(state => state.localData);
  //   const [datepicker, setdatepicker] = useState(false);
  //   const [datepicker1, setdatepicker1] = useState(false);
  //   const [datefill, setdatefill] = useState(
  //     moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
  //   );
  //   const [datefill1, setdatefill1] = useState(
  //     moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
  //   );
  //   console.log(props);
  //   return (
  //     <View>
  //       <View
  //         style={{
  //           backgroundColor: 'lightblue',
  //           marginVertical: 10,
  //           padding: 10,
  //         }}>
  //         <Text
  //           h4
  //           h4Style={{
  //             textDecorationLine: 'underline',
  //             marginBottom: 10,
  //           }}>
  //           Customer Detail
  //         </Text>

  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           placeholder="Account Status"
  //           label="Account Status"
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           disabled
  //           value={props.data['Account Status']}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Name"
  //           placeholder="Name"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           multiline
  //           value={props.data['Name']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={{
  //             borderColor: 'gray',
  //             borderWidth: 1,
  //             height: 'auto',
  //             alignItems: 'center',
  //             backgroundColor: 'white',
  //             borderRadius: 5,
  //             fontSize: 14,
  //             color: 'black',
  //           }}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Address"
  //           placeholder="Address"
  //           disabled
  //           multiline
  //           value={props.data['Address']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Amount due"
  //           placeholder="Amount due"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['Amount due']}
  //           //leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="CAN"
  //           placeholder="CAN"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['CAN']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Contact Details"
  //           placeholder="Contact Details"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['Contact Details']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         {/* <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{borderBottomColor: 'transparent'}}
  //           label="Customer Stage"
  //           placeholder="Customer Stage"
  //           disabled
  //           value={props.data['Customer Stage']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         /> */}
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Due date"
  //           placeholder="Due date"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['Due date']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="LDR 12M Amount"
  //           placeholder="LDR 12M Amount"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['LDR 12M Amount']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         {/* <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             minWidth: 100,
  //           }}
  //           label="LDR 12M Amount"
  //           placeholder="LDR 12M Amount"
  //           disabled
  //           containerStyle={{
  //             display: 'flex',
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             // justifyContent: 'space-between',
  //           }}
  //           value={props.data['LDR 12M Amount']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         /> */}
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="LDR 3M Amount"
  //           placeholder="LDR 3M Amount"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['LDR 3M Amount']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="LDR 6M Amount"
  //           placeholder="LDR 6M Amount"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['LDR 6M Amount']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             minWidth: 100,
  //           }}
  //           label="Last mode of Recharge"
  //           placeholder="Last mode of Recharge"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['Last mode of Recharge']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Last recharge amount"
  //           placeholder="Last recharge amount"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           //   // justifyContent: 'space-between',
  //           // }}
  //           value={props.data['Last recharge amount']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //         <Input
  //           style={styles.inputField}
  //           inputContainerStyle={{
  //             borderBottomColor: 'transparent',
  //             // minWidth: 100,
  //           }}
  //           label="Last recharge date"
  //           placeholder="Last recharge date"
  //           disabled
  //           // containerStyle={{
  //           //   display: 'flex',
  //           //   flexDirection: 'row',
  //           //   alignItems: 'center',
  //           // }}
  //           value={props.data['Last recharge date']}
  //           // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
  //         />
  //       </View>
  //       <View style={{padding: 10}}>
  //         <Formik
  //           initialValues={{
  //             'Minutes of Meeting': '',
  //             'Date of Visit': '',
  //             'Person Met': '',
  //             'New Mobile Number': '',
  //             'Customer Category': '',
  //             'Online Recharge Process Explained': '',
  //             'Purpose of Visit': '',
  //             'Amount Collected': '',
  //             'Any New Requirement': '',
  //             'Reason of DC': '',
  //             Requirement: '',
  //             ChildDC: '',
  //           }}
  //           onSubmit={(values, actions) => {
  //             console.log(values);
  //             // actions.resetForm();
  //             getData()
  //               .then(re => {
  //                 db.collection('compnayTed')
  //                   .doc(re.companyName)
  //                   .collection('uer')
  //                   .doc(re.name)
  //                   .collection('task')
  //                   .doc(props.data.id)
  //                   .update({
  //                     ...values,
  //                     'Date of Visit': datefill,
  //                     ChildDc: datefill1,
  //                   });
  //               })
  //               .then(setActive(p => p + 1));
  //           }}
  //           validationSchema={formschema}>
  //           {formikProps => (
  //             <View style={{marginBottom: 10}}>
  //               <Text
  //                 h4
  //                 h4Style={{
  //                   textDecorationLine: 'underline',
  //                   marginBottom: 10,
  //                 }}>
  //                 Call/Visit Remark
  //               </Text>
  //               {/* <Input
  //                 style={styles.inputField}
  //                 inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                 errorStyle={{color: '#dc143c'}}
  //                 label="Minutes of Meeting"
  //                 placeholder="minutes of meeting"
  //                 onChangeText={formikProps.handleChange('Minutes of Meeting')}
  //                 value={formikProps.values['Minutes of Meeting']}
  //                 onBlur={formikProps.handleBlur('Minutes of Meeting')}
  //                 keyboardType="numeric"
  //                 errorMessage={
  //                   formikProps.touched['Minutes of Meeting'] &&
  //                   formikProps.errors['Minutes of Meeting']
  //                 }
  //               /> */}
  //               {datepicker && (
  //                 <DateTimePicker
  //                   testID="dateTimePicker"
  //                   value={moment(new Date()).format('DD-MM-YYYY HH.mm.ss')}
  //                   mode="date"
  //                   is24Hour={true}
  //                   dateFormat="day month year"
  //                   display="spinner"
  //                   onChange={(e, selectedDate) => {
  //                     const currentDate =
  //                       moment(selectedDate).format('DD-MM-YYYY HH.mm.ss') ||
  //                       moment(new Date()).format('DD-MM-YYYY HH.mm.ss');
  //                     console.log(currentDate);
  //                     setdatepicker(!datepicker);
  //                     setdatefill(currentDate);
  //                   }}
  //                 />
  //               )}
  //               {datepicker1 && (
  //                 <DateTimePicker
  //                   testID="dateTimePicker1"
  //                   value={new Date()}
  //                   mode="date"
  //                   is24Hour={true}
  //                   display="default"
  //                   dateFormat="dayofweek day month"
  //                   onChange={(e, selectedDate) => {
  //                     const currentDate =
  //                       moment(selectedDate).format('DD-MM-YYYY HH.mm.ss') ||
  //                       moment(new Date()).format('DD-MM-YYYY HH.mm.ss');
  //                     console.log(currentDate);
  //                     setdatepicker1(!datepicker1);
  //                     setdatefill1(currentDate);
  //                   }}
  //                 />
  //               )}
  //               <Input
  //                 style={styles.inputField}
  //                 inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                 errorStyle={{color: '#dc143c'}}
  //                 placeholder="Date of Visit"
  //                 label="Date of Visit"
  //                 onChangeText={formikProps.handleChange('Date of Visit')}
  //                 value={String(datefill)}
  //                 onBlur={formikProps.handleBlur('Date of Visit')}
  //                 disabled
  //                 errorMessage={
  //                   formikProps.touched['Minutes of Meeting'] &&
  //                   formikProps.errors['Minutes of Meeting']
  //                 }
  //               />
  //               {/* <Button
  //                 type="outline"
  //                 title="Pick Date"
  //                 titleStyle={{color: '#ffffff'}}
  //                 buttonStyle={{
  //                   backgroundColor: '#4CAF50',
  //                   borderRadius: 50,
  //                   width: 150,
  //                   alignSelf: 'flex-end',
  //                 }}
  //                 onPress={() => {
  //                   setdatepicker(!datepicker);
  //                 }}
  //               /> */}

  //               <Input
  //                 style={styles.inputField}
  //                 inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                 errorStyle={{color: '#dc143c'}}
  //                 label="Person Met"
  //                 placeholder="Please Enter Person Name"
  //                 onChangeText={formikProps.handleChange('Person Met')}
  //                 value={formikProps.values['Person Met']}
  //                 onBlur={formikProps.handleBlur('Person Met')}
  //                 errorMessage={
  //                   formikProps.touched['Person Met'] &&
  //                   formikProps.errors['Person Met']
  //                 }
  //               />
  //               <Input
  //                 style={styles.inputField}
  //                 inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                 errorStyle={{color: '#dc143c'}}
  //                 label="Mobile Number"
  //                 placeholder="Please Enter Mobile Number"
  //                 onChangeText={formikProps.handleChange('New Mobile Number')}
  //                 value={formikProps.values['New Mobile Number']}
  //                 onBlur={formikProps.handleBlur('New Mobile Number')}
  //                 keyboardType="numeric"
  //                 maxLength={10}
  //                 errorMessage={
  //                   formikProps.touched['New Mobile Number'] &&
  //                   formikProps.errors['New Mobile Number']
  //                 }
  //               />
  //               <Text
  //                 h4
  //                 h4Style={{
  //                   fontSize: 15,
  //                   color: '#868889',
  //                   // textDecorationLine: 'underline',
  //                   marginLeft: 10,
  //                 }}>
  //                 Customer Category
  //               </Text>
  //               {/* <View
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'black',
  //                   borderRadius: 4,
  //                   marginLeft: 10,
  //                   marginRight: 10,
  //                 }}> */}
  //               {/* <Picker
  //                   selectedValue={
  //                     formikProps.touched['Customer Category'] &&
  //                     formikProps.values['Customer Category']
  //                   }
  //                   onValueChange={formikProps.handleChange(
  //                     'Customer Category',
  //                   )}
  //                   onBlur={formikProps.handleBlur('Customer Category')}>
  //                   <Picker.Item
  //                     label="select one option"
  //                     value="select one option"
  //                   />
  //                   <Picker.Item label="Commercial" value="Commercial" />
  //                   <Picker.Item
  //                     label="Non-Commercial"
  //                     value="Non-Commercial"
  //                   />
  //                 </Picker> */}
  //               <RadioForm
  //                 style={styles.radioButton}
  //                 formHorizontal={true}
  //                 labelHorizontal={true}
  //                 labelStyle={{fontSize: 15, marginRight: 10}}
  //                 radio_props={[
  //                   {label: 'Commercial', value: 'Commercial'},
  //                   {label: 'Non-Commercial', value: 'Non-Commercial'},
  //                 ]}
  //                 initial={'Commercial'}
  //                 onPress={value => {
  //                   formikProps.setFieldValue('Customer Category', value);
  //                 }}
  //               />
  //               {/* </View> */}
  //               <Text style={styles.errorMessage}>
  //                 {formikProps.touched['Customer Category'] &&
  //                   formikProps.errors['Customer Category']}
  //               </Text>
  //               <Text
  //                 h4
  //                 h4Style={{
  //                   fontSize: 15,
  //                   color: '#868889',
  //                   // textDecorationLine: 'underline',
  //                   marginLeft: 10,
  //                   // marginTop: 10,
  //                 }}>
  //                 Online Recharge Process Explained
  //               </Text>
  //               {/* <Picker
  //                 selectedValue={
  //                   formikProps.touched['Online Recharge Process Explained'] &&
  //                   formikProps.values['Online Recharge Process Explained']
  //                 }
  //                 onValueChange={formikProps.handleChange(
  //                   'Online Recharge Process Explained',
  //                 )}
  //                 onBlur={formikProps.handleBlur(
  //                   'Online Recharge Process Explained',
  //                 )}>
  //                 <Picker.Item
  //                   label="select one option"
  //                   value="select one option"
  //                 />
  //                 <Picker.Item label="Yes" value="Yes" />
  //                 <Picker.Item label="No" value="No" />
  //               </Picker> */}
  //               <RadioForm
  //                 style={styles.radioButton}
  //                 formHorizontal={true}
  //                 labelHorizontal={true}
  //                 labelStyle={{fontSize: 15, marginRight: 10}}
  //                 radio_props={[
  //                   {label: 'Yes', value: 'Yes'},
  //                   {label: 'NO', value: 'No'},
  //                 ]}
  //                 initial={'NO'}
  //                 onPress={value => {
  //                   formikProps.setFieldValue(
  //                     'Online Recharge Process Explained',
  //                     value,
  //                   );
  //                 }}
  //               />
  //               <Text style={styles.errorMessage}>
  //                 {formikProps.touched['Online Recharge Process Explained'] &&
  //                   formikProps.errors['Online Recharge Process Explained']}
  //               </Text>
  //               <Text
  //                 h4
  //                 h4Style={{
  //                   fontSize: 15,
  //                   color: '#868889',
  //                   // textDecorationLine: 'underline',
  //                   marginLeft: 10,
  //                 }}>
  //                 Purpose of Visit
  //               </Text>
  //               <View
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'black',
  //                   borderRadius: 4,
  //                   marginLeft: 10,
  //                   marginRight: 10,
  //                 }}>
  //                 <Picker
  //                   selectedValue={
  //                     formikProps.touched['Purpose of Visit'] &&
  //                     formikProps.values['Purpose of Visit']
  //                   }
  //                   onValueChange={formikProps.handleChange('Purpose of Visit')}
  //                   onBlur={formikProps.handleBlur('Purpose of Visit')}>
  //                   <Picker.Item
  //                     label="Click To Select"
  //                     value="Click To Select"
  //                   />
  //                   <Picker.Item label="Collection" value="Collection" />
  //                   <Picker.Item label="Retention" value="Retention" />
  //                   <Picker.Item label="Winback" value="Winback" />
  //                 </Picker>
  //               </View>
  //               <Text style={styles.errorMessage}>
  //                 {formikProps.touched['Purpose of Visit'] &&
  //                   formikProps.errors['Purpose of Visit']}
  //               </Text>
  //               <Input
  //                 style={styles.inputField}
  //                 inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                 errorStyle={{color: '#dc143c'}}
  //                 label="Amount Collected"
  //                 placeholder="Please Enter Amount Collected"
  //                 onChangeText={formikProps.handleChange('Amount Collected')}
  //                 value={formikProps.values['Amount Collected']}
  //                 onBlur={formikProps.handleBlur('Amount Collected')}
  //                 keyboardType="numeric"
  //                 errorMessage={
  //                   formikProps.touched['Amount Collected'] &&
  //                   formikProps.errors['Amount Collected']
  //                 }
  //               />
  //               <Text
  //                 h4
  //                 h4Style={{
  //                   fontSize: 15,
  //                   color: '#868889',
  //                   // textDecorationLine: 'underline',
  //                   marginLeft: 10,
  //                 }}>
  //                 Any New Requirement
  //               </Text>
  //               {/* <View
  //                 style={{borderWidth: 1, borderColor: 'black', borderRadius: 4}}>
  //                 <Picker
  //                   selectedValue={
  //                     formikProps.touched['Any New Requirement'] &&
  //                     formikProps.values['Any New Requirement']
  //                   }
  //                   onValueChange={formikProps.handleChange(
  //                     'Any New Requirement',
  //                   )}
  //                   onBlur={formikProps.handleBlur('Any New Requirement')}>
  //                   <Picker.Item
  //                     label="select one option"
  //                     value="select one option"
  //                   />
  //                   <Picker.Item label="Yes" value="Yes" />
  //                   <Picker.Item label="No" value="No" />
  //                 </Picker>
  //               </View> */}

  //               <RadioForm
  //                 style={styles.radioButton}
  //                 formHorizontal={true}
  //                 labelHorizontal={true}
  //                 labelStyle={{fontSize: 15, marginRight: 10}}
  //                 radio_props={[
  //                   {label: 'Yes', value: 'Yes'},
  //                   {label: 'NO', value: 'No'},
  //                 ]}
  //                 initial={'NO'}
  //                 onPress={value => {
  //                   formikProps.setFieldValue('Any New Requirement', value);
  //                 }}
  //               />
  //               <Text style={styles.errorMessage}>
  //                 {formikProps.touched['Any New Requirement'] &&
  //                   formikProps.errors['Any New Requirement']}
  //               </Text>
  //               {formikProps.values['Any New Requirement'] === 'Yes' && (
  //                 <Input
  //                   style={styles.inputField}
  //                   inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                   errorStyle={{color: '#dc143c'}}
  //                   label="Requirement"
  //                   placeholder="Please Enter Requirement"
  //                   onChangeText={formikProps.handleChange('Requirement')}
  //                   value={formikProps.values['Requirement']}
  //                   onBlur={formikProps.handleBlur('Requirement')}
  //                   errorMessage={
  //                     formikProps.touched['Requirement'] &&
  //                     formikProps.errors['Requirement']
  //                   }
  //                 />
  //               )}
  //               <Text
  //                 h4
  //                 h4Style={{
  //                   fontSize: 15,
  //                   color: '#868889',
  //                   // textDecorationLine: 'underline',
  //                   // marginBottom: 10,
  //                   marginLeft: 10,
  //                 }}>
  //                 Reason of DC
  //               </Text>
  //               <View
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'black',
  //                   borderRadius: 4,
  //                   marginLeft: 10,
  //                   marginRight: 10,
  //                 }}>
  //                 <Picker
  //                   // itemStyle={{
  //                   //   color: '#344953',
  //                   //   backgroundColor: 'green',
  //                   //   fontStyle: 'italic',
  //                   // }}
  //                   style={{backgroundColor: 'green'}}
  //                   selectedValue={
  //                     formikProps.touched['Reason of DC'] &&
  //                     formikProps.values['Reason of DC']
  //                   }
  //                   onValueChange={formikProps.handleChange('Reason of DC')}
  //                   onBlur={formikProps.handleBlur('Reason of DC')}>
  //                   <Picker.Item
  //                     label=" Click To Select"
  //                     value="Click To Select"
  //                   />
  //                   <Picker.Item
  //                     label="Customer don’t want to use the services"
  //                     value="Customer don’t want to use the services"
  //                   />
  //                   <Picker.Item
  //                     label="Out of Station"
  //                     value="Out of Station"
  //                   />
  //                   <Picker.Item label="Door Lock" value="Door Lock" />
  //                   <Picker.Item
  //                     label="Promise to Pay"
  //                     value="Promise to Pay"
  //                   />
  //                   <Picker.Item
  //                     label="Switched to competition/OTT"
  //                     value="Switched to competition/OTT"
  //                   />
  //                   <Picker.Item
  //                     label="Switched to FR/Another Location"
  //                     value="Switched to FR/Another Location"
  //                   />
  //                   <Picker.Item
  //                     label="Technical Issue"
  //                     value="Technical Issue"
  //                   />
  //                   <Picker.Item
  //                     label="Financial Issue"
  //                     value="Financial Issue"
  //                   />
  //                   <Picker.Item
  //                     label="Rotational Churn"
  //                     value="Rotational Churn"
  //                   />
  //                   <Picker.Item label="Billing Issue" value="Billing Issue" />
  //                   <Picker.Item label="Covid Crisis" value="Covid Crisis" />
  //                 </Picker>
  //               </View>

  //               <Text style={styles.errorMessage}>
  //                 {formikProps.touched['Reason of DC'] &&
  //                   formikProps.errors['Reason of DC']}
  //               </Text>

  //               {formikProps.values['Reason of DC'] ===
  //                 'Customer don’t want to use the services' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <View
  //                     style={{
  //                       borderWidth: 1,
  //                       borderColor: 'black',
  //                       borderRadius: 4,
  //                       marginBottom: 10,
  //                       marginLeft: 10,
  //                       marginRight: 10,
  //                     }}>
  //                     <Picker
  //                       selectedValue={
  //                         formikProps.touched['ChildDC'] &&
  //                         formikProps.values['ChildDC']
  //                       }
  //                       onValueChange={formikProps.handleChange('ChildDC')}
  //                       onBlur={formikProps.handleBlur('ChildDC')}>
  //                       <Picker.Item
  //                         label="Click To Select"
  //                         value="Click To Select"
  //                       />
  //                       <Picker.Item label="Multi TV" value="Multi TV" />
  //                       <Picker.Item
  //                         label="No Time to view"
  //                         value="No Time to view"
  //                       />
  //                       <Picker.Item
  //                         label="Other Priorities"
  //                         value="Other Priorities"
  //                       />
  //                       <Picker.Item
  //                         label="No Reason Given"
  //                         value="No Reason Given"
  //                       />
  //                       <Picker.Item
  //                         label="High Package Price"
  //                         value="High Package Price"
  //                       />
  //                     </Picker>
  //                     <Text style={styles.errorMessage}>
  //                       {formikProps.touched['ChildDC'] &&
  //                         formikProps.errors['ChildDC']}
  //                     </Text>
  //                   </View>
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Out of Station' && (
  //                 <>
  //                   {/* <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text> */}
  //                   <View>
  //                     <Input
  //                       label="Pick a date"
  //                       style={styles.inputField}
  //                       inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                       errorStyle={{color: '#dc143c'}}
  //                       placeholder="Please Enter Date of Returning "
  //                       onChangeText={formikProps.handleChange('ChildDC')}
  //                       value={String(datefill1)}
  //                       onBlur={formikProps.handleBlur('ChildDC')}
  //                       rightIcon={
  //                         <Icon
  //                           name="calendar"
  //                           type="font-awesome"
  //                           color="#f50"
  //                           iconStyle={{paddingLeft: 10}}
  //                           onPress={() => {
  //                             setdatepicker1(!datepicker1);
  //                           }}
  //                         />
  //                       }
  //                     />
  //                     {/* <Button
  //                       type="outline"
  //                       title="Pick Date"
  //                       titleStyle={{color: '#ffffff'}}
  //                       buttonStyle={{
  //                         backgroundColor: '#4CAF50',
  //                         borderRadius: 50,
  //                         width: 150,
  //                         alignSelf: 'flex-end',
  //                         marginBottom: 10,
  //                       }}
  //                       onPress={() => {
  //                         setdatepicker1(!datepicker1);
  //                       }}
  //                     /> */}
  //                   </View>
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Door Lock' && (
  //                 <>
  //                   {/* <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text> */}
  //                   <Input
  //                     label="Pick a date"
  //                     style={styles.inputField}
  //                     inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                     errorStyle={{color: '#dc143c'}}
  //                     placeholder="Returning on"
  //                     onChangeText={formikProps.handleChange('ChildDC')}
  //                     value={String(datefill1)}
  //                     onBlur={formikProps.handleBlur('ChildDC')}
  //                     rightIcon={
  //                       <Icon
  //                         name="calendar"
  //                         type="font-awesome"
  //                         color="#f50"
  //                         iconStyle={{paddingLeft: 10}}
  //                         onPress={() => {
  //                           setdatepicker1(!datepicker1);
  //                         }}
  //                       />
  //                     }
  //                   />
  //                   {/* <Button
  //                     type="outline"
  //                     title="Pick Date"
  //                     titleStyle={{color: '#ffffff'}}
  //                     buttonStyle={{
  //                       backgroundColor: '#4CAF50',
  //                       borderRadius: 50,
  //                       width: 150,
  //                       alignSelf: 'flex-end',
  //                       marginBottom: 10,
  //                     }}
  //                     onPress={() => {
  //                       setdatepicker1(!datepicker1);
  //                     }}
  //                   /> */}
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Promise to Pay' && (
  //                 <>
  //                   {/* <Text
  //                     h4
  //                     h4Style={{
  //                       // textDecorationLine: 'underline',
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text> */}
  //                   <Input
  //                     label="Pick a Date"
  //                     style={styles.inputField}
  //                     inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                     errorStyle={{color: '#dc143c'}}
  //                     placeholder="Returning on"
  //                     onChangeText={formikProps.handleChange('ChildDC')}
  //                     value={String(datefill1)}
  //                     onBlur={formikProps.handleBlur('ChildDC')}
  //                     rightIcon={
  //                       <Icon
  //                         name="calendar"
  //                         type="font-awesome"
  //                         color="#f50"
  //                         iconStyle={{paddingLeft: 10}}
  //                         onPress={() => {
  //                           setdatepicker1(!datepicker1);
  //                         }}
  //                       />
  //                     }
  //                     // rightIcon={
  //                     //   <Icon
  //                     //     name="calendar-plus-o"
  //                     //     type="font-awesome"
  //                     //     color="#f50"
  //                     //     onPress={() => setdatepicker1(!datepicker1)}
  //                     //   />
  //                     // }
  //                   />
  //                   {/* <Button
  //                     type="outline"
  //                     title="Pick Date"
  //                     titleStyle={{color: '#ffffff'}}
  //                     buttonStyle={{
  //                       backgroundColor: '#4CAF50',
  //                       borderRadius: 50,
  //                       width: 150,
  //                       alignSelf: 'flex-end',
  //                       marginBottom: 10,
  //                     }}
  //                     onPress={() => {
  //                       setdatepicker1(!datepicker1);
  //                     }}
  //                   /> */}
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] ===
  //                 'Switched to competition/OTT' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <View
  //                     style={{
  //                       borderWidth: 1,
  //                       borderColor: 'black',
  //                       borderRadius: 4,
  //                       marginBottom: 10,
  //                       marginLeft: 10,
  //                       marginRight: 10,
  //                     }}>
  //                     <Picker
  //                       selectedValue={
  //                         formikProps.touched['ChildDC'] &&
  //                         formikProps.values['ChildDC']
  //                       }
  //                       onValueChange={formikProps.handleChange('ChildDC')}
  //                       onBlur={formikProps.handleBlur('ChildDC')}>
  //                       <Picker.Item
  //                         label=" Click To Select"
  //                         value="Click To Select"
  //                       />
  //                       <Picker.Item label="Multi TV" value="Multi TV" />
  //                       <Picker.Item
  //                         label="High Package Price"
  //                         value="High Package Price"
  //                       />
  //                       <Picker.Item
  //                         label="Technical Issue"
  //                         value="Technical Issue"
  //                       />
  //                       <Picker.Item
  //                         label="Service Issue"
  //                         value="Service Issue"
  //                       />
  //                       <Picker.Item
  //                         label="Misbehavior by Field Staff"
  //                         value="Misbehavior by Field Staff"
  //                       />
  //                       <Picker.Item
  //                         label="Wrong Amount Collected"
  //                         value="Wrong Amount Collected"
  //                       />
  //                       <Picker.Item
  //                         label="Offer benefit not given"
  //                         value="Offer benefit not given"
  //                       />
  //                     </Picker>
  //                     <Text style={styles.errorMessage}>
  //                       {formikProps.touched['ChildDC'] &&
  //                         formikProps.errors['ChildDC']}
  //                     </Text>
  //                   </View>
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] ===
  //                 'Switched to FR/Another Location' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <Input
  //                     lable="FR/New Location Detail"
  //                     style={styles.inputField}
  //                     inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                     errorStyle={{color: '#dc143c'}}
  //                     placeholder="Please Enter FR/New Location Detail"
  //                     onChangeText={formikProps.handleChange('ChildDC')}
  //                     value={formikProps.values['ChildDC']}
  //                     onBlur={formikProps.handleBlur('ChildDC')}
  //                     errorMessage={
  //                       formikProps.touched['ChildDC'] &&
  //                       formikProps.errors['ChildDC']
  //                     }
  //                   />
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Technical Issue' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <View
  //                     style={{
  //                       borderWidth: 1,
  //                       borderColor: 'black',
  //                       borderRadius: 4,
  //                       marginBottom: 10,
  //                       marginLeft: 10,
  //                       marginRight: 10,
  //                     }}>
  //                     <Picker
  //                       selectedValue={
  //                         formikProps.touched['ChildDC'] &&
  //                         formikProps.values['ChildDC']
  //                       }
  //                       onValueChange={formikProps.handleChange('ChildDC')}
  //                       onBlur={formikProps.handleBlur('ChildDC')}>
  //                       <Picker.Item
  //                         label="Click To Select"
  //                         value="Click To Select"
  //                       />
  //                       <Picker.Item label="TV Issue" value="TV Issue" />
  //                       <Picker.Item label="STB Issue" value="STB Issue" />
  //                       <Picker.Item label="Cable Issue" value="Cable Issue" />
  //                     </Picker>
  //                     <Text style={styles.errorMessage}>
  //                       {formikProps.touched['ChildDC'] &&
  //                         formikProps.errors['ChildDC']}
  //                     </Text>
  //                   </View>
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Financial Issue' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <View
  //                     style={{
  //                       borderWidth: 1,
  //                       borderColor: 'black',
  //                       borderRadius: 4,
  //                       marginBottom: 10,
  //                       marginLeft: 10,
  //                       marginRight: 10,
  //                     }}>
  //                     <Picker
  //                       selectedValue={
  //                         formikProps.touched['ChildDC'] &&
  //                         formikProps.values['ChildDC']
  //                       }
  //                       onValueChange={formikProps.handleChange('ChildDC')}
  //                       onBlur={formikProps.handleBlur('ChildDC')}>
  //                       <Picker.Item
  //                         label="Click To Select"
  //                         value="Click To Select"
  //                       />
  //                       <Picker.Item label="TV Issue" value="TV Issue" />
  //                       <Picker.Item label="No Money" value="No Money" />
  //                       <Picker.Item
  //                         label="Seeking Discount"
  //                         value="Seeking Discount"
  //                       />
  //                     </Picker>
  //                     <Text style={styles.errorMessage}>
  //                       {formikProps.touched['ChildDC'] &&
  //                         formikProps.errors['ChildDC']}
  //                     </Text>
  //                   </View>
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Covid Crisis' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <View
  //                     style={{
  //                       borderWidth: 1,
  //                       borderColor: 'black',
  //                       borderRadius: 4,
  //                       marginBottom: 10,
  //                       marginLeft: 10,
  //                       marginRight: 10,
  //                     }}>
  //                     <Picker
  //                       selectedValue={
  //                         formikProps.touched['ChildDC'] &&
  //                         formikProps.values['ChildDC']
  //                       }
  //                       onValueChange={formikProps.handleChange('ChildDC')}
  //                       onBlur={formikProps.handleBlur('ChildDC')}>
  //                       <Picker.Item
  //                         label="Click To Select"
  //                         value="Click To Select"
  //                       />
  //                       <Picker.Item label="TV Issue" value="TV Issue" />
  //                       <Picker.Item
  //                         label="Death due to Covid"
  //                         value="Death due to Covid"
  //                       />
  //                       <Picker.Item
  //                         label="Sick due to Covid"
  //                         value="Sick due to Covid"
  //                       />
  //                       <Picker.Item
  //                         label="Premises Closed (Temporary)"
  //                         value="Premises Closed (Temporary)"
  //                       />
  //                     </Picker>
  //                     <Text style={styles.errorMessage}>
  //                       {formikProps.touched['ChildDC'] &&
  //                         formikProps.errors['ChildDC']}
  //                     </Text>
  //                   </View>
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Rotational Churn' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <Input
  //                     label="New CAN Number"
  //                     style={styles.inputField}
  //                     inputContainerStyle={{borderBottomColor: 'transparent'}}
  //                     errorStyle={{color: '#dc143c'}}
  //                     placeholder="Please Enter New CAN Number"
  //                     onChangeText={formikProps.handleChange('ChildDC')}
  //                     // value={formikProps.values['ChildDC']}
  //                     onBlur={formikProps.handleBlur('ChildDC')}
  //                     keyboardType="numeric"
  //                     errorMessage={
  //                       formikProps.touched['ChildDC'] &&
  //                       formikProps.errors['ChildDC']
  //                     }
  //                   />
  //                 </>
  //               )}
  //               {formikProps.values['Reason of DC'] === 'Billing Issue' && (
  //                 <>
  //                   <Text
  //                     h4
  //                     h4Style={{
  //                       fontSize: 15,
  //                       color: '#868889',
  //                       // textDecorationLine: 'underline',
  //                       marginLeft: 10,
  //                     }}>
  //                     Reason
  //                   </Text>
  //                   <View
  //                     style={{
  //                       borderWidth: 1,
  //                       borderColor: 'black',
  //                       borderRadius: 4,
  //                       marginBottom: 10,
  //                       marginLeft: 10,
  //                       marginRight: 10,
  //                     }}>
  //                     <Picker
  //                       selectedValue={
  //                         formikProps.touched['ChildDC'] &&
  //                         formikProps.values['ChildDC']
  //                       }
  //                       onValueChange={formikProps.handleChange('ChildDC')}
  //                       onBlur={formikProps.handleBlur('ChildDC')}>
  //                       <Picker.Item
  //                         label="Click To Select"
  //                         value="Click To Select"
  //                       />
  //                       <Picker.Item
  //                         label="LDR Discount pending"
  //                         value="LDR Discount pending"
  //                       />
  //                       <Picker.Item
  //                         label="Old Settlement Pending"
  //                         value="Old Settlement Pending"
  //                       />
  //                       <Picker.Item label="GST Issue" value="GST Issue" />
  //                       <Picker.Item
  //                         label="Invoice Required"
  //                         value="Invoice Required"
  //                       />
  //                     </Picker>
  //                   </View>
  //                   <Text style={styles.errorMessage}>
  //                     {formikProps.touched['ChildDC'] &&
  //                       formikProps.errors['ChildDC']}
  //                   </Text>
  //                 </>
  //               )}
  //               <Button
  //                 type="outline"
  //                 title="Submit"
  //                 buttonStyle={{
  //                   backgroundColor: '#008CBA',
  //                   borderRadius: 50,
  //                   marginTop: 10,
  //                 }}
  //                 titleStyle={{color: '#fff'}}
  //                 onPress={formikProps.handleSubmit}
  //               />
  //             </View>
  //           )}
  //         </Formik>
  //       </View>
  //     </View>
  //   );
  // };
  // const ReportTask = props => {
  //   const [report, setreport] = useState('');

  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('user');
  //       return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     } catch (e) {
  //       // error reading value
  //     }
  //   };
  //   console.log(props.data.id);
  //   const db = firestore();
  //   const [lat, setlat] = useState('');
  //   const [long, setlong] = useState('');
  //   const locationConfig = {
  //     skipPermissionRequests: false,
  //     authorizationLevel: 'whenInUse',
  //   };
  //   const getLocation = () => {
  //     Geolocation.setRNConfiguration(locationConfig);

  //     Geolocation.getCurrentPosition(data => {
  //       Geocoder.from(
  //         data.coords.latitude.toFixed(2),
  //         data.coords.longitude.toFixed(2),
  //       ).then(
  //         json => {
  //           var addressComponent = json.results[0].address_components[0];
  //           console.log(addressComponent);
  //           setlat(data.coords.latitude);
  //           setlong(data.coords.longitude);
  //           console.log(data);
  //           getData().then(re => {
  //             db.collection('compnayTed')
  //               .doc(re.companyName)
  //               .collection('uer')
  //               .doc(re.name)
  //               .collection('task')
  //               .doc(props.data.id)
  //               .update({
  //                 'Account Status': 'data',
  //                 endLat: data.coords.latitude,
  //                 endlong: data.coords.longitude,
  //                 enddate: new Date().getUTCDate(),
  //                 endtime: new Date().getTime(),
  //                 locationDataLong: addressComponent.long_name,
  //                 locationDataLat: addressComponent.short_name,
  //                 'task status': 'done',
  //               })
  //               .then(nav.navigate('Task Summary', {data1: 'update'}));
  //           });
  //         },
  //         error => {
  //           console.log(
  //             'The location could not be loaded because ',
  //             error.message,
  //           ),
  //             {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000};
  //           RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
  //             interval: 10000,
  //             fastInterval: 5000,
  //           });
  //         },
  //       );
  //     });
  //   };
  //   console.log(lat, long);
  //   useEffect(() => {
  //     getData().then(re => {
  //       db.collection('compnayTed')
  //         .doc(re.companyName)
  //         .collection('uer')
  //         .doc(re.name)
  //         .collection('task')
  //         .doc(props.data.id)
  //         .get()
  //         .then(re => {
  //           setreport(re.data());
  //           console.log(re.data());
  //         });
  //     });
  //   }, []);

  //   return (
  //     <Card>
  //       <Text
  //         h4
  //         h4Style={{
  //           fontSize: 20,
  //           color: '#000',
  //           textDecorationLine: 'underline',
  //           // marginLeft: 10,
  //           marginBottom: 10,
  //         }}>
  //         Minutes Of Meeting
  //       </Text>
  //       {!report ? (
  //         <Loading />
  //       ) : (
  //         <View>
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               Person Met:
  //             </Text>
  //             &nbsp;{report['Person Met']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               Amount Collected:
  //             </Text>
  //             &nbsp; {report['Amount Collected']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               Any New Requirement:
  //             </Text>
  //             &nbsp; {report['Any New Requirement']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               New Mobile Number:
  //             </Text>
  //             &nbsp; {report['New Mobile Number']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               Online Recharge Process Explained:
  //             </Text>
  //             &nbsp; {report['Online Recharge Process Explained']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               Purpose of Visit:
  //             </Text>
  //             &nbsp; {report['Purpose of Visit']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               Person Met:
  //             </Text>
  //             &nbsp; Reason of DC:{report['Reason of DC']}
  //           </Text>
  //           <Card.Divider />
  //           <Text>
  //             <Text
  //               h4
  //               h4Style={{
  //                 fontSize: 15,
  //                 color: '#868889',
  //                 // textDecorationLine: 'underline',
  //                 marginLeft: 10,
  //               }}>
  //               ChildDC/Reason:
  //             </Text>
  //             &nbsp; {report['ChildDC']}
  //             {report['ChildDc']}
  //           </Text>
  //         </View>
  //       )}
  //       <Button
  //         type="outline"
  //         title="Submit"
  //         buttonStyle={{
  //           backgroundColor: '#008CBA',
  //           borderRadius: 50,
  //           marginTop: 10,
  //         }}
  //         titleStyle={{color: '#fff'}}
  //         title="Complete task"
  //         onPress={() => {
  //           getLocation();
  //         }}
  //       />
  //       <Button
  //         type="outline"
  //         title="Submit"
  //         buttonStyle={{
  //           backgroundColor: '#008CBA',
  //           borderRadius: 50,
  //           marginTop: 10,
  //         }}
  //         titleStyle={{color: '#fff'}}
  //         title="Back to task"
  //         onPress={() => {
  //           setActive(p => p - 1);
  //         }}
  //       />
  //     </Card>
  //   );
  // };
  const updateButton = useSelector(state => state.updateButton);
  const [update, setupdate] = useState(true);
  console.log(updateButton);
  const dispatch = useDispatch();
  dispatch(updateStepperButton(false));
  const content = [
    <DetailTask data={route.params.data} />,
    <FillForm data={route.params.data} />,
    <ReportTask data={route.params.data} />,
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    });
    requestCameraPermission();
  }, []);
  return (
    <ScrollView>
      <View style={{marginVertical: 30, marginHorizontal: 20}}>
        <Stepper
          active={active}
          // stepStyle={{backgroundColor: 'transparent'}}
          content={content}
          onNext={() => {
            setActive(p => p + 1);
            setupdate(!update);
          }}
          onBack={() => setActive(p => p - 1)}
          onFinish={() => {
            nav.navigate('Task Summary', {data1: 'update'});
          }}
          // showButton={false}
        ></Stepper>

        {/* <BouncyCheckbox
          text="Continue next"
          onPress={isChecked => {
            setupdate(isChecked);
          }}
        /> */}
      </View>
    </ScrollView>
  );
};

export default GenericTaskDetails;

const styles = StyleSheet.create({
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
  inputField: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 14,
    color: 'black',
  },
  radioButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginRight: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  errorMessage: {
    color: '#dc143c',
    fontSize: 12,
    paddingLeft: 15,
  },
});

// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View, Alert, ScrollView} from 'react-native';
// import Stepper from 'react-native-stepper-ui';
// import {useDispatch, useSelector, Connect} from 'react-redux';
// import {updateStepperButton} from '../../store/taskAction';
// // import DetailTask from './stepperscreen/DetailTask';
// // import FillForm from './stepperscreen/FillForm';
// //import ReportTask from './stepperscreen/ReportTask';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import Geolocation from 'react-native-geolocation-service';
// import firestore from '@react-native-firebase/firestore';
// import {Card, Button, Text} from 'react-native-elements';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {Input, Icon} from 'react-native-elements';
// import {Formik} from 'formik';
// import * as yup from 'yup';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {Picker} from '@react-native-picker/picker';

// import Loading from '../Loading';

// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from 'react-native-simple-radio-button';

// const formschema = yup.object({
//   // title: yup.string().required().min(4),
//   // body: yup.string().required().min(4),
//   // rating: yup
//   //   .string()
//   //   .required()
//   //   .test('is', 'falied', val => {
//   //     return parseInt(val) < 6 && parseInt(val) > 0;
//   //   }),
//   // 'Minutes of Meeting': yup.number().required(),
//   // 'Date of Visit': yup.string().required(),
//   'Person Met': yup.string().required(),
//   'New Mobile Number': yup.number().required(),
//   'Customer Category': yup.string().required(),
//   'Online Recharge Process Explained': yup.string().required(),
//   'Purpose of Visit': yup.string().required(),
//   'Amount Collected': yup.number(),
//   'Any New Requirement': yup.string().required(),

//   'Reason of DC': yup.string().required(),
//   // ChildDC: yup.string().required(),
// });

// const GenericTaskDetails = ({route, navigation}) => {
//   console.log(route.params);
//   const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('user');
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       // error reading value
//     }
//   };
//   const db = firestore();
//   const [condition, setcondition] = useState('detail');
//   // const [lat, setlat] = useState('');
//   // const [long, setlong] = useState('');
//   const locationConfig = {
//     skipPermissionRequests: false,
//     authorizationLevel: 'whenInUse',
//   };

//   const getLocation = () => {
//     Geolocation.setRNConfiguration(locationConfig);

//     Geolocation.getCurrentPosition(
//       data => {
//         // setlat(data.coords.latitude);
//         // setlong(data.coords.longitude);
//         console.log(data);
//         Alert.alert(data);
//         getData()
//           .then(re => {
//             console.log(re);
//             db.collection('compnayTed')
//               .doc(re.companyName)
//               .collection('uer')
//               .doc(re.name)
//               .collection('task')
//               .doc(route.params.data.id)
//               .update({
//                 startLat: data.coords,
//                 startTime: data.timestamp,
//                 'task status': 'incomplete',
//               });
//           })
//           .then(setcondition('form'));
//       },
//       error => {
//         console.log('The location could not be loaded because ', error.message),
//           {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000};
//         Alert.alert(error.message);

//         RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
//           interval: 10000,
//           fastInterval: 5000,
//         }).then();
//       },
//     );
//   };
//   // console.log(lat, long);
//   //form

//   console.log('idLelo', route.params.data.id);

//   const [datepicker, setdatepicker] = useState(false);
//   const [datepicker1, setdatepicker1] = useState(false);
//   const [datefill, setdatefill] = useState(Date().slice(0, 25));
//   const [datefill1, setdatefill1] = useState(Date().slice(0, 25));
//   // console.log(props);

//   //report
//   const [report, setreport] = useState('');

//   // const getData = async () => {
//   //   try {
//   //     const jsonValue = await AsyncStorage.getItem('user');
//   //     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   //   } catch (e) {
//   //     // error reading value
//   //   }
//   // };
//   console.log(route.params.data.id);

//   const getLocation1 = () => {
//     Geolocation.setRNConfiguration(locationConfig);

//     Geolocation.getCurrentPosition(
//       data => {
//         console.log(data);
//         Alert.alert(data);
//         getData().then(re => {
//           db.collection('compnayTed')
//             .doc(re.companyName)
//             .collection('uer')
//             .doc(re.name)
//             .collection('task')
//             .doc(route.params.data.id)
//             .update({
//               'Account Status': 'data',
//               endLat: data.coords,
//               endTime: {
//                 date: new Date().getUTCDate(),
//                 time: new Date().getTime(),
//               },
//               'task status': 'done',
//             })
//             .then(navigation.navigate('Home', {data1: 'update'}));
//         });
//       },
//       error => {
//         console.log('The location could not be loaded because ', error.message),
//           {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000};
//         Alert.alert('error');
//         RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
//           interval: 10000,
//           fastInterval: 5000,
//         });
//       },
//     );
//   };
//   const getDataForm = () => {
//     getData().then(re => {
//       db.collection('compnayTed')
//         .doc(re.companyName)
//         .collection('uer')
//         .doc(re.name)
//         .collection('task')
//         .doc(route.params.data.id)
//         .get()
//         .then(re => {
//           setreport(re.data());
//           console.log(re.data());
//         });
//     });
//   };
//   // useEffect(() => {
//   //   getData().then(re => {
//   //     db.collection('compnayTed')
//   //       .doc(re.companyName)
//   //       .collection('uer')
//   //       .doc(re.name)
//   //       .collection('task')
//   //       .doc(route.params.data.id)
//   //       .get()
//   //       .then(re => {
//   //         setreport(re.data());
//   //         console.log(re.data());
//   //       });
//   //   });
//   // }, []);
//   return (
//     <ScrollView>
//       {condition === 'detail' && (
//         <Card>
//           <Text
//             h4
//             h4Style={{
//               // fontSize: 15,
//               color: '#000',
//               textDecorationLine: 'underline',
//               marginBottom: 10,
//             }}>
//             Detail task
//           </Text>
//           <Card>
//             <Text
//               h4
//               h4Style={{
//                 fontSize: 20,
//                 color: '#000',
//                 textDecorationLine: 'underline',
//                 marginBottom: 10,
//               }}>
//               Person Details
//             </Text>
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Name:
//               </Text>
//               &nbsp; {route.params.data['Name']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Contact Details:
//               </Text>
//               &nbsp;{route.params.data['Contact Details']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Address:
//               </Text>
//               &nbsp; Address:{route.params.data['Address']}
//             </Text>
//             <Card.Divider />
//           </Card>
//           <Card>
//             <Text
//               h4
//               h4Style={{
//                 fontSize: 20,
//                 color: '#000',
//                 textDecorationLine: 'underline',
//                 marginBottom: 10,
//               }}>
//               Technical Details
//             </Text>
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Parent CAN:
//               </Text>
//               &nbsp;{route.params.data['Parent CAN']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 CAN:
//               </Text>
//               &nbsp; {route.params.data['CAN']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 STB number:
//               </Text>
//               &nbsp; {route.params.data['STB number']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Account Status:
//               </Text>
//               &nbsp; {route.params.data['Account Status']}
//             </Text>
//             <Card.Divider />
//           </Card>
//           <Card>
//             <Text
//               h4
//               h4Style={{
//                 fontSize: 20,
//                 color: '#000',
//                 textDecorationLine: 'underline',
//                 marginBottom: 10,
//               }}>
//               Plan/Recharge Details
//             </Text>
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Product Name:
//               </Text>
//               &nbsp;{route.params.data['Product Name']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Last mode of Recharge:
//               </Text>
//               &nbsp;{route.params.data['Last mode of Recharge']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Last recharge date:
//               </Text>
//               &nbsp; {route.params.data['Last recharge date']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Last recharge amount:
//               </Text>
//               &nbsp; {route.params.data['Last recharge amount']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Due date:
//               </Text>
//               &nbsp; {route.params.data['Due date']}
//             </Text>
//             <Card.Divider />

//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Amount due:
//               </Text>
//               &nbsp; {route.params.data['Amount due']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 Monthly Rental:
//               </Text>
//               &nbsp; {route.params.data['Monthly Rental']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 LDR 3M Amount:
//               </Text>
//               &nbsp; {route.params.data['LDR 3M Amount']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 10,
//                 }}>
//                 LDR 6M Amount:
//               </Text>
//               &nbsp; {route.params.data['LDR 6M Amount']}
//             </Text>
//             <Card.Divider />
//             <Text>
//               <Text
//                 h4
//                 h4Style={{
//                   fontSize: 15,
//                   color: '#868889',
//                   // textDecorationLine: 'underline',
//                   marginBottom: 15,
//                 }}>
//                 LDR 12M Amount:
//               </Text>
//               &nbsp; {route.params.data['LDR 12M Amount']}
//             </Text>
//           </Card>
//           {/* <Text>assigned_to:{props.data['assigned_to']}</Text>
//           <Text>Customer Stage:{props.data['Customer Stage']}</Text> */}
//           <Button
//             type="outline"
//             titleStyle={{color: '#ffffff'}}
//             buttonStyle={{
//               backgroundColor: '#0264d6',
//               borderRadius: 50,
//               width: '100%',
//               alignSelf: 'center',
//               marginBottom: 10,
//               margin: 10,
//             }}
//             title="Start Task"
//             onPress={() => {
//               getLocation();
//               // setupdate(!update);
//             }}
//           />
//         </Card>
//       )}
//       {condition === 'form' && (
//         <>
//           <View
//             style={{
//               backgroundColor: '#DCDCDC',
//               marginVertical: 10,
//               padding: 10,
//             }}>
//             <Text
//               h4
//               h4Style={{
//                 textDecorationLine: 'underline',
//                 marginBottom: 10,
//               }}>
//               Customer Details
//             </Text>
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               placeholder="Account Status"
//               label="Account Status"
//               disabled
//               value={route.params.data['Account Status']}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Address"
//               placeholder="Address"
//               disabled
//               multiline
//               value={route.params.data['Address']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Amount due"
//               placeholder="Amount due"
//               disabled
//               value={route.params.data['Amount due']}
//               //leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="CAN"
//               placeholder="CAN"
//               disabled
//               value={route.params.data['CAN']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Contact Details"
//               placeholder="Contact Details"
//               disabled
//               value={route.params.data['Contact Details']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Customer Stage"
//               placeholder="Customer Stage"
//               disabled
//               value={route.params.data['Customer Stage']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Due date"
//               placeholder="Due date"
//               disabled
//               value={route.params.data['Due date']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="LDR 12M Amount"
//               placeholder="LDR 12M Amount"
//               disabled
//               value={route.params.data['LDR 12M Amount']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="LDR 12M Amount"
//               placeholder="LDR 12M Amount"
//               disabled
//               value={route.params.data['LDR 12M Amount']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="LDR 3M Amount"
//               placeholder="LDR 3M Amount"
//               disabled
//               value={route.params.data['LDR 3M Amount']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="LDR 6M Amount"
//               placeholder="LDR 6M Amount"
//               disabled
//               value={route.params.data['LDR 6M Amount']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Last mode of Recharge"
//               placeholder="Last mode of Recharge"
//               disabled
//               value={route.params.data['Last mode of Recharge']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Last recharge amount"
//               placeholder="Last recharge amount"
//               disabled
//               value={route.params.data['Last recharge amount']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//             <Input
//               style={styles.inputField}
//               inputContainerStyle={{borderBottomColor: 'transparent'}}
//               label="Last recharge date"
//               placeholder="Last recharge date"
//               disabled
//               value={route.params.data['Last recharge date']}
//               // leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
//             />
//           </View>
//           <View style={{padding: 10}}>
//             <Formik
//               initialValues={{
//                 'Minutes of Meeting': '',
//                 'Date of Visit': '',
//                 'Person Met': '',
//                 'New Mobile Number': '',
//                 'Customer Category': '',
//                 'Online Recharge Process Explained': '',
//                 'Purpose of Visit': '',
//                 'Amount Collected': '',
//                 'Any New Requirement': '',
//                 'Reason of DC': '',
//                 Requirement: '',
//                 ChildDc: '',
//               }}
//               onSubmit={(values, actions) => {
//                 console.log(values);
//                 actions.resetForm();
//                 getData()
//                   .then(re => {
//                     db.collection('compnayTed')
//                       .doc(re.companyName)
//                       .collection('uer')
//                       .doc(re.name)
//                       .collection('task')
//                       .doc(route.params.data.id)
//                       .update({
//                         ...values,
//                         'Date of Visit': datepicker,
//                         ChildDc: datepicker1,
//                       });
//                   })
//                   .then(setcondition('report'))
//                   .then(() => getDataForm());
//               }}
//               validationSchema={formschema}>
//               {formikProps => (
//                 <View style={{marginBottom: 10}}>
//                   <Text
//                     h4
//                     h4Style={{
//                       textDecorationLine: 'underline',
//                       marginBottom: 10,
//                     }}>
//                     Minutes of Meeting
//                   </Text>
//                   {/* <Input
//                   style={styles.inputField}
//                   inputContainerStyle={{borderBottomColor: 'transparent'}}
//                   errorStyle={{color: '#dc143c'}}
//                   label="Minutes of Meeting"
//                   placeholder="minutes of meeting"
//                   onChangeText={formikProps.handleChange('Minutes of Meeting')}
//                   value={formikProps.values['Minutes of Meeting']}
//                   onBlur={formikProps.handleBlur('Minutes of Meeting')}
//                   keyboardType="numeric"
//                   errorMessage={
//                     formikProps.touched['Minutes of Meeting'] &&
//                     formikProps.errors['Minutes of Meeting']
//                   }
//                 /> */}
//                   {datepicker && (
//                     <DateTimePicker
//                       testID="dateTimePicker"
//                       value={new Date().slice(0, 25)}
//                       mode="date"
//                       is24Hour={true}
//                       dateFormat="day month year"
//                       display="spinner"
//                       onChange={(e, selectedDate) => {
//                         const currentDate = selectedDate || new Date();
//                         console.log(currentDate);
//                         setdatepicker(!datepicker);
//                         setdatefill(currentDate.toString());
//                       }}
//                     />
//                   )}
//                   {datepicker1 && (
//                     <DateTimePicker
//                       testID="dateTimePicker1"
//                       value={new Date()}
//                       mode="date"
//                       is24Hour={true}
//                       display="default"
//                       dateFormat="dayofweek day month"
//                       onChange={(e, selectedDate) => {
//                         const currentDate = selectedDate || new Date();
//                         console.log(currentDate);
//                         setdatepicker1(!datepicker1);
//                         setdatefill1(currentDate.toString().slice(0, 25));
//                       }}
//                     />
//                   )}
//                   <Input
//                     style={styles.inputField}
//                     inputContainerStyle={{borderBottomColor: 'transparent'}}
//                     errorStyle={{color: '#dc143c'}}
//                     placeholder="Date of Visit"
//                     onChangeText={formikProps.handleChange('Date of Visit')}
//                     value={String(datefill)}
//                     onBlur={formikProps.handleBlur('Date of Visit')}
//                     errorMessage={
//                       formikProps.touched['Minutes of Meeting'] &&
//                       formikProps.errors['Minutes of Meeting']
//                     }
//                     disabled
//                   />
//                   {/* <Button
//                   type="outline"
//                   title="Pick Date"
//                   titleStyle={{color: '#ffffff'}}
//                   buttonStyle={{
//                     backgroundColor: '#4CAF50',
//                     borderRadius: 50,
//                     width: 150,
//                     alignSelf: 'flex-end',
//                   }}
//                   onPress={() => {
//                     setdatepicker(!datepicker);
//                   }}
//                 /> */}

//                   <Input
//                     style={styles.inputField}
//                     inputContainerStyle={{borderBottomColor: 'transparent'}}
//                     errorStyle={{color: '#dc143c'}}
//                     label="Person Met"
//                     placeholder="person met"
//                     onChangeText={formikProps.handleChange('Person Met')}
//                     value={formikProps.values['Person Met']}
//                     onBlur={formikProps.handleBlur('Person Met')}
//                     errorMessage={
//                       formikProps.touched['Person Met'] &&
//                       formikProps.errors['Person Met']
//                     }
//                   />
//                   <Input
//                     style={styles.inputField}
//                     inputContainerStyle={{borderBottomColor: 'transparent'}}
//                     errorStyle={{color: '#dc143c'}}
//                     label="Mobile Number"
//                     placeholder="new mobile number"
//                     onChangeText={formikProps.handleChange('New Mobile Number')}
//                     value={formikProps.values['New Mobile Number']}
//                     onBlur={formikProps.handleBlur('New Mobile Number')}
//                     keyboardType="numeric"
//                     maxLength={10}
//                     errorMessage={
//                       formikProps.touched['New Mobile Number'] &&
//                       formikProps.errors['New Mobile Number']
//                     }
//                   />
//                   <Text
//                     h4
//                     h4Style={{
//                       fontSize: 15,
//                       color: '#868889',
//                       // textDecorationLine: 'underline',
//                       marginLeft: 10,
//                     }}>
//                     Customer Category
//                   </Text>
//                   <View
//                     style={{
//                       borderWidth: 1,
//                       borderColor: 'black',
//                       borderRadius: 4,
//                       marginLeft: 10,
//                       marginRight: 10,
//                     }}>
//                     <Picker
//                       selectedValue={
//                         formikProps.touched['Customer Category'] &&
//                         formikProps.values['Customer Category']
//                       }
//                       onValueChange={formikProps.handleChange(
//                         'Customer Category',
//                       )}
//                       onBlur={formikProps.handleBlur('Customer Category')}>
//                       <Picker.Item
//                         label="select one option"
//                         value="select one option"
//                       />
//                       <Picker.Item label="Commercial" value="Commercial" />
//                       <Picker.Item
//                         label="Non-Commercial"
//                         value="Non-Commercial"
//                       />
//                     </Picker>
//                   </View>
//                   <Text style={styles.errorMessage}>
//                     {formikProps.touched['Customer Category'] &&
//                       formikProps.errors['Customer Category']}
//                   </Text>
//                   <Text
//                     h4
//                     h4Style={{
//                       fontSize: 15,
//                       color: '#868889',
//                       // textDecorationLine: 'underline',
//                       marginLeft: 10,
//                       // marginTop: 10,
//                     }}>
//                     Online Recharge Process Explained
//                   </Text>
//                   {/* <Picker
//                   selectedValue={
//                     formikProps.touched['Online Recharge Process Explained'] &&
//                     formikProps.values['Online Recharge Process Explained']
//                   }
//                   onValueChange={formikProps.handleChange(
//                     'Online Recharge Process Explained',
//                   )}
//                   onBlur={formikProps.handleBlur(
//                     'Online Recharge Process Explained',
//                   )}>
//                   <Picker.Item
//                     label="select one option"
//                     value="select one option"
//                   />
//                   <Picker.Item label="Yes" value="Yes" />
//                   <Picker.Item label="No" value="No" />
//                 </Picker> */}
//                   <RadioForm
//                     style={styles.radioButton}
//                     formHorizontal={true}
//                     labelHorizontal={true}
//                     labelStyle={{fontSize: 15, marginRight: 10}}
//                     radio_props={[
//                       {label: 'Yes', value: 'Yes'},
//                       {label: 'NO', value: 'No'},
//                     ]}
//                     initial={'NO'}
//                     onPress={value => {
//                       formikProps.setFieldValue(
//                         'Online Recharge Process Explained',
//                         value,
//                       );
//                     }}
//                   />
//                   <Text style={styles.errorMessage}>
//                     {formikProps.touched['Online Recharge Process Explained'] &&
//                       formikProps.errors['Online Recharge Process Explained']}
//                   </Text>
//                   <Text
//                     h4
//                     h4Style={{
//                       fontSize: 15,
//                       color: '#868889',
//                       // textDecorationLine: 'underline',
//                       marginLeft: 10,
//                     }}>
//                     Purpose of Visit
//                   </Text>
//                   <View
//                     style={{
//                       borderWidth: 1,
//                       borderColor: 'black',
//                       borderRadius: 4,
//                       marginLeft: 10,
//                       marginRight: 10,
//                     }}>
//                     <Picker
//                       selectedValue={
//                         formikProps.touched['Purpose of Visit'] &&
//                         formikProps.values['Purpose of Visit']
//                       }
//                       onValueChange={formikProps.handleChange(
//                         'Purpose of Visit',
//                       )}
//                       onBlur={formikProps.handleBlur('Purpose of Visit')}>
//                       <Picker.Item
//                         label="select one option"
//                         value="select one option"
//                       />
//                       <Picker.Item label="Collection" value="Collection" />
//                       <Picker.Item label="Retention" value="Retention" />
//                       <Picker.Item label="Winback" value="Winback" />
//                     </Picker>
//                   </View>
//                   <Text style={styles.errorMessage}>
//                     {formikProps.touched['Purpose of Visit'] &&
//                       formikProps.errors['Purpose of Visit']}
//                   </Text>
//                   <Input
//                     style={styles.inputField}
//                     inputContainerStyle={{borderBottomColor: 'transparent'}}
//                     errorStyle={{color: '#dc143c'}}
//                     label="Amount Collected"
//                     placeholder="amount collected"
//                     onChangeText={formikProps.handleChange('Amount Collected')}
//                     value={formikProps.values['Amount Collected']}
//                     onBlur={formikProps.handleBlur('Amount Collected')}
//                     keyboardType="numeric"
//                     errorMessage={
//                       formikProps.touched['Amount Collected'] &&
//                       formikProps.errors['Amount Collected']
//                     }
//                   />
//                   <Text
//                     h4
//                     h4Style={{
//                       fontSize: 15,
//                       color: '#868889',
//                       // textDecorationLine: 'underline',
//                       marginLeft: 10,
//                     }}>
//                     Any New Requirement
//                   </Text>
//                   {/* <View
//                   style={{borderWidth: 1, borderColor: 'black', borderRadius: 4}}>
//                   <Picker
//                     selectedValue={
//                       formikProps.touched['Any New Requirement'] &&
//                       formikProps.values['Any New Requirement']
//                     }
//                     onValueChange={formikProps.handleChange(
//                       'Any New Requirement',
//                     )}
//                     onBlur={formikProps.handleBlur('Any New Requirement')}>
//                     <Picker.Item
//                       label="select one option"
//                       value="select one option"
//                     />
//                     <Picker.Item label="Yes" value="Yes" />
//                     <Picker.Item label="No" value="No" />
//                   </Picker>
//                 </View> */}

//                   <RadioForm
//                     style={styles.radioButton}
//                     formHorizontal={true}
//                     labelHorizontal={true}
//                     labelStyle={{fontSize: 15, marginRight: 10}}
//                     radio_props={[
//                       {label: 'Yes', value: 'Yes'},
//                       {label: 'NO', value: 'No'},
//                     ]}
//                     initial={'NO'}
//                     onPress={value => {
//                       formikProps.setFieldValue('Any New Requirement', value);
//                     }}
//                   />
//                   <Text style={styles.errorMessage}>
//                     {formikProps.touched['Any New Requirement'] &&
//                       formikProps.errors['Any New Requirement']}
//                   </Text>
//                   {formikProps.values['Any New Requirement'] === 'Yes' && (
//                     <Input
//                       style={styles.inputField}
//                       inputContainerStyle={{borderBottomColor: 'transparent'}}
//                       errorStyle={{color: '#dc143c'}}
//                       label="Requirement"
//                       placeholder="Requirement"
//                       onChangeText={formikProps.handleChange('Requirement')}
//                       value={formikProps.values['Requirement']}
//                       onBlur={formikProps.handleBlur('Requirement')}
//                       errorMessage={
//                         formikProps.touched['Requirement'] &&
//                         formikProps.errors['Requirement']
//                       }
//                     />
//                   )}
//                   <Text
//                     h4
//                     h4Style={{
//                       fontSize: 15,
//                       color: '#868889',
//                       // textDecorationLine: 'underline',
//                       // marginBottom: 10,
//                       marginLeft: 10,
//                     }}>
//                     Reason of DC
//                   </Text>
//                   <View
//                     style={{
//                       borderWidth: 1,
//                       borderColor: 'black',
//                       borderRadius: 4,
//                       marginLeft: 10,
//                       marginRight: 10,
//                     }}>
//                     <Picker
//                       // itemStyle={{
//                       //   color: '#344953',
//                       //   backgroundColor: 'green',
//                       //   fontStyle: 'italic',
//                       // }}
//                       style={{backgroundColor: 'green'}}
//                       selectedValue={
//                         formikProps.touched['Reason of DC'] &&
//                         formikProps.values['Reason of DC']
//                       }
//                       onValueChange={formikProps.handleChange('Reason of DC')}
//                       onBlur={formikProps.handleBlur('Reason of DC')}>
//                       <Picker.Item
//                         label="select one option"
//                         value="select one option"
//                       />
//                       <Picker.Item
//                         label="Customer don’t want to use the services"
//                         value="Customer don’t want to use the services"
//                       />
//                       <Picker.Item
//                         label="Out of Station"
//                         value="Out of Station"
//                       />
//                       <Picker.Item label="Door Lock" value="Door Lock" />
//                       <Picker.Item
//                         label="Promise to Pay"
//                         value="Promise to Pay"
//                       />
//                       <Picker.Item
//                         label="Switched to competition/OTT"
//                         value="Switched to competition/OTT"
//                       />
//                       <Picker.Item
//                         label="Switched to FR/Another Location"
//                         value="Switched to FR/Another Location"
//                       />
//                       <Picker.Item
//                         label="Technical Issue"
//                         value="Technical Issue"
//                       />
//                       <Picker.Item
//                         label="Financial Issue"
//                         value="Financial Issue"
//                       />
//                       <Picker.Item
//                         label="Rotational Churn"
//                         value="Rotational Churn"
//                       />
//                       <Picker.Item
//                         label="Billing Issue"
//                         value="Billing Issue"
//                       />
//                       <Picker.Item label="Covid Crisis" value="Covid Crisis" />
//                     </Picker>
//                   </View>

//                   <Text style={styles.errorMessage}>
//                     {formikProps.touched['Reason of DC'] &&
//                       formikProps.errors['Reason of DC']}
//                   </Text>

//                   {formikProps.values['Reason of DC'] ===
//                     'Customer don’t want to use the services' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: 'black',
//                           borderRadius: 4,
//                           marginBottom: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                         }}>
//                         <Picker
//                           selectedValue={
//                             formikProps.touched['ChildDC'] &&
//                             formikProps.values['ChildDC']
//                           }
//                           onValueChange={formikProps.handleChange('ChildDC')}
//                           onBlur={formikProps.handleBlur('ChildDC')}>
//                           <Picker.Item
//                             label="select one option"
//                             value="select one option"
//                           />
//                           <Picker.Item label="Multi TV" value="Multi TV" />
//                           <Picker.Item
//                             label="No Time to view"
//                             value="No Time to view"
//                           />
//                           <Picker.Item
//                             label="Other Priorities"
//                             value="Other Priorities"
//                           />
//                           <Picker.Item
//                             label="No Reason Given"
//                             value="No Reason Given"
//                           />
//                           <Picker.Item
//                             label="High Package Price"
//                             value="High Package Price"
//                           />
//                         </Picker>
//                         <Text style={styles.errorMessage}>
//                           {formikProps.touched['ChildDC'] &&
//                             formikProps.errors['ChildDC']}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Out of Station' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View>
//                         <Input
//                           label="Pick a date"
//                           style={styles.inputField}
//                           inputContainerStyle={{
//                             borderBottomColor: 'transparent',
//                           }}
//                           errorStyle={{color: '#dc143c'}}
//                           placeholder="Returning on"
//                           onChangeText={formikProps.handleChange('ChildDC')}
//                           value={String(datefill1)}
//                           onBlur={formikProps.handleBlur('ChildDC')}
//                         />
//                         <Button
//                           type="outline"
//                           title="Pick Date"
//                           titleStyle={{color: '#ffffff'}}
//                           buttonStyle={{
//                             backgroundColor: '#4CAF50',
//                             borderRadius: 50,
//                             width: 150,
//                             alignSelf: 'flex-end',
//                             marginBottom: 10,
//                           }}
//                           onPress={() => {
//                             setdatepicker1(!datepicker1);
//                           }}
//                         />
//                       </View>
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Door Lock' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <Input
//                         label="Pick a date"
//                         style={styles.inputField}
//                         inputContainerStyle={{borderBottomColor: 'transparent'}}
//                         errorStyle={{color: '#dc143c'}}
//                         placeholder="Returning on"
//                         onChangeText={formikProps.handleChange('ChildDC')}
//                         value={String(datefill1)}
//                         onBlur={formikProps.handleBlur('ChildDC')}
//                       />
//                       <Button
//                         type="outline"
//                         title="Pick Date"
//                         titleStyle={{color: '#ffffff'}}
//                         buttonStyle={{
//                           backgroundColor: '#4CAF50',
//                           borderRadius: 50,
//                           width: 150,
//                           alignSelf: 'flex-end',
//                           marginBottom: 10,
//                         }}
//                         onPress={() => {
//                           setdatepicker1(!datepicker1);
//                         }}
//                       />
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Promise to Pay' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           // textDecorationLine: 'underline',
//                           fontSize: 15,
//                           color: '#868889',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <Input
//                         label="Pick a Date"
//                         style={styles.inputField}
//                         inputContainerStyle={{borderBottomColor: 'transparent'}}
//                         errorStyle={{color: '#dc143c'}}
//                         placeholder="Returning on"
//                         onChangeText={formikProps.handleChange('ChildDC')}
//                         value={String(datefill1)}
//                         onBlur={formikProps.handleBlur('ChildDC')}
//                         // rightIcon={
//                         //   <Icon
//                         //     name="calendar-plus-o"
//                         //     type="font-awesome"
//                         //     color="#f50"
//                         //     onPress={() => setdatepicker1(!datepicker1)}
//                         //   />
//                         // }
//                       />
//                       <Button
//                         type="outline"
//                         title="Pick Date"
//                         titleStyle={{color: '#ffffff'}}
//                         buttonStyle={{
//                           backgroundColor: '#4CAF50',
//                           borderRadius: 50,
//                           width: 150,
//                           alignSelf: 'flex-end',
//                           marginBottom: 10,
//                         }}
//                         onPress={() => {
//                           setdatepicker1(!datepicker1);
//                         }}
//                       />
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] ===
//                     'Switched to competition/OTT' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: 'black',
//                           borderRadius: 4,
//                           marginBottom: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                         }}>
//                         <Picker
//                           selectedValue={
//                             formikProps.touched['ChildDC'] &&
//                             formikProps.values['ChildDC']
//                           }
//                           onValueChange={formikProps.handleChange('ChildDC')}
//                           onBlur={formikProps.handleBlur('ChildDC')}>
//                           <Picker.Item
//                             label="select one option"
//                             value="select one option"
//                           />
//                           <Picker.Item label="Multi TV" value="Multi TV" />
//                           <Picker.Item
//                             label="High Package Price"
//                             value="High Package Price"
//                           />
//                           <Picker.Item
//                             label="Technical Issue"
//                             value="Technical Issue"
//                           />
//                           <Picker.Item
//                             label="Service Issue"
//                             value="Service Issue"
//                           />
//                           <Picker.Item
//                             label="Misbehavior by Field Staff"
//                             value="Misbehavior by Field Staff"
//                           />
//                           <Picker.Item
//                             label="Wrong Amount Collected"
//                             value="Wrong Amount Collected"
//                           />
//                           <Picker.Item
//                             label="Offer benefit not given"
//                             value="Offer benefit not given"
//                           />
//                         </Picker>
//                         <Text style={styles.errorMessage}>
//                           {formikProps.touched['ChildDC'] &&
//                             formikProps.errors['ChildDC']}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] ===
//                     'Switched to FR/Another Location' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <Input
//                         lable="FR/New Location Details"
//                         style={styles.inputField}
//                         inputContainerStyle={{borderBottomColor: 'transparent'}}
//                         errorStyle={{color: '#dc143c'}}
//                         placeholder="FR/New Location Details"
//                         onChangeText={formikProps.handleChange('ChildDC')}
//                         value={formikProps.values['ChildDC']}
//                         onBlur={formikProps.handleBlur('ChildDC')}
//                         errorMessage={
//                           formikProps.touched['ChildDC'] &&
//                           formikProps.errors['ChildDC']
//                         }
//                       />
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Technical Issue' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: 'black',
//                           borderRadius: 4,
//                           marginBottom: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                         }}>
//                         <Picker
//                           selectedValue={
//                             formikProps.touched['ChildDC'] &&
//                             formikProps.values['ChildDC']
//                           }
//                           onValueChange={formikProps.handleChange('ChildDC')}
//                           onBlur={formikProps.handleBlur('ChildDC')}>
//                           <Picker.Item
//                             label="select one option"
//                             value="select one option"
//                           />
//                           <Picker.Item label="TV Issue" value="TV Issue" />
//                           <Picker.Item label="STB Issue" value="STB Issue" />
//                           <Picker.Item
//                             label="Cable Issue"
//                             value="Cable Issue"
//                           />
//                         </Picker>
//                         <Text style={styles.errorMessage}>
//                           {formikProps.touched['ChildDC'] &&
//                             formikProps.errors['ChildDC']}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Financial Issue' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: 'black',
//                           borderRadius: 4,
//                           marginBottom: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                         }}>
//                         <Picker
//                           selectedValue={
//                             formikProps.touched['ChildDC'] &&
//                             formikProps.values['ChildDC']
//                           }
//                           onValueChange={formikProps.handleChange('ChildDC')}
//                           onBlur={formikProps.handleBlur('ChildDC')}>
//                           <Picker.Item
//                             label="select one option"
//                             value="select one option"
//                           />
//                           <Picker.Item label="TV Issue" value="TV Issue" />
//                           <Picker.Item label="No Money" value="No Money" />
//                           <Picker.Item
//                             label="Seeking Discount"
//                             value="Seeking Discount"
//                           />
//                         </Picker>
//                         <Text style={styles.errorMessage}>
//                           {formikProps.touched['ChildDC'] &&
//                             formikProps.errors['ChildDC']}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Covid Crisis' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: 'black',
//                           borderRadius: 4,
//                           marginBottom: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                         }}>
//                         <Picker
//                           selectedValue={
//                             formikProps.touched['ChildDC'] &&
//                             formikProps.values['ChildDC']
//                           }
//                           onValueChange={formikProps.handleChange('ChildDC')}
//                           onBlur={formikProps.handleBlur('ChildDC')}>
//                           <Picker.Item
//                             label="select one option"
//                             value="select one option"
//                           />
//                           <Picker.Item label="TV Issue" value="TV Issue" />
//                           <Picker.Item
//                             label="Death due to Covid"
//                             value="Death due to Covid"
//                           />
//                           <Picker.Item
//                             label="Sick due to Covid"
//                             value="Sick due to Covid"
//                           />
//                           <Picker.Item
//                             label="Premises Closed (Temporary)"
//                             value="Premises Closed (Temporary)"
//                           />
//                         </Picker>
//                         <Text style={styles.errorMessage}>
//                           {formikProps.touched['ChildDC'] &&
//                             formikProps.errors['ChildDC']}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] ===
//                     'Rotational Churn' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <Input
//                         label="New CAN Number"
//                         style={styles.inputField}
//                         inputContainerStyle={{borderBottomColor: 'transparent'}}
//                         errorStyle={{color: '#dc143c'}}
//                         placeholder="New CAN Number"
//                         onChangeText={formikProps.handleChange('ChildDC')}
//                         // value={formikProps.values['ChildDC']}
//                         onBlur={formikProps.handleBlur('ChildDC')}
//                         keyboardType="numeric"
//                         errorMessage={
//                           formikProps.touched['ChildDC'] &&
//                           formikProps.errors['ChildDC']
//                         }
//                       />
//                     </>
//                   )}
//                   {formikProps.values['Reason of DC'] === 'Billing Issue' && (
//                     <>
//                       <Text
//                         h4
//                         h4Style={{
//                           fontSize: 15,
//                           color: '#868889',
//                           // textDecorationLine: 'underline',
//                           marginLeft: 10,
//                         }}>
//                         Reason
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: 'black',
//                           borderRadius: 4,
//                           marginBottom: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                         }}>
//                         <Picker
//                           selectedValue={
//                             formikProps.touched['ChildDC'] &&
//                             formikProps.values['ChildDC']
//                           }
//                           onValueChange={formikProps.handleChange('ChildDC')}
//                           onBlur={formikProps.handleBlur('ChildDC')}>
//                           <Picker.Item
//                             label="select one option"
//                             value="select one option"
//                           />
//                           <Picker.Item
//                             label="LDR Discount pending"
//                             value="LDR Discount pending"
//                           />
//                           <Picker.Item
//                             label="Old Settlement Pending"
//                             value="Old Settlement Pending"
//                           />
//                           <Picker.Item label="GST Issue" value="GST Issue" />
//                           <Picker.Item
//                             label="Invoice Required"
//                             value="Invoice Required"
//                           />
//                         </Picker>
//                       </View>
//                       <Text style={styles.errorMessage}>
//                         {formikProps.touched['ChildDC'] &&
//                           formikProps.errors['ChildDC']}
//                       </Text>
//                     </>
//                   )}
//                   <Button
//                     type="outline"
//                     title="Submit"
//                     buttonStyle={{
//                       backgroundColor: '#008CBA',
//                       borderRadius: 50,
//                       marginTop: 10,
//                     }}
//                     titleStyle={{color: '#fff'}}
//                     onPress={formikProps.handleSubmit}
//                   />
//                 </View>
//               )}
//             </Formik>
//           </View>
//         </>
//       )}
//       {condition === 'report' && (
//         <Card>
//           <Text
//             h4
//             h4Style={{
//               fontSize: 20,
//               color: '#000',
//               textDecorationLine: 'underline',
//               // marginLeft: 10,
//               marginBottom: 10,
//             }}>
//             Report
//           </Text>
//           {!report ? (
//             <Loading />
//           ) : (
//             <View>
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   Person Met:
//                 </Text>
//                 &nbsp;{report['Person Met']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   Amount Collected:
//                 </Text>
//                 &nbsp; {report['Amount Collected']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   Any New Requirement:
//                 </Text>
//                 &nbsp; {report['Any New Requirement']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   New Mobile Number:
//                 </Text>
//                 &nbsp; {report['New Mobile Number']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   Online Recharge Process Explained:
//                 </Text>
//                 &nbsp; {report['Online Recharge Process Explained']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   Purpose of Visit:
//                 </Text>
//                 &nbsp; {report['Purpose of Visit']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   Person Met:
//                 </Text>
//                 &nbsp; Reason of DC:{report['Reason of DC']}
//               </Text>
//               <Card.Divider />
//               <Text>
//                 <Text
//                   h4
//                   h4Style={{
//                     fontSize: 15,
//                     color: '#868889',
//                     // textDecorationLine: 'underline',
//                     marginLeft: 10,
//                   }}>
//                   ChildDC:
//                 </Text>
//                 &nbsp; {report['ChildDC']}
//                 {report['ChildDc']}
//               </Text>
//             </View>
//           )}
//           <Button
//             type="outline"
//             title="Submit"
//             buttonStyle={{
//               backgroundColor: '#008CBA',
//               borderRadius: 50,
//               marginTop: 10,
//             }}
//             titleStyle={{color: '#fff'}}
//             title="End task"
//             onPress={() => {
//               getLocation1();
//             }}
//           />
//           <Button
//             type="outline"
//             title="Submit"
//             buttonStyle={{
//               backgroundColor: '#008CBA',
//               borderRadius: 50,
//               marginTop: 10,
//             }}
//             titleStyle={{color: '#fff'}}
//             title="Back to form"
//             onPress={() => {
//               setcondition('form');
//             }}
//           />
//         </Card>
//       )}
//     </ScrollView>
//   );
// };

// export default GenericTaskDetails;

// const styles = StyleSheet.create({
//   //inputField: {
//   //   borderColor: 'gray',
//   //   borderWidth: 1,
//   //   height: 15,
//   //   alignItems: 'center',
//   //   backgroundColor: 'white',
//   //   borderRadius: 5,
//   //   fontSize: 14,
//   //   color: 'black',
//   // },
//   // radioButton: {
//   //   display: 'flex',
//   //   justifyContent: 'center',
//   //   flexDirection: 'row',
//   //   paddingTop: 10,
//   // },
//   // errorMessage: {
//   //   color: '#dc143c',
//   //   fontSize: 12,
//   //   paddingLeft: 15,
//   // },
//   inputField: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     height: 15,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 5,
//     fontSize: 14,
//     color: 'black',
//   },
//   radioButton: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     paddingTop: 10,
//     borderColor: '#000',
//     borderRadius: 5,
//     borderWidth: 1,
//     backgroundColor: '#fff',
//     marginRight: 10,
//     marginLeft: 10,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   errorMessage: {
//     color: '#dc143c',
//     fontSize: 12,
//     paddingLeft: 15,
//   },
// });
