import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Avatar, Text} from 'react-native-elements';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {removeLocalData} from '../store/taskAction';
import {useDispatch} from 'react-redux';
import {getLocalData} from '../store/taskAction';
import Attendence from './Attendence';
import firestore from '@react-native-firebase/firestore';
import {Input} from 'react-native-elements/dist/input/Input';
import {Formik} from 'formik';
import * as yup from 'yup';

const formschema = yup.object({
  'Phone Number': yup
    .number()
    .required()
    .test('10 dgiit phone number', '10 dgiit phone number', val => {
      return `${val}`.length == 10;
    }),
});
const Profile = () => {
  const db = firestore();
  const [name, setname] = useState('');
  const [id, setid] = useState('');
  const [data, setdata] = useState('');
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getMobileNo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('phone');

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getData().then(re => {
      setname(re.name);
      db.collection('userPreDefined')
        .doc(re.name)
        .get()
        .then(re => {
          setdata(re.data());
        });
    });
    console.log(data);
    getMobileNo().then(re => {
      setstate(re.phone);
    });
  }, []);
  const setData = async data => {
    await AsyncStorage.setItem('phone', JSON.stringify(data));
    // .then(() => {

    //   //console.log('data saved', data);
    //   dispatch(addLocalData(data));
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  };

  const [state, setstate] = useState('');
  return (
    <View>
      {/* <Card> */}
      <View style={styles.user}>
        {/* <Avatar
            style={styles.image}
            size="xlarge"
            rounded
            source={require('../assets/images/avatar.png')}
          /> */}

        <Icon
          name="user-circle-o"
          type="font-awesome"
          color="#000"
          size={70}
          iconStyle={{paddingBottom: 10}}
          // onPress={() => {
          //   nav.navigate('GenericTaskDetails', {
          //     data: item,
          //     nav: nav,
          //   });
          // }}
        />
        {/* <Text h4>
          Name:
          <Text h4 style={styles.userDetails}>
            &nbsp;{name}
          </Text>
        </Text> */}
        {/* <View
          style={{backgroundColor: '#DCDCDC', marginVertical: 5, padding: 5}}> */}
        {/* <Text style={styles.formHeader}>Task Information</Text> */}
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 15,
            borderColor: '#5DADE2',
          }}>
          <Text style={styles.formTitle}>Profile</Text>
          <View style={formStyles.container}>
            <View style={formStyles.cardFlex}>
              <View style={formStyles.cardDetail}>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Name :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['Employee Name']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Employee ID :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['email']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Location :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['Area/ Zone / Location ']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Manager :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['Manager / Supervisor Name']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Designation :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['Designation']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Manager Phone No :</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['Manager / Supervisor Phone No']}
                  </Text>
                </View>
                <View style={formStyles.columnFlex}>
                  <Text style={formStyles.columnTitle}>Company :-</Text>
                  <Text style={formStyles.columnDetails}>
                    {data && data['company']}
                  </Text>
                  <Text> {state}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* </Card> */}
          {/* </View> */}
          {/* <Text h4>
            Phone no:
            <Text h4 style={styles.userDetails}>
              &nbsp;{name}
            </Text>
          </Text>
          <Text h4>
            Address:
            <Text h4 style={styles.userDetails}>
              &nbsp;{name}
            </Text>
          </Text> */}
          {/* </View> */}

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            {/* <Button
            type="outline"
            title="Check In"
            titleStyle={{color: 'black'}}
            buttonStyle={{borderRadius: 50, width: 150}}
          />
          */}
            <Button
              type="outline"
              title="Sign out"
              buttonStyle={{
                backgroundColor: '#64ffda',
                borderRadius: 50,
                width: 150,
                marginTop: 50,
              }}
              titleStyle={{color: 'black'}}
              onPress={() => {
                AsyncStorage.clear();
                removeLocalData();
                db.collection('userPreDefined')
                  .doc(name)
                  .update({loginType: 'none'});
                dispatch(getLocalData('logout'));
              }}
            />

            {/* <Attendence /> */}
          </View>
          {/* </Card> */}
        </Card>
        {/* <Formik
          initialValues={{
            'Phone Number': '',
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            setstate(values['Phone Number']);
            // getLocation();
            // actions.resetForm();
            setData({phone: parseInt(values['Phone Number'])});
            getMobileNo().then(re => {
              setstate(re.phone);
            });
            // .then(navigation.navigate('top'));
            //   .then(
            //     navigation.navigate('Task Report', {data: route.params.data}),
            //   );
          }}
          validationSchema={formschema}>
          {formikProps => (
            <View style={{marginBottom: 10}}>
              <Input
                style={styles.inputField}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                errorStyle={{color: '#dc143c'}}
                label="Phone Number"
                labelStyle={styles.inputLabel}
                placeholder="Please Enter Person Name"
                onChangeText={formikProps.handleChange('Phone Number')}
                value={state}
                onBlur={formikProps.handleBlur('Phone Number')}
                keyboardType="numeric"
                maxLength={10}
                errorMessage={
                  formikProps.touched['Phone Number'] &&
                  formikProps.errors['Phone Number']
                }
              />
              <Button
                type="outline"
                title="Submit"
                buttonStyle={styles.submitButton}
                titleStyle={styles.submitTitle}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik> */}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  user: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  userDetails: {
    color: 'gray',
    padding: 10,
  },
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
    color: '#fff',
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
    // textTransform: 'capitalize',
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
