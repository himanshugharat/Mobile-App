import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Task from '../screen/Task';
import AllTask from '../screen/AllTask';
import AllData from '../screen/STB/Alltask';
import GenericTaskDetails from '../screen/Generic/GenericTaskDetails';
import {getData, storeData} from '../store/localstorage';
import Usersignin from '../screen/Usersignin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {addLocalData} from '../store/taskAction';
import Test from '../screen/Test';
import SalesForm from '../screen/form/SalesForm';
import TechnicalData from '../screen/STB/form/Technical';
import AllCollection from '../screen/AllCollection';
import Loading from '../screen/Loading';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Addsignature from '../screen/addOn/Addsignature';
import Profile from '../screen/Profile';
import DoneDetail from '../screen/DoneDetail';
import {Icon} from 'react-native-elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ToDoTask from '../screen/taskTab/ToDoTask';
import IncompleteTask from '../screen/taskTab/IncompleteTask';
import DoneTask from '../screen/taskTab/DoneTask';
// import Home1 from '../screen/Home1';
import DetailTask from '../screen/Generic/stepperscreen/DetailTask';
import ReportTask from '../screen/Generic/stepperscreen/ReportTask';
import FillForm from '../screen/Generic/stepperscreen/FillForm';
import Barcode from '../screen/addOn/Barcode';

import RatingModel from '../screen/addOn/RatingModel';
import ImagePickerModel from '../screen/addOn/ImagePickerModel';
import Mainsignature from '../screen/addOn/Mainsignature';
import Board from '../screen/addOn/Board';
import VideoPickerModel from '../screen/addOn/VideoPickerModel';
import Antenna from '../screen/STB/form/Antenna';
import Installstb from '../screen/STB/form/Installstb';
import Technical from '../screen/form/Technical';
import Map from '../screen/STB/form/Map';
import Collectionscreen from '../screen/Collectionscreen';
import DCCollection from '../screen/DCCollection';
import Demo from '../screen/STB/form/Demo';
import LearningVideo from '../screen/STB/LearningVideo';
import Learning from '../screen/STB/Learning';

