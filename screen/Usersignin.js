import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, Image} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Input, Button} from 'react-native-elements';

import {storeData, getData} from '../store/localstorage';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addLocalData, getLocalData} from '../store/taskAction';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import OutlinedInput from './OutlinedInput';
import {TextInput} from 'react-native-paper';
const formschema = yup.object({
  companyName: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required().min(6),
});
const Usersignin = () => {
  const db = firestore();
  // const userDetails = {
  //   name: 'Rashid',
  //   gender: 'male',
  //   age: 28,
  // };
  const [enable, setenable] = useState(false);
  const dispatch = useDispatch();
  const setData = async data => {
    await AsyncStorage.setItem('user', JSON.stringify(data));
    // .then(() => {

    //   //console.log('data saved', data);
    //   dispatch(addLocalData(data));
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../assets/image/CLOUDFOSLOGO.png')}
          style={{
            width: '100%',
            height: '50%',
            resizeMode: 'contain',
            // marginTop: 0,
          }}
        />
        {/* <Text style={styles.title}>Welcome</Text> */}
      </View>
      <Formik
        initialValues={{
          companyName: '',
          name: '',
          password: '',
        }}
        onSubmit={(values, actions) => {
          //   storeData(values);
          //   storeData('him');
          //   console.log('dataa', getData('key'));

          console.log(values);

          actions.resetForm();
          db.collection('userPreDefined')
            .where('email', '==', values.name)
            // .where('loginType', '==', 'none')
            .get()
            .then(querySnapshot => {
              if (!querySnapshot.empty) {
                console.log('trigger');
                console.log(querySnapshot.docs);
                querySnapshot.forEach(documentSnapshot => {
                  console.log('in for each');
                  if (
                    documentSnapshot.data().email.toLowerCase() ===
                      values.name.toLowerCase() &&
                    documentSnapshot.data().password.toLowerCase() ===
                      values.password.toLowerCase() &&
                    documentSnapshot.data().company.toLowerCase() ===
                      values.companyName.toLowerCase()
                  ) {
                    console.log(
                      'data in if',
                      values,
                      documentSnapshot.data().Mobile_Number,
                    );
                    // console.log(
                    //   `Found document at ${
                    //     documentSnapshot.ref.path
                    //   } ${documentSnapshot.data()}`,
                    // );
                    //  {"companyName": "NXTDigital", "id": "Shreemant Shekhar", "name": "Shreemant Shekhar", "password": "12345678"}
                    setData({
                      companyName: documentSnapshot.data().company,
                      name: documentSnapshot.data().email,
                      password: documentSnapshot.data().password,
                      id: documentSnapshot.id,
                      phone: documentSnapshot.data().Mobile_Number,
                    });
                    // Alert.alert('Login');
                    dispatch(getLocalData('login'));
                    db.collection('userPreDefined')
                      .doc(documentSnapshot.id)
                      .update({loginType: 'login'});
                  } else {
                    // Alert.alert('check your fields or user is already login');
                    console.log('pther error');
                    Snackbar.show({
                      text: 'Check your fields ',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  }
                });
              } else {
                Snackbar.show({
                  text: 'Check your fields or user is already login',
                  duration: Snackbar.LENGTH_SHORT,
                });
                console.log('email error');
              }
            });
        }}
        validationSchema={formschema}>
        {formikProps => (
          <View>
            <OutlinedInput
              label={'Company Name'}
              labelStyle={styles.labelStyle}
              // placeholderStyle={styles.input}
              placeholderStyle={{
                fontFamily: 'Montserrat-SemiBold',
                borderColor: 'red',
              }}
              autoFocus
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              onBlur={formikProps.handleBlur('companyName')}
              errorStyle={{color: '#dc143c'}}
              onChangeText={formikProps.handleChange('companyName')}
              style={styles.input}
              theme={{
                colors: {text: 'gray', primary: '#252553'},
                fontFamily: {regular: 'Montserrat-Bold'},
              }}
              autoCapitalize={'none'}
            />
            <Text style={{color: '#dc143c'}}>
              {formikProps.errors.companyName}
            </Text>
            <Text style={{color: '#dc143c'}}>
              {formikProps.touched.companyName}
            </Text>
            {/* <Input
              placeholder="enter company name"
              // leftIcon={<Icon size={24} name="user" />}
              onChangeText={formikProps.handleChange('companyName')}
              style={styles.inputField}
              autoFocus
              label="Company Name"
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              value={
                formikProps.touched.companyName &&
                formikProps.values.companyName
              }
              onBlur={formikProps.handleBlur('companyName')}
              errorStyle={{
                color: '#dc143c',
              }}
              errorMessage={
                formikProps.touched.companyName &&
                formikProps.errors.companyName
              }
              autoCapitalize={'none'}
            /> */}
            <OutlinedInput
              label={'Name / UserId'}
              labelStyle={styles.labelStyle}
              // placeholderStyle={styles.input}
              // placeholderStyle={{
              //   fontFamily: 'Montserrat-SemiBold',
              //   borderColor: 'red',
              // }}
              placeholderTextColor="white"
              autoFocus
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              onChangeText={formikProps.handleChange('name')}
              onBlur={formikProps.handleBlur('name')}
              errorStyle={{color: '#dc143c'}}
              //fontFamily={'Montserrat-SemiBold'}
              style={styles.input}
              autoCapitalize={'none'}
              theme={{
                colors: {text: 'gray', primary: '#252553'},
                fontFamily: {regular: 'Montserrat-Bold'},
              }}
            />
            <Text style={{color: '#dc143c'}}>{formikProps.errors.name}</Text>
            <Text style={{color: '#dc143c'}}>{formikProps.touched.name}</Text>
            {/* <Input
              style={styles.inputField}
              placeholder="enter name / user id"
              label="Name / UserId"
              onChangeText={formikProps.handleChange('name')}
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              value={formikProps.values.name}
              onBlur={formikProps.handleBlur('name')}
              errorStyle={{color: '#dc143c'}}
              errorMessage={formikProps.touched.name && formikProps.errors.name}
              autoCapitalize={'none'}
            /> */}
            <OutlinedInput
              label={'Enter Password'}
              labelStyle={styles.labelStyle}
              // placeholderStyle={styles.input}
              placeholderStyle={{
                fontFamily: 'Montserrat-Bold',
                borderColor: 'red',
                fontFamily: '15px',
              }}
              autoFocus
              inputContainerStyle={{borderBottomColor: 'transparent'}}
              onChangeText={formikProps.handleChange('password')}
              onBlur={formikProps.handleBlur('password')}
              errorStyle={{color: '#dc143c'}}
              //fontFamily={'Montserrat-SemiBold'}
              style={styles.input}
              theme={{
                colors: {text: 'gray', primary: '#252553'},
                fontFamily: {regular: 'Montserrat-Bold'},
                fontSize: '18px',
              }}
              secureTextEntry={enable}
              autoCapitalize={'none'}
              right={
                <TextInput.Icon
                  name={enable ? 'eye' : 'eye-off'}
                  onPress={() => {
                    setenable(!enable);
                  }}
                />
              }
            />
            <Text style={{color: '#dc143c'}}>
              {formikProps.errors.password}
            </Text>
            <Text style={{color: '#dc143c'}}>
              {formikProps.touched.password}
            </Text>
            {/* <Input
              style={styles.inputField}
              placeholder="enter password"
              label="Password"
              onChangeText={formikProps.handleChange('password')}
              inputContainerStyle={{
                borderBottomColor: 'transparent',
              }}
              value={formikProps.values.password}
              onBlur={formikProps.handleBlur('password')}
              secureTextEntry
              errorStyle={{color: '#dc143c'}}
              errorMessage={
                formikProps.touched.rating && formikProps.errors.rating
              }
              autoCapitalize={'none'}
            /> */}

            <View
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <Button
                type="outline"
                title="Sign In"
                buttonStyle={{
                  backgroundColor: '#64ffda',
                  borderRadius: 50,
                  width: 250,
                  alignItems: 'center',
                }}
                titleStyle={{color: 'black', fontFamily: 'Montserrat-SemiBold'}}
                onPress={formikProps.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Usersignin;

// const styles = StyleSheet.create({
//   conatiner: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignContent: 'center',
//     flex: 1,
//     padding: 30,
//   },
// });
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
    fontFamily: 'Montserrat-SemiBold',
  },

  inputField: {
    borderColor: '#859db6',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 15,
    color: 'gray',
    fontFamily: 'Montserrat-SemiBold',
  },

  header: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  labelStyle: {
    color: '#232355',
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'Montserrat-SemiBold',
  },
});
