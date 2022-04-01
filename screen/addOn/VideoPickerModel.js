import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  PermissionsAndroid,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
// import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loading';
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'CloudFos CAMERA Permission',
        message: 'cloudFos needs access to your CAMERA ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
const VideoPickerModel = ({route, navigation}) => {
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const db = firestore();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const uploadImage = async () => {
    // const {uri} = image;
    // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // setUploading(true);
    // setTransferred(0);
    // const task = storage().ref(filename);
    // await task.putFile(uploadUri);
    // const url = `https://firebasestorage.googleapis.com/v0/b/fos-app-53676.appspot.com/o/${filename}?alt=media`;
    // await db.collection('image').add({data: url});

    // // set progress state
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
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename);
    await task.putFile(uploadUri);
    const url = `https://firebasestorage.googleapis.com/v0/b/fos-app-53676.appspot.com/o/${filename}?alt=media`;

    // await db
    //   .collection('image')
    //   .add({data: url})
    //   .then(() => {
    //     navigation.pop();
    //   });

    // set progress state
    // task.on('state_changed', snapshot => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
    //   );
    // });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert('video uploaded!');

    if (route.params.name == 'digital') {
      getData()
        .then(async re => {
          await db
            .collection('compnayTed')
            .doc(re.companyName)
            .collection('uer')
            .doc(re.name)
            .collection('task')
            .doc(route.params.data.id.toString())
            .update({videoUrl: url});
        })
        .then(navigation.pop())
        .then(() => {
          setImage(null);
        });
    }
    if (route.params.name == 'stb') {
      getData()
        .then(async re => {
          await db
            .collection('stb')
            // .doc(re.companyName)
            // .collection('uer')
            // .doc(re.name)
            // .collection('task')
            .doc(route.params.data.id.toString())
            .update({videoUrl: url});
        })
        .then(navigation.pop())
        .then(() => {
          setImage(null);
        });
    }
  };
  const selectImage = () => {
    const options = {
      maxWidth: 1000,
      maxHeight: 1000,
      // cameraType: 'front',
      mediaType: 'video',
      videoQuality: 'medium',
      durationLimit: 30,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets[0].duration > 30) {
          Alert.alert('video above 30 sec');
        } else {
          const source = {uri: response.assets[0].uri};

          console.log(response.assets[0].uri);
          setImage(source);
        }
      }
    });
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = {uri: response.uri};
    //     console.log(source);
    //     setImage(source);
    //   }
    // });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Capture a video</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{uri: image.uri}} style={styles.imageBox} />
        ) : null}

        {/* <TouchableOpacity style={styles.uploadButton}> */}
        {image && (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload video</Text>
          </TouchableOpacity>
        )}
        {uploading && <Loading />}
      </View>
    </SafeAreaView>
  );
};

export default VideoPickerModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbded6',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});
