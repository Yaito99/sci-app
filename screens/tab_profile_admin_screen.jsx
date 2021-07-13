import React , { useState , useEffect }  from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { StyleSheet, Text, Alert , View , ScrollView ,  Pressable , Image , TextInput } from 'react-native';
import YButton from '../components/ybutton'

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


const AdminScreen = () => {
  const [partners , setPartners] = useState([])
  const [photo, setPhoto] = useState(null); 
  const [name, setName] = useState(null); 
  
  useEffect(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/profile/admin/requests`)
          resp.data.length > 0 ? setPartners(resp.data) : setPartners([])
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[axios])
  const requestApprove = (data) =>{
    axios.post('https://technologyterrain.com/sciapi/profile/admin/partner/accept' , {
      userid:data.userid,
      value:data.request_type,
      reqid:data.id
    })
    .then((resp)=>{
      Alert.alert(`${data.name} has been accepted as a Partner`)
    })
    .catch((err)=>{
      Alert.alert("Mission Failed , We will get them next time")      
    })
  }
  const requestDecline = (data) =>{
    axios.post('https://technologyterrain.com/sciapi/profile/admin/partner/decline' , {
      reqid:data.id
    })
    .then((resp)=>{
      Alert.alert(`Request has been removed`)
    })
    .catch((err)=>{
      Alert.alert("Mission Failed , We will get them next time")      
    })
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result)
      setPhoto(result.uri);
    }
  };

  const addCategory = () => {
    if(photo){
    axios.post('https://technologyterrain.com/sciapi/profile/admin/category/add' , createFormData(photo , {
       name:name, 
      }
       ),{headers:{'Content-Type': 'multipart/form-data'}})
    .then(function (response) {
      Alert.alert("SUCCSUSS")
    })
    .catch(function (error) {
      Alert.alert("FAILED , Please fill up all the fields")
      console.log(error)      
    });
  }
  else{
    Alert.alert('PLEASE ADD IMAGE TO THE CATEGORY')
  }
  }          
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:20}}>
      <Text style={styles.header}>Partner Requests</Text>
      {
        partners.length ? 
        partners.map(item =>(
          <Pressable style={styles.partner_req} key={item.id}>
            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
              <Text style={{color:'#fee644'}}>Request ID :{item.id}</Text>
              <Text style={{color:'#fee644'}}>Type : {item.request_type === 20 ? 'Shop Request' : 'Delivery Request'}</Text>
            </View> 
            <Image
              style={styles.profile_image}
              source={{uri:`https://technologyterrain.com/sciapi/uploads/${item.profile_img}`}}
            />
            <Text style={{marginVertical:5 ,  color:'#fee644'}}>Name : {item.name}</Text>
            <Text style={{marginVertical:5 ,  color:'#fee644'}}>Email : {item.email}</Text>
            <Text style={{marginVertical:5 ,  color:'#fee644'}}>Phone : {item.phone}</Text>
            <TextInput style={{marginVertical:5 ,  color:'#fee644',borderWidth:1 , borderRadius:2 , borderColor:'white' , padding:5}} value={item.message} multiline numberOfLines={5} textAlignVertical={'top'} editable={false} />
            <View style={{flexDirection:'row' , justifyContent:'space-around'}}>
              <Pressable onPress={()=>requestApprove(item)} style={{backgroundColor:'#05cd7a',borderRadius:3}}>
                <MaterialCommunityIcons name="check" size={24} color="black" />                  
              </Pressable>
              <Pressable onPress={()=>requestDecline(item)} style={{backgroundColor:'red',borderRadius:3}}>
                <MaterialCommunityIcons name="window-close" size={24} color="white" />                  
              </Pressable>            
            </View>             
          </Pressable>  
        ))
        :
        <Text style={{fontWeight:'bold',textAlign:'center',marginVertical:20}}>THERE IS NO NEW REQUEST</Text>
      }
      <Text style={styles.header}>Categories</Text>
      <View>
        <Image
        style={styles.profile_image}
        source={{uri:photo ? photo : `https://technologyterrain.com/sciapi/uploads/emptyimage.jpg`}}
        />            
        <Pressable onPress={pickImage} style={styles.editImage} >
          <MaterialCommunityIcons name="image-edit" size={24} color="#fee644" />
        </Pressable>             
      </View>
      <View style={styles.formOption}>
        <Text style={styles.inputlabel}>Category Name</Text>        
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text)=>setName(text)}
        />
      </View>      
      <YButton onPress={addCategory} textStyle={{color:'#fee644',fontWeight:'bold'}} style={styles.button}>Add</YButton> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal:15,
    backgroundColor:'white'
  },
  header:{
    padding:4,
    paddingLeft:7,
    borderRadius:10,
    backgroundColor:'#003365',
    color:'#fee644',
    fontSize:18,
    marginTop:20
  },
  partner_req:{
    backgroundColor:'#003365',
    padding:5,
    borderRadius:10,
    marginVertical:7
  },
  profile_image:{
    height:150,
    width:150,
    borderRadius:120,
    marginVertical:20,
    borderColor:'#fee644',
    borderWidth:0.5,
    alignSelf:'center'
  },  
  profile_image:{
    height:150,
    width:150,
    borderRadius:120,
    marginVertical:20,
    alignSelf:'center'
  },  
  editImage:{
    backgroundColor:'#003365',
    padding:8,    
    borderRadius:100,    
    position:'absolute',
    alignSelf:'center',
    bottom:0,
    height:40,
    width:40
  },  
  input:{
    minHeight:40,
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
    marginVertical:5,
  },  
  button:{
    width:120,
    backgroundColor:'#003365',
    padding:10,
    marginTop:10,
    borderRadius:5,
    alignItems:'center',
    alignSelf:'center'
  },    
  })
  
export default AdminScreen