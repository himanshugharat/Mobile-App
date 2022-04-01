import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {Linking} from 'react-native';
import geolib from 'geolib';
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = ({lat, lng}) => {
  console.log('data', lat, lng);
  const [Location, setLocation] = useState();
  const [Loading, setLoading] = useState(false);
  const locationConfig = {
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  };
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.setRNConfiguration(locationConfig);

    Geolocation.getCurrentPosition(data => {
      console.log(data);
      setLocation({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
      // console.log(
      //   geolib.getCenter([
      //     {latitude: data.coords.latitude, longitude: data.coords.longitude},
      //     {latitude: 18.8792614, longitude: 72.9307136},
      //   ]),
      // );
      setLoading(true);
      Geocoder.from(data.coords.latitude, data.coords.longitude).then(
        json => {
          console.log(json);
          var addressComponent = json.results[0].formatted_address;
          console.log(addressComponent);
          console.log(Location);
        },
        error => {
          console.log(
            'The location could not be loaded because ',
            error.message,
          ),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000};

          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          });
        },
      );
    });
  };
  const ref = useRef(null);
  const onMapReadyHandel = useCallback(() => {
    // ref.current.fitToElements(true);
    ref.current.fitToCoordinates([Location, {latitude: lat, longitude: lng}], {
      animated: true,
      edgePadding: {
        top: 150,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [ref]);
  return (
    <View style={styles.container}>
      {Loading && (
        <MapView
          ref={ref}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            ...Location,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onMapReady={onMapReadyHandel}>
          <Marker
            // coordinate={Location}
            coordinate={{latitude: lat, longitude: lng}}
            // coordinate={{latitude: 18.96459, longitude: 72.962402}}
            //   image={{uri: 'custom_pin'}}
            title="destination"
            description="place"
            identifier="origin"
          />

          <Marker
            coordinate={Location}
            // coordinate={{latitude: 18.96459, longitude: 72.962402}}
            // image={{uri: 'custom_pin'}}
            identifier="destination">
            <Icon1
              raised
              name="man"
              type="Ionicons"
              color="#0264d6"
              style={{
                fontSize: 20,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
              // onPress={() => {
              //   // setreset(!reset);
              //   // Snackbar.show({
              //   //   text: 'reset search',
              //   //   duration: Snackbar.LENGTH_SHORT,
              //   // });
              //   navigation.push('UploadVideo', {
              //     data: route.params.data,
              //     name: 'digital',
              //   });
              // }}
            />
          </Marker>
          <MapViewDirections
            origin={Location}
            // destination={{latitude: 18.96459, longitude: 72.962402}}
            destination={{latitude: lat, longitude: lng}}
            apikey={'AIzaSyA-e4KgoB0Bne0lsUGGaR1tZBtTI9U_WB0'}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={re => {
              console.log('distance', re.distance);
              console.log('distance', re.duration);
            }}
          />
        </MapView>
      )}
      <Icon1
        raised
        name="location"
        type="MaterialIcons"
        color="#0264d6"
        style={{
          fontSize: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          // setreset(!reset);
          // Snackbar.show({
          //   text: 'reset search',
          //   duration: Snackbar.LENGTH_SHORT,
          // });
          // navigation.push('UploadImage', {
          //   data: route.params.data,
          //   name: 'stbMeter',
          // });
          Linking.openURL(`google.navigation:q=${lat}, ${lng}`);
          // Linking.openURL('google.navigation:q=18.96459, 72.962402');
        }}
      />
    </View>
  );
};

export default Map;
