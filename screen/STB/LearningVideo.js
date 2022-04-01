import React, {useState} from 'react';
import {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
const LearningVideo = ({navigation}) => {
  console.log(navigation);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoName, setvideoName] = useState('');
  data = [
    {
      id: 1,
      title: 'A Flintstones Christmas Carol',
      image: 'http://dummyimage.com/186x100.png/5fa2dd/ffffff',
      content: 'Re-contextualized bi-directional parallelism',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-the-spheres-of-a-christmas-tree-2720-large.mp4',
    },

    {
      id: 4,
      title: '102 Dalmatians',
      image: 'http://dummyimage.com/118x100.png/cc0000/ffffff',
      content: 'Object-based user-facing parallelism',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-man-runs-past-ground-level-shot-32809-large.mp4',
    },
    {
      id: 5,
      title: 'Local Hero',
      image: 'http://dummyimage.com/183x100.png/ff4444/ffffff',
      content: 'Expanded human-resource definition',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-green-ink-1196-large.mp4',
    },
    {
      id: 6,
      title: 'Flodder in Amerika!',
      image: 'http://dummyimage.com/149x100.png/5fa2dd/ffffff',
      content: 'Multi-tiered logistical standardization',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-urban-boy-with-roller-skates-sliding-and-spinning-in-a-34552-large.mp4',
    },
    {
      id: 7,
      title: 'Echoes from the Dead (Skumtimmen)',
      image: 'http://dummyimage.com/245x100.png/5fa2dd/ffffff',
      content: 'Synergistic fault-tolerant access',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-urban-boy-with-roller-skates-sliding-and-spinning-in-a-34552-large.mp4',
    },
    {
      id: 8,
      title: 'Theremin: An Electronic Odyssey',
      image: 'http://dummyimage.com/105x100.png/dddddd/000000',
      content: 'Future-proofed asynchronous frame',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-urban-boy-with-roller-skates-sliding-and-spinning-in-a-34552-large.mp4',
    },
    {
      id: 9,
      title: 'Black Eagle',
      image: 'http://dummyimage.com/177x100.png/ff4444/ffffff',
      content: 'Customer-focused web-enabled encoding',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-urban-boy-with-roller-skates-sliding-and-spinning-in-a-34552-large.mp4',
    },
    {
      id: 10,
      title: 'Home from the Hill',
      image: 'http://dummyimage.com/127x100.png/5fa2dd/ffffff',
      content: 'Object-based multimedia collaboration',
      video:
        'https://assets.mixkit.co/videos/preview/mixkit-urban-boy-with-roller-skates-sliding-and-spinning-in-a-34552-large.mp4',
    },
  ];
  const renderItem = ({item}) => (
    <View onPress={() => console.log(!modalVisible)}>
      <Card
        style={{
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}>
        <Card.Title>{item.title}</Card.Title>
        <ImageBackground
          source={{uri: item.image}}
          style={{
            width: '100%',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            raised
            name="play"
            type="font-awesome"
            color="#f50"
            onPress={() => {
              setModalVisible(!modalVisible);
              setvideoName(item.video);
            }}
          />
        </ImageBackground>
        {/* <Card.Image
          source={{
            uri: item.image,
          }}
          resizeMode="cover"></Card.Image> */}
        <Text>{item.content}</Text>
        {/* <Button onPress={() => setModalVisible(!modalVisible)} title="hello" /> */}
      </Card>
    </View>
  );
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}></FlatList>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <VideoPlayer
                source={{
                  uri: videoName,
                }}
                // controls={true}
                // style={{height: 300, width: 400}}
                toggleResizeModeOnFullscreen={true}
                navigation={navigation}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LearningVideo;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

{
  /* <View style={{height: 500, width: 500}}>
      <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      // controls={true}
      style={{height: 300, width: 300}}
      
      />
    </View> */
}
