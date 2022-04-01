import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, ImageBackground} from 'react-native';
import Video from 'react-native-video';
import {Icon} from 'react-native-elements';

const Learning = ({navigtaion}) => {
  function renderVideoSection() {
    return (
      <View
        style={{
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}>
        {/* Thumbnail */}
        <ImageBackground
          source={{uri: 'http://dummyimage.com/127x100.png/5fa2dd/ffffff'}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            raised
            name="play"
            type="font-awesome"
            color="#f50"
            onPress={() => setPlayVideo(!playVideo)}
          />
        </ImageBackground>
        {playVideo && (
          <Video
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            controls={true}
            style={{
              position: 'absolute',
              top: 20,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'black',
              justifyContent: 'center',
            }}
            fullscreen={true}
          />
        )}
      </View>
    );
  }
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* <Button title="play" onPress={() => setPlayVideo(!playVideo)} /> */}

      {renderVideoSection()}
    </View>
  );
};

export default Learning;

const styles = StyleSheet.create({});
