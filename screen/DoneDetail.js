import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Card, Text} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';

const DoneDetail = ({route}) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const [detailData, setdetailData] = useState('');
  const db = firestore();
  console.log(route.params.data.id);
  useEffect(() => {
    getData().then(re => {
      console.log(re);
      let item = [];
      db.collection('compnayTed')
        .doc(re.companyName)
        .collection('uer')
        .doc(re.name)
        .collection('task')
        .doc(route.params.data.id.toString())
        .get()
        .then(querySnapshot => {
          setdetailData(querySnapshot.data());
        });
    });
    console.log(detailData);
  }, []);

  return (
    <View>
      <Text style={styles.formHeader}>Detail Task</Text>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#DCDCDC',
            paddingBottom: 50,
            marginBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
          }}>
          <Card
            containerStyle={{
              margin: 0,
              borderRadius: 15,
              borderColor: '#5DADE2',
            }}>
            <Text style={styles.formTitle}>Subscriber Detail</Text>
            <View style={formStyles.container}>
              <View style={formStyles.cardFlex}>
                <View style={formStyles.cardDetail}>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>Name :-</Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['Name']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>Address :-</Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['Address']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>
                      Contact Details :-
                    </Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['Contact Details']}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
          <Card
            containerStyle={{
              margin: 0,
              borderRadius: 15,
              borderColor: '#5DADE2',
            }}>
            <Text style={styles.formTitle}>Technical Detail</Text>
            <View style={formStyles.container}>
              <View style={formStyles.cardFlex}>
                <View style={formStyles.cardDetail}>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>Parent CAN :-</Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['Parent CAN']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>CAN :-</Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['CAN']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>STB number :-</Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['STB number']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnTitle}>
                      Account Status :-
                    </Text>
                    <Text style={formStyles.columnDetails}>
                      {detailData['Account Status']}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
          <Card
            containerStyle={{
              margin: 0,
              borderRadius: 15,
              borderColor: '#5DADE2',
            }}>
            <Text style={styles.formTitle}>Plan / Recharge Detail</Text>
            <View style={formStyles.container}>
              <View style={formStyles.cardFlex}>
                <View style={formStyles.cardDetail}>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Product Name :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Product Name']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      LDR 12M Amount :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['LDR 12M Amount']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      LDR 6M Amount :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['LDR 6M Amount']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      LDR 3M Amount :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['LDR 3M Amount']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Monthly Rental :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Monthly Rental']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Last mode of Recharge :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Last mode of Recharge']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Last recharge amount :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Last recharge amount']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Last recharge date :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Last recharge date']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>Due Date :-</Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Due date']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Amount due :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Amount due']}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
          <Card
            containerStyle={{
              margin: 0,
              borderRadius: 15,
              borderColor: '#5DADE2',
            }}>
            <Text style={styles.formTitle}>Meeting Detail</Text>
            <View style={formStyles.container}>
              <View style={formStyles.cardFlex}>
                <View style={formStyles.cardDetail}>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Date of Visit :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Date of Visit']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Person Met :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Person Met']}
                    </Text>
                  </View>

                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Last mode of Recharge :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Last mode of Recharge']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      New Mobile Number :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['New Mobile Number']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Customer Category :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Customer Category']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Online Recharge Process Explained :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Online Recharge Process Explained']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Purpose of Visit :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Purpose of Visit']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Amount Collected :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Amount Collected']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Any New Requirement :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Any New Requirement']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Requirement :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Requirement']}
                    </Text>
                  </View>

                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>
                      Reason of DC :-
                    </Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['Reason of DC']}
                    </Text>
                  </View>
                  <View style={formStyles.columnFlex}>
                    <Text style={formStyles.columnPlanTitle}>Reason :-</Text>
                    <Text style={formStyles.columnPlanDetails}>
                      {detailData['ChildDc']}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoneDetail;
const styles = StyleSheet.create({
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
    width: '100%',
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
    textTransform: 'capitalize',
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
