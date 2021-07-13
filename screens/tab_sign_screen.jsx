import React , { useState } from 'react';

import { StyleSheet, Text, View , Image } from 'react-native';

import YButton from '../components/ybutton'
import SignFrom from '../half-screens/signform'
import RegsterFrom from '../half-screens/regform'

const SignScreen = ({ navigation }) => {
  const [activeSign , setActiveSign ]= useState(true)
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#003365' , paddingTop:10, flex: 1,alignItems:'center'}}>
        <Image
        style={styles.Logo}
        source={require('../assets/logo.png')}
        />
      </View>
      <View style={{flex: 3}}>
        <View style={{flex:1, backgroundColor:'#003365' , flexDirection:'row'}}>
          <YButton 
          style={activeSign ? styles.activeOption : styles.nonActiveOption}
          onPress={()=>setActiveSign(true)}
          textStyle={styles.opText}
          textContentType={'username'}
          autoCompleteType='username'          
          >Login</YButton>
          <YButton 
          style={activeSign ? styles.nonActiveOption : styles.activeOption}
          onPress={()=>setActiveSign(false)}
          textStyle={styles.opText}
          >Register</YButton>           
        </View>
        <View style={{flex:15}}>
          {activeSign ? <SignFrom navigation={navigation} /> : <RegsterFrom/> }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  Logo: {
    width: 150,
    height: 130,
    tintColor:'#fee644'
  },
  activeOption: {
    flex:1,
    borderBottomColor:'#fee644',
    borderBottomWidth :3
  },
  nonActiveOption: {
    flex:1,
    borderBottomColor:'#fee64455'
    ,borderBottomWidth :3    
  } ,
  opText:{
    textAlign:'center',
    color:'#fee644',
  } 
});


export default SignScreen