import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';

import {Card, Icon} from 'react-native-elements';

import * as yup from 'yup';

import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formsearchschema = yup.object({
  Search: yup.string().required(),
});

const ToDoTask = ({nav, navigation}) => {
  console.log(nav);
  const todayDate = moment(new Date(), 'YYYYMMDD')
    .add(3, 'd')
    .format('YYYYMMDD');
  console.log(todayDate);

  const [align, setalign] = useState([]);
  const [reset, setreset] = useState(true);

  const db = firestore();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      dispatch(addLocalData(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    const item = [];

    getData().then(company => {
      console.log(company);
      db.collection('stb')
        .doc('himan')
        .collection('task')
        .get()
        .then(re => {
          re.forEach(re => {
            if (re.data().taskstatus == 'todo') item.push(re.data());
          });
          setalign(item);
        });
    });
  }, [reset]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setreset(!reset);
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);
  if (!align) {
    return <Text>loading</Text>;
  } else {
    return (
      <View style={{paddingTop: 10}}>
        <Icon
          raised
          name="refresh"
          type="font-awesome"
          color="#f50"
          onPress={() => {
            setreset(!reset);
          }}
        />
        <ScrollView style={{marginBottom: 20}}>
          <FlatList
            keyExtractor={(item, index) => index}
            data={align}
            contentContainerStyle={{paddingBottom: 50, marginBottom: 50}}
            renderItem={({item}) => (
              <>
                <Card
                  containerStyle={{
                    margin: 0.5,
                    borderRadius: 15,
                    borderColor: '#5DADE2',
                  }}>
                  <View style={styles.container}>
                    <View style={styles.cardFlex}>
                      <View style={styles.cardDetail}>
                        <View style={styles.columnFlex}>
                          <Text style={styles.columnTitle}>Name :-</Text>
                          <Text style={styles.columnDetails}>
                            {item['Retailer Name']}
                          </Text>
                        </View>

                        <View style={styles.columnFlex}>
                          <Text style={styles.columnTitle}>Address :-</Text>
                          <Text style={styles.columnDetails}>
                            {item['Retailer Address']}
                          </Text>
                        </View>
                        <View style={styles.columnFlex}>
                          <Text style={styles.columnTitle}>taskType :-</Text>
                          <Text style={styles.columnDetails}>
                            {item['type']}
                          </Text>
                        </View>
                      </View>
                      <Icon
                        raised
                        name="chevron-circle-right"
                        type="font-awesome"
                        color="#f50"
                        onPress={() => {
                          navigation.navigate(item['type'], {
                            data: item,
                            //   nav: nav,
                          });
                        }}
                      />
                    </View>
                  </View>
                </Card>
              </>
            )}
          />
        </ScrollView>
      </View>
    );
  }
};

export default ToDoTask;

const styles = StyleSheet.create({
  button: {
    height: 10,
  },
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
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-SemiBold',
    // width: '25%',
    flex: 0.5,
  },
  columnDetails: {
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
    // width: '80%',
    flex: 1,
  },
});
