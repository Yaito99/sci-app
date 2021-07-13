import React , { useState , useEffect , useContext }  from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StyleSheet, Text, Alert , View , ScrollView ,  Pressable , Image , TextInput } from 'react-native';
import YButton from '../components/ybutton'
import ItemShow from '../components/itemshow';

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



const ShopScreen = ({ navigation }) => {
  const [partner , setPartner] = useState({})
  const [catgories , setCatgories] = useState([])  
  const [products , setProducts] = useState(null)    
  const [desc , setDesc] = useState('')
  const [photo, setPhoto] = useState(null); 
  const [name , setName] = useState(null)
  const [quantity , setQuantity] = useState(null)
  const [price , setPrice] = useState(null)
  const [pDesc , setPDesc] = useState(null)
  const { logged } = useContext(Logged)  
  const [selectedCata, setSelectedCata] = useState(null);
  useEffect(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/profile/partner/${logged.id}`)
          resp.data.length > 0 ? setPartner(resp.data[0]) : setPartner({})
          const respB = await axios.get(`https://technologyterrain.com/sciapi/categories/all`)
          respB.data.length > 0 ? setCatgories(respB.data) : setCatgories([])  
          const respC = await axios.get(`https://technologyterrain.com/sciapi/products/shop/${resp.data[0].userid}`)
          respC.data.length > 0 ? setProducts(respC.data) : setProducts([])                  
          setDesc(resp.data[0].description)
          setSelectedCata(respB.data[1].id)
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[axios])
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });
  
      if (!result.cancelled) {
        console.log(result)
        setPhoto(result.uri);
      }
    };
    const editDesc = () =>{
      axios.post('https://technologyterrain.com/sciapi/profile/partner/setdesc',{
        partnerid:partner.id,
        desc:desc
      })
      .then(function (response) {
        Alert.alert("Your Description has been updated successfully")
      })
      .catch(function (error) {
        Alert.alert("Something went wrong")
        console.log(error)      
      });      
    }
    const addItem = () => {
      if(photo){
      axios.post('https://technologyterrain.com/sciapi/profile/partner/shop/additem' , createFormData(photo , {
         shopid:logged.id,
         name:name, 
         desc:pDesc,
         quantity:quantity,
         price:price,
         category:selectedCata
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
      Alert.alert('PLEASE ADD IMAGE TO THE PRODUCT')
    }
    }      
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:20}}>
      <Text style={styles.header}>Your Details</Text>
      <TextInput
        style={{marginVertical:5 , color:'black',borderWidth:1 , borderRadius:5 , borderColor:'black' , padding:5}}         
        multiline
        numberOfLines={5}
        textAlignVertical={'top'}
        value={desc} 
        onChangeText={(text)=>setDesc(text)} 
      />
      <YButton onPress={editDesc} textStyle={{color:'#fee644',fontWeight:'bold'}} style={styles.button}>Update</YButton> 

    { 
      logged.type === 20 ?
      <View>
        <Text style={styles.header}>Add New Product</Text>  
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
          <Text style={styles.inputlabel}>Product Name</Text>        
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text)=>setName(text)}
          />
        </View>
        <View style={styles.formOption}>
          <Text style={styles.inputlabel}>Product Description</Text>        
          <TextInput
            style={styles.input}
            value={pDesc}
            onChangeText={(text)=>setPDesc(text)}
            multiline
            numberOfLines={10}
            textAlignVertical='top'
          />
        </View>   
        <View style={{flex:1 , flexDirection:'row' , justifyContent:'space-around'}}>
          <View style={styles.formOption}>
           <Text style={styles.inputlabel}>Product Quantity</Text>        
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={(text)=>setQuantity(text)}
              keyboardType="numeric"
            />
          </View>       
          <View style={styles.formOption}>
            <Text style={styles.inputlabel}>Product Price</Text>        
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text)=>setPrice(text)}
              keyboardType="numeric"            
            />
          </View>
        </View>
        <View style={{flex:1 , marginVertical:5 , flexDirection:'row',alignItems:'center' , justifyContent:'center'}}>
          <Text style={styles.inputlabeltwo}>Category</Text>        
          <View style={{borderWidth:1 , borderTopRightRadius:5,borderBottomRightRadius:5, borderColor:'#003365'}}>
            <Picker
              selectedValue={catgories}
              style={{ height: 30, width: 200 }}          
              onValueChange={(itemValue, itemIndex) =>
              setSelectedCata(itemValue)
              }>
              {
                catgories ?
                catgories.map(category => (
                  category.id ? <Picker.Item key={category.id} label={category.name} value={category.id} /> : null
                ) )
                : null
              }
            </Picker>                    
          </View>
        </View>        
        <YButton onPress={addItem} textStyle={{color:'#fee644',fontWeight:'bold'}} style={styles.button}>Add</YButton> 

        <Text style={styles.header}>All Products</Text> 
        {products ? <ItemShow navigation={navigation} data={products} adminMode /> : null}    
      </View> : null
    }
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
  inputlabeltwo:{
    backgroundColor:'#003365',
    padding:5,
    fontSize:16,
    color:'#fee644',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
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
  
export default ShopScreen