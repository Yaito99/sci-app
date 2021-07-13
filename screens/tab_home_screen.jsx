import React , { useState , useCallback, useContext } from 'react';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';

import { Feather , FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View , Image , TextInput , ScrollView , Pressable , ActivityIndicator } from 'react-native';
import ItemShow from '../components/itemshow';


import Discover from '../half-screens/discover.home';
import CategoryShow from '../half-screens/category.home'


import { Catagory } from '../contexts/catagory'

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState(''); 
  const [products , setProducts ] = useState([])  
  const [filtered , setFiltered ] = useState([])   
  const { catagoryState } = useContext(Catagory) 
  const [loading , setLoading ] = useState(true)  
  useFocusEffect(
    useCallback(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/products/all`)
          resp.data.length > 0 ? setProducts(resp.data) : setProducts([])           
          setLoading(false)        
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[axios])
    )
  const onSearchChange = (text) =>{
    setSearchText(text)
    console.log(products)
    if(text){
        const filter = products.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
        filter.length > 0 ? setFiltered(filter) : setFiltered([]) 
      }
  }
  
  return (  
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headercontainer}>
          <View style={styles.headerview}>
            <Pressable style={{height:25,width:25}} onPress={()=>navigation.toggleDrawer()}>
              <FontAwesome name="navicon" size={25} color="#fee644" />          
            </Pressable>
            <Image
              style={styles.logo}
              source={require('../assets/logo.png')}
            /> 
            <Pressable style={{height:25,width:25}} onPress={()=>navigation.toggleDrawer()}>
              <FontAwesome name="bell" size={25}  color="#fee644" />
              <View style={styles.badgecontainer}>
                <Text style={{fontSize:7.5,color:"white",padding:3.5}}>10</Text>                           
              </View>
            </Pressable>
          </View>      
          <View style={styles.searchbar}>
            <Feather style={{paddingHorizontal:5}}  name="search" size={20} color="#fee644" />            
            <TextInput
              style={styles.input}
              onChangeText={text => onSearchChange(text)}
              placeholder="What are you looking for ?"
              placeholderTextColor="#fee644a0"
              value={searchText}
            />
          </View>      
        </View>
        <View style={{paddingHorizontal:10}}>
          {
            searchText ?
            <ItemShow navigation={navigation} data={filtered} /> : catagoryState.id === 0 ? 
            <Discover navigation={navigation}/> :
            <CategoryShow navigation={navigation} type={catagoryState.id} catagoryName={catagoryState.name}/>
          }
        </View>
      </ScrollView>  
      <Pressable style={{height:50,width:50,position:'absolute',bottom:7,right:7,backgroundColor:'#003365',borderRadius:30,padding:5}} onPress={()=>navigation.navigate('Delivery')}>
        <MaterialIcons name="delivery-dining" size={40} color="#fee644" />          
      </Pressable>        
      {loading ? <ActivityIndicator style={{position:'absolute',top:0,bottom:0,left:0,right:0}} size={50} color="#003365" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
    
  },
  logo:{
    height:31,
    width:36,
  },
  headercontainer:{
    paddingVertical:10,
    paddingHorizontal:10,    
    backgroundColor:'#003365'
  },
  headerview:{
    flexDirection:'row',       
    justifyContent:'space-between',
    marginBottom:10,
  },
  header:{
    fontWeight:'bold',
    textAlign:'center',
    fontSize:20,
    margin:10
  },
  input:{
    flex:1,
    height: 30,
    paddingRight:10,
    color:'#ffffff'
  },
  badgecontainer:{
    flex:1,
    alignItems:'center',
    backgroundColor:'red',
    borderRadius:50, 
    textAlign:'center', 
    position: 'absolute', 
    zIndex: 99, 
    right: 0, 
    top: 0
  },
  searchbar:{
    flexDirection:'row',
    borderColor: '#fee644a0',
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
  catgorySlider:{
    flexDirection:'row',
    marginTop:20,
  }
});


export default HomeScreen