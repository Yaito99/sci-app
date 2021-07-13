import React,{ useContext , useCallback , useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';

import { StyleSheet, ScrollView , Text, View , TextInput , Pressable , Alert } from 'react-native';
import { Feather , Ionicons } from '@expo/vector-icons';
import DeliveryItem from '../components/deliveryItem'
import { LocationCon } from '../contexts/location'
import { Logged } from '../contexts/logged'
import YButton from '../components/ybutton';

const DeliveryScreen = ({ navigation }) => {
  const { logged } = useContext(Logged)  
  const { loc } = useContext(LocationCon)  
  const [searchText, setSearchText] = useState('');    
  const [searchMode , setSearchMode] = useState(false)  
  const [ partners , setPartners] = useState([]);
  const [selected , setSelected] = useState(0)
  const [filtered , setFiltered] = useState([]) 
  const [name , setName] = useState('')    
  const [phone , setPhone] = useState('')    
  useFocusEffect(
    useCallback(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/delivery/all`)
          resp.data.length > 0 ? setPartners(resp.data) : setPartners([])
          setFiltered(resp.data)
          setSelected(resp.data[0])
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[axios])
    )
    const onSearchChange = (text) =>{
      setSearchText(text)
       if(text){
           const filter = partners.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
           filter.length > 0 ? setFiltered(filter) : setFiltered([]) 
         }
        else{
          setFiltered(partners)
        }
    }
    const onSelectChange = (partner)=>{
      setSelected(partner)
      setSearchMode(false)
    }
    const onSubmit = ()=>{
      axios.post('https://technologyterrain.com/sciapi/checkout/deliveryorder',{
        userid:logged.id,
        name:name,
        phone:phone,
        pickup:loc[0],
        target:loc[1],        
        partnerid:selected.id,
      })
      .then(function (response) {
        Alert.alert(`Your Delivery has been requested`)
      })
      .catch(function (error) {
        Alert.alert(error.message)
      });
    }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Deliver Anything to Anywhere</Text>
        <View style={styles.searchbar}>
          <Feather style={{paddingHorizontal:5}}  name="search" size={20} color="#003365" />            
          <TextInput
            style={styles.inputs}
            onChangeText={text => onSearchChange(text)}
            placeholder="Who are you looking for ?"
            placeholderTextColor="#00336590"
            onFocus={()=>{setSearchMode(true)}}
            value={searchText}
          />
        </View>  
        <Text style={{marginVertical:10,fontWeight:'bold',color:'#003365'}}>Select a Service</Text>  
        {
        partners.length > 0 ?
        <View style={searchMode ? { flex:1, flexWrap:'wrap',flexDirection:'row'} : {alignItems:'center'}}>
          {
            searchMode ? 
            filtered.map(partner =>(
              <DeliveryItem key={partner.id} searchMode navigation={navigation} partner={partner} selected={selected} setSelected={onSelectChange} />      
            ))     
            :
            <DeliveryItem navigation={navigation} partner={selected} selected={selected} setSelected={onSelectChange} />      

          }
        </View>  :null
        }   
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}        
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPhone(text)}
          value={phone}
          placeholder="Phone Number"
        />        
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text>Select Pickup Location</Text>
          <Pressable onPress={()=>navigation.navigate('LocationSelector',{order:2})} style={{alignSelf:'center',padding:5,borderRadius:5,backgroundColor:'#003365'}} >
            <Ionicons name="location-outline" size={24} color="#fee644" />
          </Pressable>        
        </View>  
        <TextInput
          style={styles.input}
          value={loc[0].latitude< 1 ? '' : loc[0].latitude + ',' + loc[0].longitude}
          editable={false}
          placeholder='Select Pickup Location'           
        />       
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text>Select Target Location</Text>
          <Pressable onPress={()=>navigation.navigate('LocationSelector',{order:3})} style={{alignSelf:'center',padding:5,borderRadius:5,backgroundColor:'#003365'}} >
            <Ionicons name="location-outline" size={24} color="white" />
          </Pressable>        
        </View>    
        <TextInput
          style={styles.input}
          value={loc[1].latitude< 1 ? '' : loc[1].latitude + ',' + loc[1].longitude}
          editable={false}
          placeholder='Select Target Location'           
        />           
        <View style={{flex:1 }}>
          <Text>Delivery Fee     : ??? EGP</Text>      
          <View style={{borderTopWidth:2, marginVertical:5 , borderTopColor:'#003365'}} />
          <Text>Total Amount  : ??? EGP</Text>
        </View>
        <YButton onPress={onSubmit} textStyle={{color:'#fee644',fontWeight:'bold'}} style={styles.button}>Order Delivery</YButton>  
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    paddingHorizontal:10
  },
  header:{
    fontWeight:'bold',
    textAlign:'center',
    color:'#003365',
    fontSize:20,
    marginVertical:20,

  },
  searchbar:{
    flexDirection:'row',
    borderColor: '#003365',
    borderWidth: 1 ,
    borderRadius:5,
    height:40,
    alignItems:'center',
    
  },
  searchicon:{
    height:20,
    width:20,
    marginHorizontal:5
  },  
  input:{
    height: 40,
    borderColor: 'rgba(0, 91, 150,0.2)',
    borderWidth: 1 ,
    borderRadius:7,
    paddingHorizontal:5,
    marginVertical:5
  },
  inputs:{
    flex:1,
    height: 40,
    paddingHorizontal:5,
    marginVertical:5
    
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
  
export default DeliveryScreen