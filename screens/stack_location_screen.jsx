import React , { useState , useCallback , useContext } from 'react';

import { StyleSheet, Dimensions, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView , { Marker} from 'react-native-maps';
import YButton from '../components/ybutton';

import { LocationCon } from '../contexts/location'

const LocationScreen = ({ navigation , route }) => {
    const {update1stLoction,update2ndLoction} = useContext(LocationCon)
    const { order } = route.params
    const [region , setRegion] = useState({
      latitude: 26.55921,
      latitudeDelta: 0.01611,
      longitude: 31.69573,
      longitudeDelta: 0.00871,    
    })
    const [ pad , setpad] = useState(0)
    const _onMapReady = useCallback(async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== `granted`) {
        // console.log(`Permisson Denied`);
      }
      const location = await Location.getCurrentPositionAsync({ "accuracy": Location.Accuracy.High });
      setpad(1)
    }, [setRegion]);
  

    return(
      <View style={{flex:1,justifyContent:'center',padding:pad}}>
        <MapView 
          initialRegion={region}
          onMapReady={_onMapReady}
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={styles.map}
          onRegionChange={region=>{setRegion(region);order === 3  ? update2ndLoction(region) : update1stLoction(region) }}
          >
          <Marker
            coordinate={region}
          />
          </MapView>
          <YButton onPress={()=>order === 1 ? navigation.navigate('Checkout') : navigation.navigate('Delivery')} style={styles.button} textStyle={{color:'#fee644',textAlign:'center',fontWeight:"700"}}>Pick</YButton>
          <YButton style={styles.button2} textStyle={{color:'#fee644',textAlign:'center'}}>{region.latitude.toPrecision(8)},{region.longitude.toPrecision(8)}</YButton>
        </View>
    )
}

const styles = StyleSheet.create({
  map: {
    marginTop:55,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button:{
    padding:9,
    borderRadius:10,
    width: 90,
    backgroundColor:'#003365',
    position: 'absolute',
    bottom: 100,
    alignSelf:'center'
  },
  button2:{
    padding:7,
    borderRadius:10,
    width: 250,
    backgroundColor:'#003365',
    position: 'absolute',
    bottom: 30,
    alignSelf:'center'
  }  
});

export default LocationScreen