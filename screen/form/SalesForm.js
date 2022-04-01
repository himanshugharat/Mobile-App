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
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeArea} from 'react-native-safe-area-context';
import Geocoder from 'react-native-geocoding';

const formschema = yup.object({
  'Customer Type': yup.string().required(),
  CAN: yup.number(),
  'Customer Name': yup.string().required().min(4),
  Address: yup.string().required(),
  'Contact Number': yup.number().required(),
  'Box Type': yup.string().required(),
  'Plan Explained': yup.string().required(),
  'Using Broadband': yup.string().required(),
  'Operator Name': yup.string().required(),
  'Monthly Rental': yup.number().required(),
  'Sale Closed': yup.string().required(),
  'Amount Collected': yup.number(),
  'Mode of Payment': yup.string(),
  Remark: yup.string(),
});
const SalesForm = () => {
  Geocoder.init('AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0');
  const insets = useSafeArea();
  const [lat, setlat] = useState('');
  const [long, setlong] = useState('');
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };
  // Geocoder.from({lat: 29.920523, lng: 77.550674})
  //   .then(json => {
  //     var addressComponent = json.results[0].address_components[0];
  //     console.log(addressComponent);
  //   })
  //   .catch(error => console.warn(error));

  const db = firestore();
  return (
    <SafeAreaView>
      <ScrollView
        style={[styles.container, {paddingTop: insets.top}]}
        keyboardShouldPersistTaps="handled">
        <Text
          h4
          h4Style={{
            fontSize: 35,
            color: '#000',
            textDecorationLine: 'underline',
            margin: 20,
            textAlign: 'center',
          }}>
          Sales Form
        </Text>
        <Formik
          initialValues={{
            'Customer Type': '',
            CAN: '',
            'Customer Name': '',
            Address: '',
            'Contact Number': '',
            'Box Type': '',
            'Plan Explained': '',
            'Using Broadband': '',
            'Operator Name': '',
            'Monthly Rental': '',
            'Sale Closed': '',
            'Amount Collected': '',
            'Mode of Payment': '',
            Remark: '',
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.resetForm();
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
                  var dbform = db.collection('salesForm').doc();
                  dbform
                    .set({
                      ...values,
                      id: dbform.id,
                      lat: data.coords.latitude,
                      long: data.coords.longitude,
                      locationDataLong: addressComponent.long_name,
                      locationDataLat: addressComponent.short_name,
                    })
                    .then(
                      Snackbar.show({
                        text: 'Successfully submited',
                        duration: Snackbar.LENGTH_SHORT,
                      }),
                    );
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
            });
          }}
          validationSchema={formschema}>
          {formikProps => (
            <View>
              <Text
                h4
                h4Style={{
                  fontSize: 15,
                  color: '#868889',
                  // textDecorationLine: 'underline',
                  marginLeft: 10,
                  // marginTop: 10,
                }}>
                Customer Type
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
                    formikProps.touched['Customer Type'] &&
                    formikProps.values['Customer Type']
                  }
                  onValueChange={formikProps.handleChange('Customer Type')}
                  onBlur={formikProps.handleBlur('Customer Type')}>
                  <Picker.Item
                    label="select one option"
                    value="select one option"
                  />
                  <Picker.Item label="New" value="New" />
                  <Picker.Item label="Existing" value="Existing" />
                </Picker>
              </View>
              <Text style={styles.errorMessage}>
                {formikProps.touched['Customer Type'] &&
                  formikProps.errors['Customer Type']}
              </Text>
              {/* <Text>Customer Type</Text>
            <Picker
              selectedValue={
                formikProps.touched['Customer Type'] &&
                formikProps.values['Customer Type']
              }
              onValueChange={formikProps.handleChange('Customer Type')}>
              <Picker.Item
                label="select one option"
                value="select one option"
              />
              <Picker.Item label="active" value="active" />
              <Picker.Item label="old" value="old" />
            </Picker> */}
              {formikProps.values['Customer Type'] === 'Existing' && (
                <>
                  <Input
                    style={styles.inputField}
                    inputContainerStyle={{
                      borderBottomColor: 'transparent',
                    }}
                    errorStyle={styles.errorMessage}
                    labelStyle={styles.inputLabel}
                    placeholder="CAN"
                    label="CAN"
                    onChangeText={formikProps.handleChange('CAN')}
                    value={formikProps.touched.CAN && formikProps.values.CAN}
                    onBlur={formikProps.handleBlur('CAN')}
                    keyboardType="numeric"
                    errorMessage={
                      formikProps.touched.CAN && formikProps.errors.CAN
                    }
                  />
                  {/* <Text>
                    {formikProps.touched.CAN && formikProps.errors.CAN}
                  </Text> */}
                </>
              )}
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={styles.errorMessage}
                labelStyle={styles.inputLabel}
                label="Customer Name"
                placeholder="Customer Name"
                onChangeText={formikProps.handleChange('Customer Name')}
                value={
                  formikProps.touched['Customer Name'] &&
                  formikProps.values['Customer Name']
                }
                onBlur={formikProps.handleBlur('Customer Name')}
                errorMessage={
                  formikProps.touched['Customer Name'] &&
                  formikProps.errors['Customer Name']
                }
              />
              {/* // <Text>
            //   {formikProps.touched['Customer Name'] &&
            //     formikProps.errors['Customer Name']}
            // </Text> */}
              <Input
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  // height: 15,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  fontSize: 14,
                  color: 'black',
                  padding: 10,
                }}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={styles.errorMessage}
                labelStyle={styles.inputLabel}
                placeholder="Address"
                label="Address"
                onChangeText={formikProps.handleChange('Address')}
                value={
                  formikProps.touched['Address'] &&
                  formikProps.values['Address']
                }
                onBlur={formikProps.handleBlur('Address')}
                errorMessage={
                  formikProps.touched['Address'] &&
                  formikProps.errors['Address']
                }
                multiline
              />
              {/* <Text>
              {formikProps.touched['Address'] && formikProps.errors['Address']}
            </Text> */}
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Contact Number"
                label="Contact Number"
                maxLength={10}
                onChangeText={formikProps.handleChange('Contact Number')}
                value={
                  formikProps.touched['Contact Number'] &&
                  formikProps.values['Contact Number']
                }
                onBlur={formikProps.handleBlur('Contact Number')}
                keyboardType="numeric"
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
                Type
              </Text>

              {/* <Picker
              selectedValue={
                formikProps.touched['Box Type'] &&
                formikProps.values['Box Type']
              }
              onValueChange={formikProps.handleChange('Box Type')}
              onBlur={formikProps.handleBlur('Box Type')}>
              <Picker.Item
                label="select one option"
                value="select one option"
              />
              <Picker.Item label="HD" value="HD" />
              <Picker.Item label="SD" value="SD" />
            </Picker> */}
              <RadioForm
                style={styles.radioButton}
                radio_props={[
                  {label: 'HD ', value: 'HD'},
                  {label: 'SD', value: 'SD'},
                ]}
                // initial={'HD'}
                onPress={value => {
                  formikProps.setFieldValue('Box Type', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Box Type'] &&
                  formikProps.errors['Box Type']}
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
                Plan Explained
              </Text>
              <RadioForm
                style={styles.radioButton}
                radio_props={[
                  {label: 'Yes ', value: 'Yes'},
                  {label: 'NO', value: 'No'},
                ]}
                initial={'Yes'}
                // initial={'HD'}
                onPress={value => {
                  formikProps.setFieldValue('Plan Explained', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Plan Expained'] &&
                  formikProps.errors['Plan Explained']}
              </Text>
              {/* <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Plan Explained"
                onChangeText={formikProps.handleChange('Plan Explained')}
                value={
                  formikProps.touched['Plan Explained'] &&
                  formikProps.values['Plan Explained']
                }
                onBlur={formikProps.handleBlur('Plan Explained')}
                errorMessage={
                  formikProps.touched['Plan Explained'] &&
                  formikProps.errors['Plan Explained']
                }
              /> */}
              {/* <Text>
              {formikProps.touched['Plan Explained'] &&
                formikProps.errors['Plan Explained']}
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
                Using Broadband
              </Text>
              {/* <Picker
              style={{
                borderColor: '#000',
                borderRadius: 10,
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              selectedValue={
                formikProps.touched['Using Broadband'] &&
                formikProps.values['Using Broadband']
              }
              onValueChange={formikProps.handleChange('Using Broadband')}
              onBlur={formikProps.handleBlur('Using Broadband')}>
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
                  {label: 'NO', value: 'No'},
                ]}
                initial={'Yes'}
                onPress={value => {
                  formikProps.setFieldValue('Using Broadband', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Using Broadband'] &&
                  formikProps.errors['Using Broadband']}
              </Text>
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Operator Name"
                label="Operator Name"
                onChangeText={formikProps.handleChange('Operator Name')}
                value={
                  formikProps.touched['Operator Name'] &&
                  formikProps.values['Operator Name']
                }
                onBlur={formikProps.handleBlur('Operator Name')}
                errorMessage={
                  formikProps.touched['Operator Name'] &&
                  formikProps.errors['Operator Name']
                }
              />
              {/* <Text>
              {formikProps.touched['Operator Name'] &&
                formikProps.errors['Operator Name']}
            </Text> */}
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Monthly Rental"
                label="Monthly Rental"
                onChangeText={formikProps.handleChange('Monthly Rental')}
                value={
                  formikProps.touched['Monthly Rental'] &&
                  formikProps.values['Monthly Rental']
                }
                onBlur={formikProps.handleBlur('Monthly Rental')}
                keyboardType="numeric"
                errorMessage={
                  formikProps.touched['Monthly Rental'] &&
                  formikProps.errors['Monthly Rental']
                }
              />
              {/* <Text>
              {formikProps.touched['Monthly Rental'] &&
                formikProps.errors['Monthly Rental']}
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
                Sale Closed
              </Text>

              {/* <Picker
              selectedValue={
                formikProps.touched['Sale Closed'] &&
                formikProps.values['Sale Closed']
              }
              onValueChange={formikProps.handleChange('Sale Closed')}
              onBlur={formikProps.handleBlur('Sale Closed')}>
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
                  {label: 'NO', value: 'No'},
                ]}
                initial={'Yes'}
                onPress={value => {
                  formikProps.setFieldValue('Sale Closed', value);
                }}
              />
              <Text style={styles.errorMessage}>
                {formikProps.touched['Sale Closed'] &&
                  formikProps.errors['Sale Closed']}
              </Text>
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                placeholder="Amount Collected"
                label="Amount Collected"
                onChangeText={formikProps.handleChange('Amount Collected')}
                value={
                  formikProps.touched['Amount Collected'] &&
                  formikProps.values['Amount Collected']
                }
                onBlur={formikProps.handleBlur('Amount Collected')}
                keyboardType="numeric"
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
                value={
                  formikProps.touched['Remark'] && formikProps.values['Remark']
                }
                onBlur={formikProps.handleBlur('Remark')}
                multiline
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
                  marginTop: 10,
                  padding: 10,
                  marginBottom: 20,
                }}
                titleStyle={{color: '#fff'}}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalesForm;

const styles = StyleSheet.create({
  container: {
    padding: 12,
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
  errorMessages: {
    color: '#dc143c',
    fontSize: 12,
    paddingLeft: 15,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'Montserrat-Regular',
  },

  inputLabel: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'normal',
    fontSize: 14,
  },
});
