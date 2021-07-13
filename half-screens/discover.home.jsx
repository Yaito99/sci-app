import React , { useCallback ,useState , useEffect } from 'react';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';

import {View } from 'react-native';


import Carousel from '../components/carousel';
import AdsCarousel from '../components/adscarousel';


const Discover = ({ navigation }) => {
  const [hotItems , setHotItems] = useState([])
  const [newItems , setNewItems] = useState([])
  const [topItems , setTopItems] = useState([])    
  useFocusEffect(useCallback(()=>{
    const fetchData = async () =>{
      try{
        const respA = await axios.get(`https://technologyterrain.com/sciapi/products/hot`)
        respA.data.length > 0 ? setHotItems(respA.data) : setHotItems([])
        const respB = await axios.get(`https://technologyterrain.com/sciapi/products/new`)
        respB.data.length > 0 ? setNewItems(respB.data) : setNewItems([])
        const respC = await axios.get(`https://technologyterrain.com/sciapi/products/top`)
        respC.data.length > 0 ? setTopItems(respC.data) : setTopItems([])                
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[axios])) 
  return (
    <View>
        <AdsCarousel  />
        <Carousel navigation={navigation} data={hotItems} cataID={1001} title="Hot Items" />
        <Carousel navigation={navigation} data={newItems} cataID={1002} title="New Items" />
        <Carousel navigation={navigation} data={topItems} cataID={1003} title="Top Items" />                       
    </View>
  );
}


export default Discover