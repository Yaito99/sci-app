import React , { useState , useContext } from 'react';

import { StyleSheet, Text, View  , TextInput, Alert , ActivityIndicator } from 'react-native';
import YButton from '../components/ybutton';


import { Logged } from '../contexts/logged'


const SignFrom = ({ navigation }) => {
  const { signIn } = useContext(Logged)
  const axios = require('axios'); 
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');   
  const [loading , setLoading ] = useState(false)  
  
  const login = ()=>{
    setLoading(true)
    axios.post('https://technologyterrain.com/sciapi/login',{
      username:username,
      password:password,
    })
    .then(function (resp) {
      setLoading(false)
      Alert.alert("You have logged successfully")
      signIn(resp.data.user)
      navigation.navigate('Profile')
    })
    .catch(function (error) {
      Alert.alert(error.response.data)
    });}
  
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Username</Text>        
          <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
            value={username}
            autoCapitalize='none'            
          />
        </View>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Password</Text>    
          <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          textContentType='password'
          autoCompleteType='password'          
          />
   
        </View>      
        <YButton
        textStyle={styles.forgetpw}
        >Forget password</YButton>
        <View style={{alignItems:'center', marginVertical:15}}>
          <YButton
          style={styles.signIn}
          textStyle={styles.signInText}
          onPress={login}
          >Sign In</YButton>
        </View> 
        {loading ? <ActivityIndicator style={{position:'absolute',top:0,bottom:0,left:0,right:0}} size={50} color="#003365" /> : null} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10
  },
  welcome:{
    fontWeight:'bold',
    fontSize:20,
    color:'#003365',
    marginBottom:10
  },
  input:{
    height: 40,
    borderColor: 'rgba(0, 91, 150,0.2)',
    borderWidth: 1 ,
    borderRadius:7,
    paddingHorizontal:5
  },
  inputlabel:{
    color:'#003365',
    marginLeft:5,
    marginBottom:5
  },
  formOption:{
    marginVertical:15,
  },
  forgetpw:{
    color:'#005b96',
  },
  signIn:{
    backgroundColor:'#003365',
    padding:15,
    width:200,
    borderColor:'#011f4ba0',
    borderWidth:1,
    borderRadius:5,
  }
  ,signInText:{
    textAlign:'center',
    color:'#fee644'
  }
});


export default SignFrom