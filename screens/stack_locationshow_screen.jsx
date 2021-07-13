import React , { useState } from 'react';

import { StyleSheet, Dimensions, View } from 'react-native';
import MapView , { Marker} from 'react-native-maps';

const LocationShowScreen = ({ route }) => {
  const { location } = route.params;
  const loca = location.split('|');
  const [region , setRegion] = useState({
    latitude: parseFloat(loca[0]),
    latitudeDelta: parseFloat(loca[1]),
    longitude: parseFloat(loca[2]),
    longitudeDelta: parseFloat(loca[3]),    
  })
  return(
    <View style={{flex:1,justifyContent:'center'}}>
      <MapView 
        initialRegion={region}
        style={styles.map}
        >
        <Marker
          coordinate={region}
        />
        </MapView>
      </View>
  )
}

const styles = StyleSheet.create({
  map: {
    marginTop:55,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }, 
});

export default LocationShowScreen