import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllCollection from './AllCollection';
import DCCollection from './DCCollection';

const Collectionscreen = ({route, navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Active"
        data={route.params.data}
        children={() => <AllCollection navigation={navigation} />}
      />
      <Tab.Screen
        name="DC"
        children={() => (
          <DCCollection data={route.params.data} navigation={navigation} />
        )}
      />
    </Tab.Navigator>
  );
};

export default Collectionscreen;

const styles = StyleSheet.create({});
