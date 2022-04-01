import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Input, Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements/dist/buttons/Button';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import RadioForm from 'react-native-simple-radio-button';

const formschema = yup.object({
  'Person Met': yup.string().required(),
  'New Mobile Number': yup
    .number()
    .required()
    .test('10 dgiit phone number', '10 dgiit phone number', val => {
      return `${val}`.length == 10;
    }),
  'Customer Category': yup.string().required(),
  'Online Recharge Process Explained': yup.string().required(),
  'Purpose of Visit': yup.string().required(),
  'Amount Collected': yup.number(),
  'Any New Requirement': yup.string().required(),

  'Reason of DC': yup.string(),
  'Visit type': yup.string().required(),
  // ChildDC: yup.string().required(),
});
const FillForm = ({route, navigation}) => {
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

  // console.log('idLelo', route.params.data.id);
  const db = firestore();
  const localData = useSelector(state => state.localData);
  const [datepicker, setdatepicker] = useState(false);
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
          // setlat(data.coords.latitude);
          // setlong(data.coords.longitude);
          console.log(data);
          getData()
            .then(re => {
              console.log(re);
              db.collection('compnayTed')
                .doc(re.companyName)
                .collection('uer')
                .doc(re.name)
                .collection('task')
                .doc(route.params.data.id.toString())
                .update({
                  HomelocationData: addressComponent,
                });
              console.log('in get data');
            })
            .then(() => {
              // dispatch(updateTaskListInComplete(route.params.data.id));
              // navigation.navigate('Task Form', {data: route.params.data});
            });
          // .then(setActive(p => p + 1));
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
  return (
    // <View>
    <ScrollView style={{marginBottom: 0}}>
      <Text style={styles.formHeader}>Customer Details</Text>
      <View
        style={{
          // backgroundColor: '#DCDCDC',
          padding: 10,
          marginBottom: 5,
        }}>
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
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Contact Details :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['Contact Details']}
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
          <Text style={styles.formTitle}>Technical Detail</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>CAN :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['CAN']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Parent CAN :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['Parent CAN']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Account Status :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {route.params.data['Account Status']}
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
                    {route.params.data['Monthly Rental:']}
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
                    Last mode of Recharge :-
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
              </View>
            </View>
          </View>
        </Card>
      </View>
      <View style={{padding: 0}}>
        <Formik
          initialValues={{
            'Date of Visit': '',
            'Person Met': '',
            'New Mobile Number': '',
            'Customer Category': '',
            'Online Recharge Process Explained': '',
            'Purpose of Visit': '',
            'Amount Collected': '',
            'Any New Requirement': '',
            'Reason of DC': '',
            Requirement: '',
            SubReason: '',
            'Visit type': '',
            VOC: '',
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            // actions.resetForm();
            getData()
              .then(re => {
                db.collection('compnayTed')
                  .doc(re.companyName)
                  .collection('uer')
                  .doc(re.name)
                  .collection('task')
                  .doc(route.params.data.id.toString())
                  .update({
                    ...values,
                    'Date of Visit': datefill,
                    SubReasonDate: datefill1,
                  });
              })

              .then(
                navigation.navigate('Task Report', {data: route.params.data}),
              );
          }}
          validationSchema={formschema}>
          {formikProps => (
            <View style={{padding: 10}}>
              <Text style={styles.formTitle}>Call / Visit Remark</Text>

              {datepicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={moment(new Date()).format('DD-MM-YYYY HH.mm.ss')}
                  mode="date"
                  is24Hour={true}
                  dateFormat="day month year"
                  display="spinner"
                  onChange={(e, selectedDate) => {
                    const currentDate =
                      moment(selectedDate).format('DD-MM-YYYY HH.mm.ss') ||
                      moment(new Date()).format('DD-MM-YYYY HH.mm.ss');
                    console.log(currentDate);
                    setdatepicker(!datepicker);
                    setdatefill(currentDate);
                  }}
                />
              )}
              {datepicker1 && (
                <DateTimePicker
                  testID="dateTimePicker1"
                  value={new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  dateFormat="dayofweek day month"
                  onChange={(e, selectedDate) => {
                    const currentDate =
                      moment(selectedDate).format('DD-MM-YYYY HH.mm.ss') ||
                      moment(new Date()).format('DD-MM-YYYY HH.mm.ss');
                    console.log(currentDate);
                    setdatepicker1(!datepicker1);
                    setdatefill1(currentDate);
                  }}
                />
              )}
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Date of Visit"
                label="Date of Visit"
                labelStyle={{color: '#868889'}}
                onChangeText={formikProps.handleChange('Date of Visit')}
                value={String(datefill)}
                onBlur={formikProps.handleBlur('Date of Visit')}
                disabled
                errorMessage={
                  formikProps.touched['Minutes of Meeting'] &&
                  formikProps.errors['Minutes of Meeting']
                }
              />
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                Visit type
              </Text>
              <RadioForm
                style={styles.radioButton}
                formHorizontal={true}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: 15,
                  marginRight: 10,
                  fontFamily: 'Montserrat-Regular',
                }}
                radio_props={[
                  {label: 'Call', value: 'Call'},
                  {label: 'Visit', value: 'Visit'},
                ]}
                initial={'Visit'}
                onPress={value => {
                  console.log(value);
                  formikProps.setFieldValue('Visit type', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Visit type'] &&
                  formikProps.errors['Visit type']}
              </Text>

              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                label="Person Met"
                labelStyle={{color: '#868889'}}
                placeholder="Please Enter Person Name"
                onChangeText={formikProps.handleChange('Person Met')}
                value={formikProps.values['Person Met']}
                onBlur={formikProps.handleBlur('Person Met')}
                errorMessage={
                  formikProps.touched['Person Met'] &&
                  formikProps.errors['Person Met']
                }
              />
              <Button
                type="outline"
                title={buttonGeo ? 'GEOTAG CAPTURED' : 'GEOTAG'}
                disabled={buttonGeo}
                buttonStyle={
                  buttonGeo
                    ? {
                        backgroundColor: '#FDD2BF',
                        borderRadius: 50,
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 10,
                        // marginHorizontal: 10,
                      }
                    : {
                        backgroundColor: '#B61919',
                        borderRadius: 50,
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: 10,
                      }
                }
                titleStyle={{
                  color: '#fff',
                  fontFamily: 'Montserrat-SemiBold',
                }}
                onPress={() => {
                  getLocation();

                  setbuttonGeo(true);
                }}
              />
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                label="Mobile Number"
                labelStyle={{color: '#868889'}}
                placeholder="Please Enter Mobile Number"
                onChangeText={formikProps.handleChange('New Mobile Number')}
                value={formikProps.values['New Mobile Number']}
                onBlur={formikProps.handleBlur('New Mobile Number')}
                keyboardType="numeric"
                maxLength={10}
                errorMessage={
                  formikProps.touched['New Mobile Number'] &&
                  formikProps.errors['New Mobile Number']
                }
              />
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                Customer Category
              </Text>

              <RadioForm
                style={styles.radioButton}
                formHorizontal={true}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: 15,
                  marginRight: 10,
                  fontFamily: 'Montserrat-Regular',
                }}
                radio_props={[
                  {label: 'Commercial', value: 'Commercial'},
                  {label: 'Non-Commercial', value: 'Non-Commercial'},
                ]}
                initial={'Commercial'}
                onPress={value => {
                  formikProps.setFieldValue('Customer Category', value);
                }}
              />

              <Text style={styles.errorMessage}>
                {formikProps.touched['Customer Category'] &&
                  formikProps.errors['Customer Category']}
              </Text>
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                Online Recharge Process Explained
              </Text>

              <RadioForm
                style={styles.radioButton}
                formHorizontal={true}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: 15,
                  marginRight: 10,
                  fontFamily: 'Montserrat-Regular',
                }}
                radio_props={[
                  {label: 'Yes', value: 'Yes'},
                  {label: 'NO', value: 'No'},
                ]}
                initial={'NO'}
                onPress={value => {
                  formikProps.setFieldValue(
                    'Online Recharge Process Explained',
                    value,
                  );
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Online Recharge Process Explained'] &&
                  formikProps.errors['Online Recharge Process Explained']}
              </Text>
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                Purpose of Visit
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 4,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Picker
                  style={styles.picker}
                  selectedValue={
                    formikProps.touched['Purpose of Visit'] &&
                    formikProps.values['Purpose of Visit']
                  }
                  onValueChange={formikProps.handleChange('Purpose of Visit')}
                  onBlur={formikProps.handleBlur('Purpose of Visit')}>
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Click To Select"
                    value="Click To Select"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Collection"
                    value="Collection"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Retention"
                    value="Retention"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Winback"
                    value="Winback"
                  />
                </Picker>
              </View>
              <Text style={styles.errorMessage}>
                {formikProps.touched['Purpose of Visit'] &&
                  formikProps.errors['Purpose of Visit']}
              </Text>
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                label="Amount Collected"
                labelStyle={{color: '#868889'}}
                placeholder="Please Enter Amount Collected"
                onChangeText={formikProps.handleChange('Amount Collected')}
                value={formikProps.values['Amount Collected']}
                onBlur={formikProps.handleBlur('Amount Collected')}
                keyboardType="numeric"
                errorMessage={
                  formikProps.touched['Amount Collected'] &&
                  formikProps.errors['Amount Collected']
                }
              />
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                {' '}
                Any New Requirement
              </Text>

              <RadioForm
                style={styles.radioButton}
                formHorizontal={true}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: 15,
                  marginRight: 10,
                  fontFamily: 'Montserrat-Regular',
                }}
                radio_props={[
                  {label: 'Yes', value: 'Yes'},
                  {label: 'NO', value: 'No'},
                ]}
                initial={'NO'}
                onPress={value => {
                  formikProps.setFieldValue('Any New Requirement', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Any New Requirement'] &&
                  formikProps.errors['Any New Requirement']}
              </Text>
              {formikProps.values['Any New Requirement'] === 'Yes' && (
                <Input
                  style={styles.inputField}
                  inputContainerStyle={{borderBottomColor: 'transparent'}}
                  errorStyle={{color: '#dc143c'}}
                  label="Requirement"
                  labelStyle={{color: '#868889'}}
                  placeholder="Please Enter Requirement"
                  onChangeText={formikProps.handleChange('Requirement')}
                  value={formikProps.values['Requirement']}
                  onBlur={formikProps.handleBlur('Requirement')}
                  errorMessage={
                    formikProps.touched['Requirement'] &&
                    formikProps.errors['Requirement']
                  }
                />
              )}
              {/* <Text style={styles.pickerLabel}>Reason of DC</Text> */}
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                Reason of DC
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 4,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Picker
                  style={styles.picker}
                  selectedValue={
                    formikProps.touched['Reason of DC'] &&
                    formikProps.values['Reason of DC']
                  }
                  onValueChange={formikProps.handleChange('Reason of DC')}
                  onBlur={formikProps.handleBlur('Reason of DC')}>
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Click To Select"
                    value="Click To Select"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Need Combo Offer"
                    value="Need Combo Offer"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Board exam"
                    value="Board exam"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Customer don’t want to use the services"
                    value="Customer don’t want to use the services"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Out of Station"
                    value="Out of Station"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Door Lock"
                    value="Door Lock"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Promise to Pay"
                    value="Promise to Pay"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Switched to competition/OTT"
                    value="Switched to competition/OTT"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Switched to FR/Another Location"
                    value="Switched to FR/Another Location"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Technical Issue"
                    value="Technical Issue"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Financial Issue"
                    value="Financial Issue"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Rotational Churn"
                    value="Rotational Churn"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Billing Issue"
                    value="Billing Issue"
                  />
                  <Picker.Item
                    style={styles.pickerPopUp}
                    label="Covid Crisis"
                    value="Covid Crisis"
                  />
                </Picker>
              </View>

              <Text style={styles.errorMessage}>
                {formikProps.touched['Reason of DC'] &&
                  formikProps.errors['Reason of DC']}
              </Text>

              {formikProps.values['Reason of DC'] ===
                'Customer don’t want to use the services' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      marginLeft: 10,
                      // textDecorationLine: 'underline',
                      // marginBottom: 10,
                    }}>
                    Reason
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      marginBottom: 10,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        formikProps.touched['SubReason'] &&
                        formikProps.values['SubReason']
                      }
                      onValueChange={formikProps.handleChange('SubReason')}
                      onBlur={formikProps.handleBlur('SubReason')}>
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Click To Select"
                        value="Click To Select"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Multi TV"
                        value="Multi TV"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="No Time to view"
                        value="No Time to view"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Other Priorities"
                        value="Other Priorities"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="No Reason Given"
                        value="No Reason Given"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="High Package Price"
                        value="High Package Price"
                      />
                    </Picker>
                    <Text style={styles.errorMessage}>
                      {formikProps.touched['SubReason'] &&
                        formikProps.errors['SubReason']}
                    </Text>
                  </View>
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Out of Station' && (
                <>
                  <View>
                    <Input
                      label="Pick a date"
                      style={[styles.inputField]}
                      inputContainerStyle={{borderBottomColor: 'transparent'}}
                      errorStyle={{color: '#dc143c'}}
                      labelStyle={{color: '#868889'}}
                      placeholder="Please Enter Date of Returning "
                      onChangeText={formikProps.handleChange('SubReason')}
                      value={String(datefill1)}
                      onBlur={formikProps.handleBlur('SubReason')}
                      rightIcon={
                        <Icon
                          name="calendar"
                          type="font-awesome"
                          color="#4CAF50"
                          size={26}
                          iconStyle={{margin: 10, fontSize: 40}}
                          onPress={() => {
                            setdatepicker1(!datepicker1);
                          }}
                        />
                      }
                    />
                  </View>
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Door Lock' && (
                <>
                  <Input
                    label="Pick a date"
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="Returning on"
                    labelStyle={{color: '#868889'}}
                    onChangeText={formikProps.handleChange('SubReason')}
                    value={String(datefill1)}
                    onBlur={formikProps.handleBlur('SubReason')}
                    rightIcon={
                      <Icon
                        name="calendar"
                        type="font-awesome"
                        color="#4CAF50"
                        size={26}
                        iconStyle={{paddingLeft: 10}}
                        onPress={() => {
                          setdatepicker1(!datepicker1);
                        }}
                      />
                    }
                  />
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Promise to Pay' && (
                <>
                  <Input
                    label="Pick a Date"
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="Returning on"
                    labelStyle={{color: '#868889'}}
                    onChangeText={formikProps.handleChange('SubReason')}
                    value={String(datefill1)}
                    onBlur={formikProps.handleBlur('SubReason')}
                    rightIcon={
                      <Icon
                        name="calendar"
                        type="font-awesome"
                        color="#4CAF50"
                        size={26}
                        iconStyle={{paddingLeft: 10}}
                        onPress={() => {
                          setdatepicker1(!datepicker1);
                        }}
                      />
                    }
                  />
                </>
              )}
              {formikProps.values['Reason of DC'] ===
                'Switched to competition/OTT' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      marginLeft: 10,
                      // textDecorationLine: 'underline',
                      // marginBottom: 10,
                    }}>
                    Reason
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      marginBottom: 10,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        formikProps.touched['SubReason'] &&
                        formikProps.values['SubReason']
                      }
                      onValueChange={formikProps.handleChange('SubReason')}
                      onBlur={formikProps.handleBlur('SubReason')}>
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label=" Click To Select"
                        value="Click To Select"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Multi TV"
                        value="Multi TV"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="High Package Price"
                        value="High Package Price"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Technical Issue"
                        value="Technical Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Service Issue"
                        value="Service Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Misbehavior by Field Staff"
                        value="Misbehavior by Field Staff"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Wrong Amount Collected"
                        value="Wrong Amount Collected"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Offer benefit not given"
                        value="Offer benefit not given"
                      />
                    </Picker>
                    <Text style={styles.errorMessage}>
                      {formikProps.touched['SubReason'] &&
                        formikProps.errors['SubReason']}
                    </Text>
                  </View>
                </>
              )}
              {formikProps.values['Reason of DC'] ===
                'Switched to FR/Another Location' && (
                <>
                  <Text style={styles.pickerLabel}>Reason</Text>
                  <Input
                    lable="FR/New Location Details"
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    labelStyle={{color: '#868889'}}
                    placeholder="Please Enter FR/New Location Details"
                    onChangeText={formikProps.handleChange('SubReason')}
                    value={formikProps.values['SubReason']}
                    onBlur={formikProps.handleBlur('SubReason')}
                    errorMessage={
                      formikProps.touched['SubReason'] &&
                      formikProps.errors['SubReason']
                    }
                  />
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Technical Issue' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      // textDecorationLine: 'underline',
                      marginLeft: 10,
                    }}>
                    Reason
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      marginBottom: 10,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        formikProps.touched['SubReason'] &&
                        formikProps.values['SubReason']
                      }
                      onValueChange={formikProps.handleChange('SubReason')}
                      onBlur={formikProps.handleBlur('SubReason')}>
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Click To Select"
                        value="Click To Select"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="TV Issue"
                        value="TV Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="STB Issue"
                        value="STB Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Cable Issue"
                        value="Cable Issue"
                      />
                    </Picker>
                    <Text style={styles.errorMessage}>
                      {formikProps.touched['SubReason'] &&
                        formikProps.errors['SubReason']}
                    </Text>
                  </View>
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Financial Issue' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      marginLeft: 10,
                      // textDecorationLine: 'underline',
                      // marginBottom: 10,
                    }}>
                    Reason
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      marginBottom: 10,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        formikProps.touched['SubReason'] &&
                        formikProps.values['SubReason']
                      }
                      onValueChange={formikProps.handleChange('SubReason')}
                      onBlur={formikProps.handleBlur('SubReason')}>
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Click To Select"
                        value="Click To Select"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="TV Issue"
                        value="TV Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="No Money"
                        value="No Money"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Seeking Discount"
                        value="Seeking Discount"
                      />
                    </Picker>
                    <Text style={styles.errorMessage}>
                      {formikProps.touched['SubReason'] &&
                        formikProps.errors['SubReason']}
                    </Text>
                  </View>
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Covid Crisis' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      marginLeft: 10,
                      // textDecorationLine: 'underline',
                      // marginBottom: 10,
                    }}>
                    {' '}
                    Reason
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      marginBottom: 10,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        formikProps.touched['SubReason'] &&
                        formikProps.values['SubReason']
                      }
                      onValueChange={formikProps.handleChange('SubReason')}
                      onBlur={formikProps.handleBlur('SubReason')}>
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Click To Select"
                        value="Click To Select"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="TV Issue"
                        value="TV Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Death due to Covid"
                        value="Death due to Covid"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Sick due to Covid"
                        value="Sick due to Covid"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Premises Closed (Temporary)"
                        value="Premises Closed (Temporary)"
                      />
                    </Picker>
                    <Text style={styles.errorMessage}>
                      {formikProps.touched['SubReason'] &&
                        formikProps.errors['SubReason']}
                    </Text>
                  </View>
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Rotational Churn' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      marginLeft: 10,
                      // textDecorationLine: 'underline',
                      // marginBottom: 10,
                    }}>
                    Reason
                  </Text>
                  <Input
                    label="New CAN Number"
                    style={styles.inputField}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    errorStyle={{color: '#dc143c'}}
                    placeholder="Please Enter New CAN Number"
                    onChangeText={formikProps.handleChange('SubReason')}
                    labelStyle={{color: '#868889'}}
                    onBlur={formikProps.handleBlur('SubReason')}
                    keyboardType="numeric"
                    errorMessage={
                      formikProps.touched['SubReason'] &&
                      formikProps.errors['SubReason']
                    }
                  />
                </>
              )}
              {formikProps.values['Reason of DC'] === 'Billing Issue' && (
                <>
                  <Text
                    h4
                    h4Style={{
                      fontSize: 15,
                      color: '#868889',
                      marginLeft: 10,
                      // textDecorationLine: 'underline',
                      // marginBottom: 10,
                    }}>
                    Reason
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 4,
                      marginBottom: 10,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        formikProps.touched['SubReason'] &&
                        formikProps.values['SubReason']
                      }
                      onValueChange={formikProps.handleChange('SubReason')}
                      onBlur={formikProps.handleBlur('SubReason')}>
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Click To Select"
                        value="Click To Select"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="LDR Discount pending"
                        value="LDR Discount pending"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Old Settlement Pending"
                        value="Old Settlement Pending"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="GST Issue"
                        value="GST Issue"
                      />
                      <Picker.Item
                        style={styles.pickerPopUp}
                        label="Invoice Required"
                        value="Invoice Required"
                      />
                    </Picker>
                  </View>
                  <Text style={styles.errorMessage}>
                    {formikProps.touched['SubReason'] &&
                      formikProps.errors['SubReason']}
                  </Text>
                </>
              )}
              <Input
                label="VOC"
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                labelStyle={{color: '#868889'}}
                placeholder="Please Enter VOC"
                onChangeText={formikProps.handleChange('VOC')}
                // value={formikProps.values['ChildDC']}
                onBlur={formikProps.handleBlur('VOC')}
                errorMessage={
                  formikProps.touched['VOC'] && formikProps.errors['VOC']
                }
              />
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  marginLeft: 10,
                  // textDecorationLine: 'underline',
                  // marginBottom: 10,
                }}>
                Upload Image or Video(proof to DC)
              </Text>
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
                    navigation.push('UploadImage', {
                      data: route.params.data,
                      name: 'digital',
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
                    navigation.push('UploadVideo', {
                      data: route.params.data,
                      name: 'digital',
                    });
                  }}
                />
              </View>

              <Button
                type="outline"
                title="Submit"
                buttonStyle={styles.submitButton}
                titleStyle={styles.submitTitle}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
    // </View>
  );
};

export default FillForm;

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
