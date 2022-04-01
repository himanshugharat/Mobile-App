import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ToDoTask from './taskTab/ToDoTask';
import DoneTask from './taskTab/DoneTask';
import IncompleteTask from './taskTab/IncompleteTask';

const AllTask = ({route, navigation}) => {
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {}, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Today Task"
        data={route.params.data}
        children={() => <ToDoTask nav={navigation} />}
      />
      <Tab.Screen
        name="WIP"
        children={() => (
          <IncompleteTask data={route.params.data} nav={navigation} />
        )}
      />
      <Tab.Screen
        name="Completed"
        children={() => <DoneTask data={route.params.data} nav={navigation} />}
      />
    </Tab.Navigator>
  );
};

export default AllTask;

const styles = StyleSheet.create({});
