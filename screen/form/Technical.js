import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Input, Text, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
const formsearchschema = yup.object({
  'Search CAN': yup.number().required(),
});
const formschema = yup.object({
  // 'Minutes of Meetings': yup.number().required(),
  'Person Met': yup.string().required(),
  'Contact Number': yup.number().required(),
  'Purpose of Visit': yup.string().required(),
  'Issue Resolved': yup.string().required(),
  'Amount Collected': yup.number(),
  'Mode of Payment': yup.string(),
  Remark: yup.string(),
});
const Technical = () => {
  Geocoder.init('AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0');
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };
  const db = firestore();
  const task = useSelector(state => state.task);
  const [userfetch, setuserfetch] = useState(null);
  //   db.collection('userCollection').add({
  //     'Parent CAN': '1000',
  //     CAN: '100',
  //     'STB Number': '10000',
  //     'Account Status': 'active',
  //     'Product Name': 'bal bala',
  //     'Due Date': '2-4-2021',
  //     'Customer Name': 'Himan',
  //     'Contact Details': '9969393638',
  //   });
  return (
    <ScrollView>
      <Formik
        initialValues={{
          'Search CAN': '',
          //   'Customer Type': '',
          //   CAN: '',
          //   'Customer Name': '',
          //   Address: '',
          //   'Contact Number': '',
          //   'Box Type': '',
          //   'Plan Explained': '',
          //   'Using Broadband': '',
          //   'Operator Name': '',
          //   'Monthly Rental': '',
          //   'Sale Closed': '',
          //   'Amount Collected': '',
          //   'Mode of Payment': '',
          //   Remark: '',
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          // db.collection('userCollection')
          //   .where('CAN', '==', values['Search CAN'])
          //   .get()
          //   .then(re => {
          //     if (re.docs.length > 0) {
          //       re.forEach(re => {
          //         setuserfetch(re.data());
          //       });
          //     } else {
          //       Snackbar.show({
          //         text: 'no can found',
          //         duration: Snackbar.LENGTH_SHORT,
          //       });
          //     }
          //   });
          var data = task.filter(re => re['CAN'] === values['Search CAN']);
          setuserfetch(data[0]);
          actions.resetForm();
        }}
        validationSchema={formsearchschema}>
        {formikProps => (
          <View>
            <Input
              style={styles.searchField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              errorStyle={{color: '#dc143c'}}
              placeholder="Search CAN"
              onChangeText={formikProps.handleChange('Search CAN')}
              value={formikProps.values['Search CAN']}
              onBlur={formikProps.handleBlur('Search CAN')}
              keyboardType="numeric"
              errorMessage={
                formikProps.touched['Search CAN'] &&
                formikProps.errors['Search CAN']
              }
              rightIcon={
                <Icon
                  name="search"
                  type="font-awesome"
                  color="#f50"
                  onPress={formikProps.handleSubmit}
                />
              }
              keyboardType={'numeric'}
            />
            {/* <Text>
              {formikProps.touched['Search CAN'] &&
                formikProps.errors['Search CAN']}
            </Text> */}
            {/* <Button
              title="Search"
              buttonStyle={{
                backgroundColor: '#000',
                borderRadius: 50,
                width: 200,
                alignSelf: 'center',
              }}
              onPress={formikProps.handleSubmit}
            /> */}
          </View>
        )}
      </Formik>

      {userfetch && (
        <>
          <Text
            h4
            h4Style={{
              fontSize: 35,
              color: '#000',
              textDecorationLine: 'underline',
              margin: 20,
              textAlign: 'center',
            }}>
            Technical Form
          </Text>
          <View
            style={{backgroundColor: '#DCDCDC', padding: 10, marginTop: 10}}>
            <Text
              h4
              h4Style={{
                textDecorationLine: 'underline',
                marginBottom: 10,
              }}>
              Customer Details
            </Text>
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Parent CAN"
              value={userfetch['Parent CAN']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="CAN"
              value={userfetch['CAN']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="STB Number"
              value={userfetch['STB number']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Account Status"
              value={userfetch['Account Status']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Product Name"
              value={userfetch['Product Name']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Due Date"
              value={userfetch['Due date']}
              disabled
            />

            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Customer Name"
              value={userfetch['Name']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Contact Details"
              value={userfetch['Contact Details']}
              disabled
            />
            <Input
              style={styles.inputField}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              label="Address"
              value={userfetch['Address']}
              disabled
            />
          </View>
        </>
      )}
      {userfetch && (
        <Formik
          initialValues={{
            // 'Minutes of Meetings': '',
            'Person Met': '',
            'Contact Number': '',
            'Purpose of Visit': '',
            'Issue Resolved': '',
            'Amount Collected': '',
            'Mode of Payment': '',
            Remark: '',
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            //   db.collection('userCollection')
            //     .where('CAN', '==', values['Search CAN'])
            //     .get()
            //     .then(re => {
            //       if (re.docs.length > 0) {
            //         re.forEach(re => {
            //           setuserfetch(re.data());
            //         });
            //       } else {
            //         Snackbar.show({
            //           text: 'no can found',
            //           duration: Snackbar.LENGTH_SHORT,
            //         });
            //       }
            //     });

            Geolocation.setRNConfiguration(locationConfig);

            Geolocation.getCurrentPosition(data => {
              Geocoder.from(
                data.coords.latitude.toFixed(2),
                data.coords.longitude.toFixed(2),
              ).then(
                json => {
                  var addressComponent = json.results[0].address_components[0];
                  console.log(addressComponent);
                  // setlat(data.coords.latitude);
                  // setlong(data.coords.longitude);
                  console.log(data);
                  var dbform = db.collection('technicalForm').doc();
                  dbform
                    .set({
                      ...values,
                      id: dbform.id,
                      ...userfetch,
                      lat: data.coords.latitude,
                      long: data.coords.longitude,
                      date: new Date().getTime(),
                      locationDataLong: addressComponent.long_name,
                      locationDataLat: addressComponent.short_name,
                    })
                    .then(
                      Snackbar.show({
                        text: 'Successfully submited',
                        duration: Snackbar.LENGTH_SHORT,
                      }),
                    )
                    .then(setuserfetch(null));
                },
                error => {
                  console.log(
                    'The location could not be loaded because ',
                    error.message,
                  ),
                    {
                      enableHighAccuracy: false,
                      timeout: 20000,
                      maximumAge: 1000,
                    };
                  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                    interval: 10000,
                    fastInterval: 5000,
                  }).then();
                },
              );
              actions.resetForm();
            });
            // var dbform = db.collection('technicalForm').doc();
            // dbform
            //   .set({
            //     ...values,
            //     id: dbform.id,
            //     ...userfetch,
            //   })
            //   .then(
            //     Snackbar.show({
            //       text: 'Successfully submited',
            //       duration: Snackbar.LENGTH_SHORT,
            //     }),
            //   )
            //   .then(setuserfetch(null));
          }}
          validationSchema={formschema}>
          {formikProps => (
            <View style={{padding: 10}}>
              <Text
                h4
                h4Style={{
                  fontSize: 25,
                  color: '#000',
                  textDecorationLine: 'underline',
                  margin: 10,
                  // textAlign: 'center',
                }}>
                Minutes of Meetings
              </Text>
              {/* <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Minutes of Meetings"
                onChangeText={formikProps.handleChange('Minutes of Meetings')}
                value={formikProps.values['Minutes of Meetings']}
                onBlur={formikProps.handleBlur('Minutes of Meetings')}
                keyboardType="numeric"
                errorMessage={
                  formikProps.touched['Minutes of Meetings'] &&
                  formikProps.errors['Minutes of Meetings']
                }
              /> */}
              {/* <Text>
                {formikProps.touched['Minutes of Meetings'] &&
                  formikProps.errors['Minutes of Meetings']}
              </Text> */}
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Person Met"
                label="Person Met"
                onChangeText={formikProps.handleChange('Person Met')}
                value={formikProps.values['Person Met']}
                onBlur={formikProps.handleBlur('Person Met')}
                errorMessage={
                  formikProps.touched['Person Met'] &&
                  formikProps.errors['Person Met']
                }
              />
              {/* <Text>
                {formikProps.touched['Person Met'] &&
                  formikProps.errors['Person Met']}
              </Text> */}
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Contact Number"
                label="Contact Number"
                maxLength={10}
                keyboardType="numeric"
                onChangeText={formikProps.handleChange('Contact Number')}
                value={formikProps.values['Contact Number']}
                onBlur={formikProps.handleBlur('Contact Number')}
                errorMessage={
                  formikProps.touched['Contact Number'] &&
                  formikProps.errors['Contact Number']
                }
              />
              {/* <Text>
                {formikProps.touched['Contact Number'] &&
                  formikProps.errors['Contact Number']}
              </Text> */}
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  // textDecorationLine: 'underline',
                  marginLeft: 10,
                  // marginTop: 10,
                }}>
                Purpose of Visit
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 4,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Picker
                  selectedValue={
                    formikProps.touched['Purpose of Visit'] &&
                    formikProps.values['Purpose of Visit']
                  }
                  onValueChange={formikProps.handleChange('Purpose of Visit')}
                  onBlur={formikProps.handleBlur('Purpose of Visit')}>
                  <Picker.Item
                    label="select one option"
                    value="select one option"
                  />
                  <Picker.Item
                    label="New Installation"
                    value="New Installation"
                  />
                  <Picker.Item
                    label="Box Replacement"
                    value="Box Replacement"
                  />
                  <Picker.Item label="No Signal" value="No Signal" />
                  <Picker.Item
                    label="Smart Card Not Insert"
                    value="Smart Card Not Insert"
                  />
                  <Picker.Item
                    label="STB Not Initiate"
                    value="STB Not Initiate"
                  />
                  <Picker.Item
                    label="Channel Not Subscribed"
                    value="Channel Not Subscribed"
                  />
                  <Picker.Item label="STB Expired" value="STB Expired" />
                  <Picker.Item label="STB Suspended" value="STB Suspended" />
                </Picker>
              </View>
              <Text style={styles.errorMessage}>
                {formikProps.touched['Purpose of Visit'] &&
                  formikProps.errors['Purpose of Visit']}
              </Text>
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  // textDecorationLine: 'underline',
                  marginLeft: 10,
                  // marginTop: 10,
                }}>
                Issue Resolved
              </Text>

              {/* <Picker
                selectedValue={
                  formikProps.touched['Issue Resolved'] &&
                  formikProps.values['Issue Resolved']
                }
                onValueChange={formikProps.handleChange('Issue Resolved')}
                onBlur={formikProps.handleBlur('Issue Resolved')}>
                <Picker.Item
                  label="select one option"
                  value="select one option"
                />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker> */}
              <RadioForm
                style={styles.radioButton}
                radio_props={[
                  {label: 'Yes ', value: 'Yes'},
                  {label: 'No', value: 'No'},
                ]}
                initial={'No'}
                onPress={value => {
                  formikProps.setFieldValue('Issue Resolved', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Issue Resolved'] &&
                  formikProps.errors['Issue Resolved']}
              </Text>
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Amount Collected"
                label="Amount Collected"
                onChangeText={formikProps.handleChange('Amount Collected')}
                value={formikProps.values['Amount Collected']}
                onBlur={formikProps.handleBlur('Amount Collected')}
                errorMessage={
                  formikProps.touched['Amount Collected'] &&
                  formikProps.errors['Amount Collected']
                }
              />
              {/* <Text>
                {formikProps.touched['Amount Collected'] &&
                  formikProps.errors['Amount Collected']}
              </Text> */}
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  // textDecorationLine: 'underline',
                  marginLeft: 10,
                  // marginTop: 10,
                }}>
                Mode of Payment
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 4,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Picker
                  selectedValue={
                    formikProps.touched['Mode of Payment'] &&
                    formikProps.values['Mode of Payment']
                  }
                  onValueChange={formikProps.handleChange('Mode of Payment')}
                  onBlur={formikProps.handleBlur('Mode of Payment')}>
                  <Picker.Item
                    label="select one option"
                    value="select one option"
                  />
                  <Picker.Item label="Cash" value="Cash" />
                  <Picker.Item label="Cheque" value="Cheque" />
                  <Picker.Item label="Online" value="Online" />
                </Picker>
              </View>
              <Text style={styles.errorMessage}>
                {formikProps.touched['Mode of Payment'] &&
                  formikProps.errors['Mode of Payment']}
              </Text>
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Remark"
                label="Remark"
                onChangeText={formikProps.handleChange('Remark')}
                value={formikProps.values['Remark']}
                onBlur={formikProps.handleBlur('Remark')}
                errorMessage={
                  formikProps.touched['Remark'] && formikProps.errors['Remark']
                }
              />
              {/* <Text>
                {formikProps.touched['Remark'] && formikProps.errors['Remark']}
              </Text> */}
              <Button
                type="outline"
                title="Submit"
                buttonStyle={{
                  backgroundColor: '#008CBA',
                  borderRadius: 50,
                }}
                titleStyle={{color: 'black'}}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      )}
    </ScrollView>
  );
};

export default Technical;

const styles = StyleSheet.create({
  searchField: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 14,
    color: 'black',
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
    padding: 10,
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
