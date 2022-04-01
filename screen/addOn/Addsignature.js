import React, {Component} from 'react';
import {View, Text, Modal, Platform} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const toolbarHeight = Platform.select({
  android: 0,
  ios: 22,
});

const modalViewStyle = {
  paddingTop: toolbarHeight,
  flex: 1,
  backgroundColor: 'gray',
  // backgroundColor: '#000',
};

class Addsignature extends Component {
  db = firestore();
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }
  show(display) {
    this.setState({visible: display});
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  render() {
    console.log(this.props.name);
    const {visible} = this.state;
    return (
      <Modal
        style={{
          borderWidth: 5,
          borderStyle: 'solid',
          borderColor: '#000',
        }}
        transparent={false}
        visible={visible}
        onRequestClose={this._onRequreClose.bind(this)}>
        <View style={modalViewStyle}>
          <View style={{padding: 10, flexDirection: 'row'}}>
            <Text onPress={this._onPressClose.bind(this)}>{' x '}</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 14}}>Please write your signature.</Text>
            </View>
          </View>
          <SignatureCapture
            style={{
              // flex: 1,
              height: '50%',
              width: '100%',
              borderStyle: 'solid',
              borderWidth: 5,
              borderColor: '#000',
              // backgroundColor: '#00000',
            }}
            onDragEvent={this._onDragEvent.bind(this)}
            onSaveEvent={this._onSaveEvent.bind(this)}
            backgroundColor="#ffffff"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            showBorder={true}
          />
        </View>
      </Modal>
    );
  }

  _onPressClose() {
    this.show(false);
  }

  _onRequreClose() {
    this.show(false);
  }

  _onDragEvent() {
    // This callback will be called when the user enters signature
    //console.log('dragged');
  }

  uploadImage = async path => {
    const db = firestore();
    const uri = path;
    const filename = `signature${moment(new Date()).format('DDMMYYYYHHmmss')}`;
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // setUploading(true);
    // setTransferred(0);
    const task = storage().ref(filename);
    await task.putString(uri, 'base64');
    const url = `https://firebasestorage.googleapis.com/v0/b/fos-app-53676.appspot.com/o/${filename}?alt=media`;
    await firestore().collection('image').add({data: url});
    if (this.props.name == 'stb') {
      console.log(this.props.id.toString());
      this.getData()

        .then(re => {
          db.collection('stb')
            // .doc(re.companyName)
            // .collection('uer')
            // .doc(re.name)
            // .collection('task')
            .doc(this.props.id.toString())
            .update({
              SignatureImage: url,
            });
        })
        .then(console.log(url));
    }
    if (this.props.name == 'digital') {
      this.getData().then(re => {
        db.collection('compnayTed')
          .doc(re.companyName)
          .collection('uer')
          .doc(re.name)
          .collection('task')
          .doc(this.props.id.toString())
          .update({
            SignatureImage: url,
          });
      });
    }
    // set progress state
    // task.on('state_changed', snapshot => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
    //   );
    // });
    // try {
    //   await task;
    // } catch (e) {
    //   console.error(e);
    // }
    // setUploading(false);
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded to Firebase Cloud Storage!',
    // );
    // setImage(null);
  };
  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    this.props.onSave && this.props.onSave(result);
    console.log(result);
    this.uploadImage(result.encoded);
  }
}

export default Addsignature;
