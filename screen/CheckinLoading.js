import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const CheckinLoading = ({nav}) => {
  return (
    <View style={styles.main}>
      <Icon
        iconStyle={{fontSize: 100}}
        name="home"
        type="font-awesome"
        color="#f50"
        onPress={() => {
          nav.navigate('CloudFOS', {
            // data: item,
            nav: nav,
          });
        }}
      />
      <Text>Mark your attendance to continue your Daily task</Text>
    </View>
  );
};

export default CheckinLoading;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
