import React , { useContext , useState } from 'react';

import { useQuery } from 'react-query'

import { StyleSheet, Text, View , Image , Alert , TextInput } from 'react-native';
import YButton from '../components/ybutton'
import axios from 'axios';


import { Logged } from '../contexts/logged'


const PartnershipScreen = ({ navigation }) => {
  const [ selectedRequest , setSelectedRequest ] = useState(0)
  const [ text , setText ] = useState('')  
  const { logged } = useContext(Logged)
  const handleReq = () =>{
    axios.post('https://technologyterrain.com/sciapi/profile/partner',{
      userid:logged.id,
      request_type:selectedRequest,
      message:text
    })
    .then((resp)=>{
      Alert.alert(
        "Success",
        "Your request has been sent to our team for review please wait patiently ",
        [
          { text: "OK", onPress: () => navigation.navigate('Profiler') }
        ]
      );
    })
    .catch((err)=>{
      Alert.alert("Mission Failed")      
    })
  } 

  return (  
    <View style={styles.container}>
        <View style={styles.headercontainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          /> 
          <Text style={{color:'#003365' , marginVertical:10 , textAlign:'center'}}>Become our partner either by becoming a Shop and posting your products or becoming a Delivery service and offer your service to our clients </Text>
        </View>
        {
          selectedRequest ?
          <View style={{flex:5, paddingHorizontal:10}}>
            <Text style={{color:'#003365' , marginVertical:10 , textAlign:'center' , fontWeight:'bold'}} >Write up what qualifications you have or anything that might affect our decision for accepting you </Text>
            <TextInput
              style={{ borderWidth:1 , borderColor:'#003365' , borderRadius:5 , padding:5}}
              placeholder="Write everything here"
              multiline
              numberOfLines={16}
              textAlignVertical={'top'}
              value={text}
              onChangeText={(text)=>setText(text)}
            />
            <YButton onPress={handleReq} textStyle={{color:'#fee644' , fontWeight:'bold' }} style={styles.button} >Submit</YButton>
          </View>
          :
          <View style={{flex:5, paddingHorizontal:10}}>
          <View style={styles.choice_container}>
            <Image style={styles.image} source={require('../assets/first-store.png')} />
            <YButton onPress={()=>setSelectedRequest(20)} textStyle={{color:'#fee644' , fontWeight:'bold' }} style={styles.button} >Shop</YButton>
          </View>
          <View style={styles.choice_container}>
            <Image style={styles.image} source={require('../assets/first-delivery.png')} />
            <YButton onPress={()=>setSelectedRequest(30)} textStyle={{color:'#fee644' , fontWeight:'bold' }} style={styles.button} >Delivery</YButton>
          </View>          
        </View>                       
        }       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  logo:{
    height:90,
    width:105,
    tintColor:'#003365'
  },
  headercontainer:{
    flex:2,
    paddingVertical:10,
    paddingHorizontal:10,    
    alignItems:'center',
    justifyContent:'center',
    borderBottomColor:'#003365',
    borderBottomWidth:2
  },
  headerview:{
    flexDirection:'row',       
    justifyContent:'space-between',
    marginBottom:10,
  },
  choice_container:{
    flex:1,
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#003365'
  },
  button:{
    marginVertical:10,
    backgroundColor:'#003365',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    width:100,
    borderRadius:8,
    alignSelf:'center'
  },
  image:{
    height:140,
    width:140
  }
});


export default PartnershipScreen