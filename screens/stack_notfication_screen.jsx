import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NotfiItem from '../components/notficationitem'

const NotificationScreen = ({ navigation }) => {
    return(
      <View style={styles.container}>
          <Text style={styles.header}>
            Notfication
          </Text>
          <View style={{borderTopWidth:1}}>
            <NotfiItem header={"Welcome to Sci"} desc="Sci android app is a e-commerece app that let you follow up the shop you love and link you with any delivery service you like" />
            <NotfiItem header={"Join Now"} desc="Join our sci community and maximize your ecommerce experience" />
          </View>  
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#b3cde0'
  },
  header:{
    fontWeight:'bold',
    textAlign:'center',
    fontSize:20,
    marginVertical:30
  },  
  reg:{
    flex:2,
    backgroundColor:'#b3cde0',
    textAlign:'center',
    alignItems:'center'
  },
  regText: {
    fontWeight: 'bold',
    fontSize: 20,
    margin:10
  },
  regbtn:{
    backgroundColor: "steelblue",
    color:'white',
    textAlign:'center',
    alignItems:'center',
    padding:10,
    paddingHorizontal:40
  },
  regbtnText:{
    color:'white'
  }
});


export default NotificationScreen