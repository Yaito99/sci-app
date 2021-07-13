import React , { useState } from 'react';
import { StyleSheet, Text, View , ScrollView  , TextInput  , Alert } from 'react-native';
import YButton from '../components/ybutton';


const RegisterForm = () => {
  const axios = require('axios'); 
  const [ username, setUsername ] = useState('');  
  const [ name , setName ] = useState('');  
  const [ email, setEmail ] = useState('');  
  const [ phone, setPhone ] = useState('');  
  const [ address, setAddress ] = useState('');  
  const [ password, setPassword ] = useState('');  
  const [ cPassword, setCPassword ] = useState('');  



  const register = ()=>{
    const valid = () =>{
      if(username.length < 6 ){
        Alert.alert('Username is less than 8 characters')
        return false
      }
      else if( !(password === cPassword) ){
        Alert.alert('The Passwords are not the same')
        return false
      }
      return true
    }
    const v = valid()
    if(v){
    axios.post('https://technologyterrain.com/sciapi/register',{
      username:username,
      password:password,
      name:name,
      email:email,
      phone:phone,
      address:address,
    })
    .then(function (response) {
      Alert.alert("You have registered successfully")
    })
    .catch(function (error) {
      Alert.alert(error.message)
    });}
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcome}>Please fill up the form</Text>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Username</Text>        
          <TextInput
          style={styles.input}
          onChangeText={text => setUsername(text)}
          value={username}
          textContentType={'username'}
          autoCompleteType='username'
          autoCapitalize='none'
          />
        </View>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Full Name</Text>        
          <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          textContentType={'name'}
          autoCompleteType='name'
          autoCapitalize='words'
          />
        </View>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Email</Text>        
          <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          textContentType={'emailAddress'}
          keyboardType='email-address'
          autoCompleteType='email'
          autoCapitalize='none'          
          />
        </View>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Phone Number</Text>        
          <TextInput
          style={styles.input}
          onChangeText={text => setPhone(text)}
          value={phone}
          textContentType={'telephoneNumber'}
          autoCompleteType='tel'
          />
        </View>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Address</Text>        
          <TextInput
          style={styles.input}
          onChangeText={text => setAddress(text)}
          value={address}
          textContentType={'addressCity'}
          autoCompleteType='street-address'
          />
        </View>                                     
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Password</Text>    
          <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          textContentType={'password'}
          autoCompleteType='password'
          />
        </View>          
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Confirm Password</Text>    
          <TextInput
          style={styles.input}
          onChangeText={text => setCPassword(text)}
          value={cPassword}
          autoCompleteType='password'
          secureTextEntry
          />
        </View>          
        <View style={{alignItems:'center', marginVertical:15}}>
          <YButton
            style={styles.signIn}
            textStyle={styles.signInText}
            onPress={register}
          >Sign Up</YButton>
        </View> 
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
  welcome:{
    fontWeight:'bold',
    fontSize:20,
    color:'#003365',
    marginBottom:10
  },
  input:{
    height: 40,
    borderColor: '#00336580',
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
    borderRadius:5,
  }
  ,signInText:{
    textAlign:'center',
    color:'#fee644'
  }
});


export default RegisterForm