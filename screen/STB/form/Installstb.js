import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  Pressable,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {Card, Input, Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {Divider} from 'react-native-elements';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import ImagePickerModel from '../../addOn/ImagePickerModel';
import VideoPickerModel from '../../addOn/VideoPickerModel';
import {IconButton} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RatingModel from '../../addOn/RatingModel';
import Mainsignature from '../../addOn/Mainsignature';
import {RNCamera} from 'react-native-camera';
import CheckBox from '@react-native-community/checkbox';
import Map from './Map';
import axios from 'axios';
const formschema = yup.object({
  'Person Met': yup.string().required(),
  'Meter Reading': yup.string().required(),
  // 'stb number': yup.string().required(),

  // 'ssd number': yup.string().required(),
  // 'wifi number': yup.string().required(),
  'Engineer Comments': yup.string().required(),

  // 'New Mobile Number': yup
  //   .number()
  //   .required()
  //   .test('10 dgiit phone number', '10 dgiit phone number', val => {
  //     return `${val}`.length == 10;
  //   }),
  // 'Customer Category': yup.string().required(),
  // 'Online Recharge Process Explained': yup.string().required(),
  // 'Purpose of Visit': yup.string().required(),
  // 'Amount Collected': yup.number(),
  // 'Any New Requirement': yup.string().required(),
  // 'Reason of DC': yup.string(),
  // 'Visit type': yup.string().required(),
});
const Installstb = ({route, navigation}) => {
  Geocoder.init('AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0');
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  function onSuccess(e) {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
    if (type === 'wifi') {
      setwifi(e.data);
    } else if (type === 'ssd') {
      setssd(e.data);
    } else if (type === 'stb') {
      setstb(e.data);
    }
    console.log(e.data);
    setModalVisible(!modalVisible);
  }

  // console.log('idLelo', route.params.data.id);
  const db = firestore();
  const data = [
    {
      'Retailer Id': '#10001',
      'Retailer Name': 'Himanshu',
      id: 'Aasthlu6NZucmyecNFgO',
      task: 'antenna',
    },
    {
      'Retailer Id': '#10002',
      'Retailer Name': 'Ron',
      id: 'Aasthlu6NZucmyecNFgO',
      task: 'Installstb',
    },
    {
      'Retailer Id': '#10003',
      'Retailer Name': 'Tom',
      id: 'Aasthlu6NZucmyecNFgO',
      task: 'Technical',
    },
  ];

  const localData = useSelector(state => state.localData);
  console.log(localData);
  const [state, setstate] = useState('');
  const [type, settype] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [wifi, setwifi] = useState('');
  const [ssd, setssd] = useState('');
  const [stb, setstb] = useState('');

  const [flash, setflash] = useState(false);
  const [buttonGeo, setbuttonGeo] = useState(false);
  const [datepicker1, setdatepicker1] = useState(false);
  const [datefill, setdatefill] = useState(
    moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
  );
  const [datefill1, setdatefill1] = useState(
    moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
  );

  const getLocation = () => {
    Geolocation.setRNConfiguration(locationConfig);

    Geolocation.getCurrentPosition(data => {
      Geocoder.from(data.coords.latitude, data.coords.longitude).then(
        json => {
          console.log(json);
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);

          console.log(data);
          getData()
            .then(re => {
              console.log(re);
              db.collection('stb')
                .doc('himan')
                .collection('task')
                // .doc(re.name)
                // .collection('task')
                .doc(route.params.data.id.toString())
                .update({
                  HomelocationData: addressComponent,
                });
              console.log('in get data');
            })
            .then(() => {});
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
  const [toggleCheckBoxCable, setToggleCheckBoxCable] = useState(false);
  const [toggleCheckBoxhdmi, setToggleCheckBoxhdmi] = useState(false);
  const initateCall = () => {
    axios
      .get(
        'http://182.71.104.146:8080/CC/Asterisk/API/MB_C2C?api_key=$%ytf6876&from=9619326197&to=8879112320',
      )
      .then(re => {
        console.log(re.status);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={{padding: 10}}>
      <ScrollView>
        <Map lat={18.875401311815477} lng={72.91770787661663} />
        <Card
          containerStyle={{
            margin: 10,
            borderRadius: 15,
            borderColor: '#5DADE2',
          }}>
          <Text style={styles.formTitle}>Task Detail</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Retailer Name :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Retailer Name']}
                  </Text>
                </View>
                {/* <View style={formStyles.columnFlex}>
                <Text style={formStyles.columnPlanTitle}>Retailer Id</Text>
                <Text style={formStyles.columnPlanDetails}>
                  : &nbsp;{route.params.data['Retailer Id']}
                </Text>
              </View> */}
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Retailer Address :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {route.params.data['Retailer Address']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnPlanTitle}>
                    Call Retailer :-
                  </Text>
                  <Text style={formStyles.columnPlanDetails}>
                    {' '}
                    <Icon
                      // raised
                      style={{fontSize: 30, padding: 10}}
                      name="phone"
                      type="font-awesome"
                      color="#f50"
                      iconStyle={{fontSize: 40}}
                      onPress={() => {
                        // Linking.openURL(`tel:9999999999`);
                        initateCall();
                      }}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        <View style={{padding: 0}}>
          <Formik
            initialValues={{
              'Date of Visit': '',
              'Person Met': '',
              'stb number': stb,
              'ssd number': '',
              'wifi number': '',
              'Meter Reading': '',
              'Engineer Comments': '',
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              // // actions.resetForm();
              getLocation();
              getData()
                .then(re => {
                  db.collection('stb')
                    .doc('himan')
                    .collection('task')
                    // .doc(re.name)
                    // .collection('task')
                    .doc(route.params.data.id.toString())
                    .update({
                      ...values,
                      'stb number': stb,
                      'ssd number': ssd,
                      'wifi number': wifi,
                      'Date of Visit': datefill,
                      taskstatus: 'done',
                    })
                    .then(re => {
                      db.collection('STBinventory')
                        .doc(wifi)
                        .get()
                        .then(re => {
                          if (
                            re.data().MovementRemakrs != 'Installation done'
                          ) {
                            db.collection('STBinventory')
                              .doc(stb)
                              .update({
                                'Movement status':
                                  'Installation done at retailer',

                                'Installation done at retailer date': moment(
                                  Date(),
                                ).format('DD-MM-YYYY'),
                                'Installation done by': 'himan',
                              });
                          } else {
                            Alert.alert('lol');
                          }
                        });
                    })
                    .then(re => {
                      db.collection('STBinventory')
                        .doc(wifi)
                        .get()
                        .then(re => {
                          if (
                            re.data().MovementRemakrs != 'Installation done'
                          ) {
                            db.collection('STBinventory')
                              .doc(wifi)
                              .update({
                                MovementRemakrs:
                                  'Installation done at retailer',

                                'Installation done at retailer date': moment(
                                  Date(),
                                ).format('DD-MM-YYYY'),
                                'Installation done by': 'himan',
                              });
                          }
                        });
                    })
                    .then(re => {
                      db.collection('STBinventory')

                        .doc(wifi)
                        .get()
                        .then(re => {
                          if (
                            re.data().MovementRemakrs != 'Installation done'
                          ) {
                            db.collection('STBinventory')
                              .doc(ssd)
                              .update({
                                MovementRemakrs:
                                  'Installation done at retailer',

                                'Installation done at retailer date': moment(
                                  Date(),
                                ).format('DD-MM-YYYY'),
                                'Installation done by': 'himan',
                                'last Movement Date': moment(Date()).format(
                                  'DD-MM-YYYY',
                                ),
                              });
                          }
                        })
                        .then(re => {
                          db.collection('STBretailer')
                            .doc(route.params.data['Retailer Name'].toString())
                            .set({
                              ssd: ssd,
                              stb: stb,
                              wifi: wifi,
                              'Installation done by': 'himan',
                              'last updated Date': moment(Date()).format(
                                'DD-MM-YYYY',
                              ),
                            });
                        });
                    });
                })
                .then(re => {
                  db.collection('STBgraph')
                    .doc('installed')
                    .update({
                      ssd: firestore.FieldValue.increment(1),
                      stb: firestore.FieldValue.increment(1),
                      wifi: firestore.FieldValue.increment(1),
                    });
                })
                .then(re => {
                  db.collection('STBgraph')
                    .doc('inventory')
                    .update({
                      'Installation done at retailer':
                        firestore.FieldValue.increment(1),
                      'Received at TeamLead':
                        firestore.FieldValue.increment(-1),
                    });
                })
                .then(navigation.navigate('top'));
              //   .then(
              //     navigation.navigate('Task Report', {data: route.params.data}),
              //   );
            }}
            validationSchema={formschema}>
            {formikProps => (
              <Card
                containerStyle={{
                  margin: 10,
                  borderRadius: 15,
                  borderColor: '#5DADE2',
                }}>
                <View style={{marginBottom: 10}}>
                  <Text style={[styles.formTitle, {paddingLeft: 10}]}>
                    Call / Visit Remark
                  </Text>
                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="Date of Visit"
                    label="Date of Visit"
                    labelStyle={styles.inputLabel}
                    onChangeText={formikProps.handleChange('Date of Visit')}
                    value={String(datefill)}
                    onBlur={formikProps.handleBlur('Date of Visit')}
                    disabled
                    errorMessage={
                      formikProps.touched['Date of Visit'] &&
                      formikProps.errors['Date of Visit']
                    }
                  />

                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    label="Person Met"
                    labelStyle={styles.inputLabel}
                    placeholder="Please Enter Person Name"
                    onChangeText={formikProps.handleChange('Person Met')}
                    value={formikProps.values['Person Met']}
                    onBlur={formikProps.handleBlur('Person Met')}
                    errorMessage={
                      formikProps.touched['Person Met'] &&
                      formikProps.errors['Person Met']
                    }
                  />

                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="wifi number"
                    label="wifi number"
                    labelStyle={styles.inputLabel}
                    onChangeText={formikProps.handleChange('wifi number')}
                    onChange={formikProps.handleChange('wifi number')}
                    value={wifi}
                    onBlur={formikProps.handleBlur('wifi number')}
                    disabled
                    rightIcon={
                      <Icon
                        style={{
                          fontSize: 20,
                          // paddingVertical: 10,
                          paddingHorizontal: 5,
                        }}
                        // style={{fontSize: 40, padding: 10}}
                        name="barcode"
                        type="font-awesome"
                        color="#000"
                        // size={10}
                        iconStyle={{paddingLeft: 10}}
                        onPress={() => {
                          setModalVisible(true);
                          settype('wifi');
                        }}
                      />
                    }
                    errorMessage={
                      formikProps.touched['wifi number'] &&
                      formikProps.errors['wifi number']
                    }
                  />
                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="ssd number"
                    label="ssd number"
                    labelStyle={styles.inputLabel}
                    onChangeText={formikProps.handleChange('ssd number')}
                    value={ssd}
                    onBlur={formikProps.handleBlur('ssd number')}
                    disabled
                    rightIcon={
                      <Icon
                        style={{
                          fontSize: 20,
                          // paddingVertical: 10,
                          paddingHorizontal: 5,
                        }}
                        // style={{fontSize: 40, padding: 10}}
                        name="barcode"
                        type="font-awesome"
                        color="#000"
                        // size={10}
                        iconStyle={{paddingLeft: 10}}
                        onPress={() => {
                          setModalVisible(true);
                          settype('ssd');
                        }}
                      />
                    }
                    errorMessage={
                      formikProps.touched['ssd number'] &&
                      formikProps.errors['ssd number']
                    }
                  />
                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="stb number"
                    label="stb number"
                    labelStyle={styles.inputLabel}
                    // onChangeText={formikProps.handleChange('stb number')}
                    // onChangeText={formikProps.setFieldValue('stb number', stb)}
                    value={stb}
                    onBlur={formikProps.handleBlur('stb number')}
                    disabled
                    rightIcon={
                      <Icon
                        style={{
                          fontSize: 20,
                          // paddingVertical: 10,
                          paddingHorizontal: 5,
                        }}
                        // style={{fontSize: 40, padding: 10}}
                        name="barcode"
                        type="font-awesome"
                        color="#000"
                        // size={10}
                        iconStyle={{paddingLeft: 10}}
                        onPress={() => {
                          setModalVisible(true);
                          settype('stb');
                        }}
                      />
                    }
                    errorMessage={
                      formikProps.touched['stb number'] &&
                      formikProps.errors['stb number']
                    }
                  />
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <QRCodeScanner
                          onRead={onSuccess}
                          flashMode={
                            flash ? RNCamera.Constants.FlashMode.torch : null
                          }
                          topContent={
                            <>
                              <Icon
                                style={{fontSize: 40, padding: 10}}
                                raised
                                name="flash"
                                type="font-awesome"
                                color="#0264d6"
                                onPress={() => {
                                  // setreset(!reset);
                                  // Snackbar.show({
                                  //   text: 'reset search',
                                  //   duration: Snackbar.LENGTH_SHORT,
                                  // });
                                  setflash(!flash);
                                }}
                              />
                              <Text style={styles.centerText}>{state}</Text>
                            </>
                          }
                          bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}>
                              <Text style={styles.buttonText}>OK. Got it!</Text>
                            </TouchableOpacity>
                          }
                        />
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  {/* <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}> */}
                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    label="Meter Reading"
                    labelStyle={styles.inputLabel}
                    placeholder="Meter Reading"
                    onChangeText={formikProps.handleChange('Meter Reading')}
                    value={formikProps.values['Meter Reading']}
                    onBlur={formikProps.handleBlur('Meter Reading')}
                    keyboardType="numeric"
                    errorMessage={
                      formikProps.touched['Meter Reading'] &&
                      formikProps.errors['Meter Reading']
                    }
                    rightIcon={
                      <Icon1
                        raised
                        name="add-a-photo"
                        type="MaterialIcons"
                        color="#0264d6"
                        // style={{
                        //   fontSize: 20,
                        //   paddingVertical: 10,
                        //   paddingHorizontal: 20,
                        // }}
                        style={{
                          fontSize: 20,
                          // paddingVertical: 10,
                          paddingHorizontal: 5,
                        }}
                        onPress={() => {
                          // setreset(!reset);
                          // Snackbar.show({
                          //   text: 'reset search',
                          //   duration: Snackbar.LENGTH_SHORT,
                          // });
                          navigation.push('UploadImage', {
                            data: route.params.data,
                            name: 'stb',
                          });
                        }}
                      />
                    }
                  />
                  {/* <Text style={styles.pickerLabel}>
                  Check the item handover to customer
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBoxCable}
                    onValueChange={newValue => setToggleCheckBoxCable(newValue)}
                  />
                  <Text>Cabel</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBoxhdmi}
                    onValueChange={newValue => setToggleCheckBoxhdmi(newValue)}
                  />
                  <Text>hdmi</Text>
                </View> */}
                  {/* </View> */}
                  <Input
                    multiline
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    label="Engineer Comments"
                    labelStyle={styles.inputLabel}
                    placeholder="Engineer Comments"
                    onChangeText={formikProps.handleChange('Engineer Comments')}
                    value={formikProps.values['Engineer Comments']}
                    onBlur={formikProps.handleBlur('Engineer Comments')}
                    errorMessage={
                      formikProps.touched['Engineer Comments'] &&
                      formikProps.errors['Engineer Comments']
                    }
                  />
                  <Text style={styles.pickerLabel}>Upload Image or video</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Icon
                      style={{fontSize: 40, padding: 10}}
                      raised
                      name="camera"
                      type="font-awesome"
                      color="#0264d6"
                      onPress={() => {
                        // setreset(!reset);
                        // Snackbar.show({
                        //   text: 'reset search',
                        //   duration: Snackbar.LENGTH_SHORT,
                        // });
                        navigation.push('UploadImage', {
                          data: route.params.data,
                          name: 'stb',
                        });
                      }}
                    />
                    <Icon
                      raised
                      name="video-camera"
                      type="font-awesome"
                      color="#0264d6"
                      style={{fontSize: 40, padding: 10}}
                      onPress={() => {
                        // setreset(!reset);
                        // Snackbar.show({
                        //   text: 'reset search',
                        //   duration: Snackbar.LENGTH_SHORT,
                        // });
                        navigation.push('UploadImage', {
                          data: route.params.data,
                          name: 'stbMeter',
                        });
                      }}
                    />
                  </View>
                  <Text style={styles.pickerLabel}>Upload Signature</Text>
                  <Mainsignature />
                  <Text style={styles.pickerLabel}>Rate Engineer</Text>
                  <RatingModel />
                  {stb && ssd && wifi ? null : (
                    <Text style={{color: 'red', fontSize: 10}}>
                      NOTE: button enable once you scan all barcode
                    </Text>
                  )}
                  <Button
                    type="outline"
                    title="Submit"
                    disabled={stb && ssd && wifi ? false : true}
                    disabledStyle={{backgroundColor: 'gray'}}
                    buttonStyle={styles.submitButton}
                    titleStyle={styles.submitTitle}
                    onPress={formikProps.handleSubmit}
                  />
                </View>
              </Card>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default Installstb;

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
    color: '#5d5d5d',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    flex: 1.2,
    paddingBottom: 10,
  },
  columnPlanDetails: {
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
    // width: '65%',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
