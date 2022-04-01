import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Card, Icon} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Input} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import CheckinLoading from '../CheckinLoading';

const formsearchschema = yup.object({
  Search: yup.string().required(),
});

const ToDoTask = ({nav, navigation}) => {
  const isCheckIn = useSelector(state => state.updateAttendence);

  const todayDate = moment(new Date(), 'YYYYMMDD')
    .add(4, 'd')
    .format('YYYYMMDD');

  const task = useSelector(state => state.task);
  const [align, setalign] = useState([]);
  const [reset, setreset] = useState(true);
  const [value, setvalue] = useState(false);
  useEffect(() => {
    try {
      value
        ? task.sort((a, b) => {
            var nameA = a['Due date'].split('-').reverse().join('');
            var nameB = b['Due date'].split('-').reverse().join('');
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          })
        : task.sort((a, b) => {
            var nameA = a['Due date'].split('-').reverse().join('');
            var nameB = b['Due date'].split('-').reverse().join('');
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }

            // names must be equal
            return 0;
          });
      setalign(
        task.filter(
          item =>
            item['Due date'].split('-').reverse().join('') <= todayDate &&
            item['Due date'].split('-').reverse().join('') >
              moment('2021/07/25', 'YYYYMMDD').add(3, 'd').format('YYYYMMDD') &&
            item['task status'] === 'todo' &&
            item['Amount due'] > 0,
        ),
      );
    } catch (err) {
      console.log('fucked up');
    }
  }, [reset, value, navigation]);
  useEffect(() => {
    const unsubscribe = nav.addListener('focus', () => {
      try {
        value
          ? task.sort((a, b) => {
              var nameA = a['Due date'].split('-').reverse().join('');
              var nameB = b['Due date'].split('-').reverse().join('');
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            })
          : task.sort((a, b) => {
              var nameA = a['Due date'].split('-').reverse().join('');
              var nameB = b['Due date'].split('-').reverse().join('');
              if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }

              // names must be equal
              return 0;
            });
        setalign(
          task.filter(
            item =>
              item['Due date'].split('-').reverse().join('') <= todayDate &&
              item['Due date'].split('-').reverse().join('') >
                moment('2021/07/25', 'YYYYMMDD')
                  .add(3, 'd')
                  .format('YYYYMMDD') &&
              item['task status'] === 'todo' &&
              item['Amount due'] > 0,
          ),
        );
      } catch (err) {
        console.log('fucked up');
      }
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [nav]);
  // console.log(align);
  const dataSearch = value => {
    try {
      setalign(
        task.filter(
          item =>
            item['task status'] === 'todo' &&
            (item['task status'] === value ||
              item['Due date'] === value ||
              item['Contact Details'] === value ||
              item['Parent CAN'] === value ||
              item['CAN'] === parseInt(value) ||
              item['STB number'] === value ||
              item['Account Status'] === value ||
              item['Product Name'] === value ||
              item['Name'] === value ||
              item['Contact Details'] === value ||
              item['Address'] === value ||
              item['Due date'] === value),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };
  if (isCheckIn == 'checkIn') {
    return <CheckinLoading nav={nav} />;
  } else {
    return (
      <View style={{paddingTop: 10}}>
        <Formik
          initialValues={{
            Search: '',
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            dataSearch(values.Search);
            actions.resetForm();
          }}
          validationSchema={formsearchschema}>
          {formikProps => (
            <View style={{height: 50}}>
              <Input
                style={{fontFamily: 'Montserrat-SemiBold'}}
                placeholder="Search CAN"
                onChangeText={formikProps.handleChange('Search')}
                value={formikProps.values['Search']}
                onBlur={formikProps.handleBlur('Search')}
                errorMessage={
                  formikProps.touched['Search'] && formikProps.errors['Search']
                }
                errorStyle={{
                  color: '#dc143c',
                  textAlign: 'center',
                }}
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
            </View>
          )}
        </Formik>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 0,
          }}>
          <Icon
            raised
            name="repeat"
            type="font-awesome"
            color="#f50"
            onPress={() => {
              setreset(!reset);
              Snackbar.show({
                text: 'reset search',
                duration: Snackbar.LENGTH_SHORT,
              });
            }}
          />
          <Icon
            raised
            name={value ? 'arrow-up' : 'arrow-down'}
            type="font-awesome"
            color="#f50"
            onPress={() => {
              setvalue(!value);
              Snackbar.show({
                text: value
                  ? 'sort task ascending based on date'
                  : 'sort task descending based on date',
                duration: Snackbar.LENGTH_SHORT,
              });
            }}
          />
        </View>
        <View style={{marginBottom: 20}}>
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
                            {item['Name']}
                          </Text>
                        </View>
                        <View style={styles.columnFlex}>
                          <Text style={styles.columnTitle}>Address :-</Text>
                          <Text style={styles.columnDetails}>
                            {item['Address']}
                          </Text>
                        </View>
                        <View style={styles.columnFlex}>
                          <Text style={styles.columnTitle}>Due Date :-</Text>
                          <Text style={styles.columnDetails}>
                            {item['Due date']}
                          </Text>
                        </View>
                        <View style={styles.columnFlex}>
                          <Text style={styles.columnTitle}>CAN :-</Text>
                          <Text style={styles.columnDetails}>
                            {item['CAN']}
                          </Text>
                        </View>
                      </View>
                      <Icon
                        raised
                        name="chevron-circle-right"
                        type="font-awesome"
                        color="#f50"
                        onPress={() => {
                          nav.navigate('Task Detail', {
                            data: item,
                            nav: nav,
                          });
                        }}
                      />
                    </View>
                  </View>
                </Card>
              </>
            )}
          />
        </View>
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
    // textDecorationLine: 'underline',
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
