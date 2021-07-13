import React,{ useContext , useState  } from 'react';

import { StyleSheet, TextInput , View , Text , Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import YButton from '../components/ybutton'

import { Logged } from '../contexts/logged'

const createFormData = (photo, body = {}) => {

  let uriParts = photo.split('.');
  let fileType = uriParts[uriParts.length - 1];
  const data = new FormData();

  data.append('photo', {
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
    uri: photo
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};



const ProfileEditScreen = () => {
  const { logged } = useContext(Logged)
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(logged.name);
  const [phone, setPhone] = useState(logged.phone);    
  const [address, setAddress] = useState(logged.address);   
  const axios = require('axios');  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.cancelled) {
      console.log(result)
      setPhoto(result.uri);
    }
  };

  const handleUploadPhoto = () => {
    if (photo !== null){
    axios.post('https://technologyterrain.com/sciapi/profile/update' , createFormData(photo , { userid:logged.id , name:name , phone:phone , address:address }),{headers:{'Content-Type': 'multipart/form-data'}})
    .then(function (response) {
      Alert.alert("SUCCSUSS")
    })
    .catch(function (error) {
      Alert.alert("FAILED")
      console.log(error)      
    });
  }else{
    axios.post('https://technologyterrain.com/sciapi/profile/updatee' , {
      userid:logged.id,
      name:name,
      phone:phone,
      address:address
    } )
    .then(function (response) {
      Alert.alert("SUCCSUSS")
    })
    .catch(function (error) {
      Alert.alert("FAILED")
      console.log(error)      
    });    
  }
  }
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profile_image}
          source={{uri:photo ? photo : `https://technologyterrain.com/sciapi/uploads/${logged.profile_img}`}}
        /> 
        <Pressable onPress={pickImage} style={styles.editImage} >
          <MaterialCommunityIcons name="image-edit" size={24} color="#fee644" />
        </Pressable>      
      </View>
      <View style={{flexDirection:'row',alignItems:'center' }}>
        <Text style={styles.inputname}>Name</Text>      
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />
      </View>
      <View style={{flexDirection:'row',alignItems:'center' }}>
        <Text style={styles.inputname}>Phone</Text>      
        <TextInput
          style={styles.input}
          onChangeText={text => setPhone(text)}
          value={phone}
        />
      </View>
      <View style={{flexDirection:'row',alignItems:'center' }}>
        <Text style={styles.inputname}>Address</Text>      
        <TextInput
          style={styles.input}
          onChangeText={text => setAddress(text)}
          value={address}
        />
      </View>            
      <YButton onPress={handleUploadPhoto} textStyle={{color:'#fee644ee'}} style={styles.button} >UPDATE</YButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal:15,
    backgroundColor:'#ffffff',
    alignItems:'center'
  },
  profile_image:{
    height:150,
    width:150,
    borderRadius:120,
    marginVertical:20,
    borderColor:'#003365',
    borderWidth:1
  },
  button:{
    backgroundColor:'#003365',
    padding:10,
    marginHorizontal:5,
    borderRadius:5,
  },
  editImage:{
    backgroundColor:'#003365',
    padding:8,    
    borderRadius:100,    
    position:'absolute',
    bottom:10,
    right:10
  },
  input:{
    height: 40,
    width:260,
    marginVertical:5,
    borderColor: '#003365',
    borderWidth: 1 ,
    paddingHorizontal:10,
    borderTopRightRadius:5,
    borderBottomRightRadius:5     
  },
  inputname:{
    backgroundColor:'#003365',
    padding:11,
    width:80,
    color:'#fee644',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5    
  }
  })
  
export default ProfileEditScreen