const Mystack = () => {
  const [localValue, setlocalValue] = useState('');
  const [loading, setloading] = useState(false);
  const data = useSelector(state => state.localData);
  const updateLocal = useSelector(state => state.updateLocal);
  const localData = useSelector(state => state.localData);
  //console.log('update machine', updateLocal);
  // const localValue = useSelector(state => state.localData);
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();
  const retrieveData = () => {
    AsyncStorage.getItem('user')
      .then(value => {
        const user = JSON.parse(value);
        // Alert.alert(`${user.companyName} ${user.email} ${user.password}`);
        setlocalValue(user);
        dispatch(addLocalData(user));
        if (user == null) {
          setloading(!loading);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setloading(true);
    }, 500);
    retrieveData();
  }, [updateLocal]);
  const Stack = createStackNavigator();
  const tab = ({navigation}) => (
    <Tab.Navigator>
      <Tab.Screen
        name="Today Task"
        children={() => <ToDoTask nav={navigation} />}
      />
      <Tab.Screen
        name="WIP"
        children={() => <IncompleteTask nav={navigation} />}
      />
      <Tab.Screen
        name="Completed"
        children={() => <DoneTask nav={navigation} />}
      />
    </Tab.Navigator>
  );
  if (!loading) {
    return <Loading></Loading>;
  } else {
    // if (localValue.companyName == 'NXTDigital') {
    //   return (
    //     <SafeAreaProvider>
    //       <Stack.Navigator>
    //         {localValue ? (
    //           <>
    //             {/* <Stack.Screen name="top" component={AllData} />
    //           <Stack.Screen name="Antenna" component={Antenna} />
    //           <Stack.Screen name="Installstb" component={Installstb} />
    //           <Stack.Screen name="Detail" component={Map} />
    //           <Stack.Screen
    //             name="Technical/Complain"
    //             component={TechnicalData}
    //           /> */}
    //             <Stack.Screen
    //               name="CloudFOS"
    //               component={Home}
    //               options={({navigation, route}) => ({
    //                 // headerTitle: 'data',
    //                 headerRight: () => (
    //                   <Icon
    //                     name="user-circle-o"
    //                     type="font-awesome"
    //                     color="#f50"
    //                     onPress={() => {
    //                       navigation.push('Profile');
    //                     }}
    //                     iconStyle={{paddingRight: 20}}
    //                   />
    //                 ),
    //               })}
    //             />
    //             <Stack.Screen name="main" component={Board} />
    //             <Stack.Screen name="signature" component={Mainsignature} />
    //             <Stack.Screen name="barcode" component={Barcode} />
    //             <Stack.Screen name="Rating" component={RatingModel} />
    //             <Stack.Screen name="UploadImage" component={ImagePickerModel} />
    //             <Stack.Screen name="UploadVideo" component={VideoPickerModel} />
    //             <Stack.Screen
    //               name="Task Summary"
    //               component={AllTask}
    //               options={({navigation, route}) => ({
    //                 // headerTitle: 'data',
    //                 headerLeft: () => (
    //                   <Icon
    //                     name="home"
    //                     type="font-awesome"
    //                     color="#f50"
    //                     onPress={() => {
    //                       navigation.navigate('CloudFOS');
    //                     }}
    //                     iconStyle={{paddingLeft: 20}}
    //                   />
    //                 ),
    //               })}
    //             />
    //             <Stack.Screen name="Technical" component={Technical} />
    //             <Stack.Screen name="Sales" component={SalesForm} />
    //             <Stack.Screen name="Database" component={AllCollection} />
    //             <Stack.Screen name="Profile" component={Profile} />
    //             <Stack.Screen name="Task Detail" component={DetailTask} />
    //             <Stack.Screen name="Task Form" component={FillForm} />
    //             <Stack.Screen name="Task Report" component={ReportTask} />
    //             <Stack.Screen name="task" component={Task} />
    //             <Stack.Screen name="DoneDetail" component={DoneDetail} />
    //           </>
    //         ) : (
    //           <Stack.Screen name="login" component={Usersignin} />
    //         )}
    //         {/* <Stack.Screen name="home" component={Home} />
    //   <Stack.Screen name="GenericTaskDetails" component={GenericTaskDetails} />
    //   <Stack.Screen name="task" component={Task} /> */}
    //       </Stack.Navigator>
    //     </SafeAreaProvider>
    //   );
    // } else {
    return (
      <SafeAreaProvider>
        <Stack.Navigator>
          {localValue ? (
            <>
              {/* <Stack.Screen
                name="top"
                component={AllData}
                options={({navigation, route}) => ({
                  // headerTitle: 'data',
                  headerRight: () => (
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Icon
                        name="tv"
                        type="font-awesome"
                        color="#f50"
                        onPress={() => {
                          navigation.push('video', {navigation: navigation});
                        }}
                        iconStyle={{paddingRight: 20}}
                      />
                      <Icon
                        name="user-circle-o"
                        type="font-awesome"
                        color="#f50"
                        onPress={() => {
                          navigation.push('Profile');
                        }}
                        iconStyle={{paddingRight: 20}}
                      />
                    </View>
                  ),
                })}
              />
              <Stack.Screen name="Installation Antenna" component={Antenna} />
              <Stack.Screen name="Installation STB" component={Installstb} />
              <Stack.Screen name="Detail" component={Map} />
              <Stack.Screen name="Fault Repair" component={TechnicalData} />
              <Stack.Screen name="Demo" component={Demo} />
              <Stack.Screen name="video" component={LearningVideo} /> */}
              {/* <Stack.Screen name="video" component={Learning} /> */}
              <Stack.Screen
                name="CloudFOS"
                component={Home}
                options={({navigation, route}) => ({
                  // headerTitle: 'data',
                  headerRight: () => (
                    <Icon
                      name="user-circle-o"
                      type="font-awesome"
                      color="#f50"
                      onPress={() => {
                        navigation.push('Profile');
                      }}
                      iconStyle={{paddingRight: 20}}
                    />
                  ),
                })}
              />
              <Stack.Screen name="main" component={Board} />
              <Stack.Screen
                name="Collectionscreen"
                component={Collectionscreen}
              />
              <Stack.Screen name="DCCollection" component={DCCollection} />
              <Stack.Screen name="signature" component={Mainsignature} />
              <Stack.Screen name="barcode" component={Barcode} />
              <Stack.Screen name="Rating" component={RatingModel} />
              <Stack.Screen name="UploadImage" component={ImagePickerModel} />
              <Stack.Screen name="UploadVideo" component={VideoPickerModel} />
              <Stack.Screen
                name="Task Summary"
                component={AllTask}
                options={({navigation, route}) => ({
                  // headerTitle: 'data',
                  headerLeft: () => (
                    <Icon
                      name="home"
                      type="font-awesome"
                      color="#f50"
                      onPress={() => {
                        navigation.navigate('CloudFOS');
                      }}
                      iconStyle={{paddingLeft: 20}}
                    />
                  ),
                })}
              />
              <Stack.Screen name="Technical" component={Technical} />
              <Stack.Screen name="Sales" component={SalesForm} />
              <Stack.Screen name="Database" component={AllCollection} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Task Detail" component={DetailTask} />
              <Stack.Screen name="Task Form" component={FillForm} />
              <Stack.Screen name="Task Report" component={ReportTask} />
              <Stack.Screen name="task" component={Task} />
              <Stack.Screen name="DoneDetail" component={DoneDetail} />
            </>
          ) : (
            <Stack.Screen name="login" component={Usersignin} />
          )}
          {/* <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="GenericTaskDetails" component={GenericTaskDetails} />
        <Stack.Screen name="task" component={Task} /> */}
        </Stack.Navigator>
      </SafeAreaProvider>
    );
    // }
  }
};

export default Mystack;

const styles = StyleSheet.create({});
