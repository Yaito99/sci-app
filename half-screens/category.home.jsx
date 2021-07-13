import React , { useContext , useCallback , useState } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


import {View , Text } from 'react-native';
import ItemShow from '../components/itemshow';


import { Catagory } from '../contexts/catagory'


const CategoryShow = ({ navigation }) => {
  const { catagoryState } = useContext(Catagory) 
  const {id , name } = catagoryState
  const [products , setProducts ] = useState([])
  useFocusEffect(
    useCallback(()=>{
      const fetchData = async () =>{
        try{
          if(id < 1000){
          const resp = await axios.get(`https://technologyterrain.com/sciapi/products/category/${id}`)
          resp.data.length > 0 ? setProducts(resp.data) : setProducts([])
        }
          else{
            const resp = await axios.get(`https://technologyterrain.com/sciapi/products/${id}`)
            resp.data.length > 0 ? setProducts(resp.data) : setProducts([])
  
          }
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[catagoryState])
    )
    return (
      <View>
        <Text style={{backgroundColor:'#003365' , padding:5 , paddingHorizontal:10 , fontSize:20 , marginVertical:5 , color:'#fee644' , borderRadius:5}}>{name}</Text>      
        <ItemShow navigation={navigation} data={products} />                     
      </View>
    );
}


export default CategoryShow