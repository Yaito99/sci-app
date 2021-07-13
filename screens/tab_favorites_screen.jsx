import React,{ useContext , useCallback , useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';

import { StyleSheet, Text, View } from 'react-native';
import ItemShow from '../components/itemshow';

import { Logged } from '../contexts/logged'

const FavScreen = ({ navigation }) => {
  const { logged } = useContext(Logged)   
  const [ fItems , setFItems] = useState([])
  useFocusEffect(
    useCallback(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/profile/user/getfavourite/${logged.id}`)
          const users = resp.data.map((i,index)=>index = 1 ? i.partnerid : ',' + i.partnerid)
          const resp2 = await axios.get(`https://technologyterrain.com/sciapi/profile/user/getfavourite/items/${users}`)
          resp2.data.length > 0 ? setFItems(resp2.data) : setFItems([])
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[axios])
    )
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourites</Text>
      <ItemShow navigation={navigation} data={fItems} />
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
  })
  
export default FavScreen