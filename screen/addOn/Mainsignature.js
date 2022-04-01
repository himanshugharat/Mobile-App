import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import SignatureView from './Addsignature';

const Mainsignature = ({id, name}) => {
  const [data, setData] = useState(null);
  const signatureView = useRef(null);

  const onSave = function (result) {
    setData(`data:image/png;base64,${result.encoded}`);
    signatureView.current.show(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          signatureView.current.show(true);
        }}>
        <View>
          <Text style={styles.titleText}>
            {data ? 'Your signature:' : 'Click to sign'}
          </Text>
          {data && (
            <View style={styles.imageContainer}>
              <Image style={styles.previewImage} source={{uri: data}} />
              <Button title="Clear" onPress={() => setData(null)} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <SignatureView
        id={id}
        ref={signatureView}
        rotateClockwise={true}
        onSave={onSave}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  previewImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default Mainsignature;
