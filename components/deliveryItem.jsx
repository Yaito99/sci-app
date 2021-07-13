import React , {useState } from 'react'

import { StyleSheet , Pressable , Image , Text  } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const DeliveryItem = ({ partner, navigation , selected , setSelected , searchMode }) =>{
  return(
    <Pressable style={searchMode ? styles.containerr : styles.container} onPress={()=> navigation.navigate('VisitProfile' , {shopData:partner})} > 
      <Image
        style={styles.logo}
        source={{uri:`https://technologyterrain.com/sciapi/uploads/${partner.profile_img}`}}
      />    
      <Text style={styles.name}>{partner.name}</Text>   
      <Text style={styles.desc}>{partner.description}</Text>
      <Text style={styles.username}>@{partner.username}</Text> 
      <Pressable style={{marginVertical:5}} onPress={()=>setSelected(partner)}>
        <AntDesign name={selected.userid === partner.userid ? "checkcircle" : "checkcircleo"} size={50} color={selected.userid === partner.userid ? "#00cc00" : "#003365"} />    
      </Pressable>

    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth:1.5,
    borderRadius:10,
    borderColor:'#003365',
    alignItems:'center',
    margin:2.5,
    padding:5,    
    height:265,
    width:280,
    backgroundColor:'#efefef80'
  },    
  containerr: {
    borderWidth:1.5,
    borderRadius:10,
    borderColor:'#003365',
    alignItems:'center',
    margin:2.5,
    padding:5,    
    height:265,
    width:165,
    backgroundColor:'#efefef80'
  },  
  logo: {
    width: 100,
    height: 100,
    borderRadius:50,
    marginBottom:10,
    marginTop:18,    
  },
  name:{
    fontWeight:'bold',
    marginBottom:2,
    color:'#003365',
    height:19,    
  },
  shopicon:{
    height:50,
    width:50,
    marginTop:10,
    borderRadius:30,
    top:1,
    right:1,
    borderWidth:1,
    borderColor:'#003365'
  },
  desc:{
    textAlign:'center',
    height:48,
    fontSize:10,
  },
  username:{
    position:'absolute',
    top:5,
    left:5,
    fontWeight:'bold',
    color:'#003365',
  },
  addCart:{
    position:'absolute',
    bottom:0,
    right:0,    
    
  },
  addcartlogo:{
    height:20,
    width:20,
    margin:5,
    tintColor:'#05cd7a'
    }
});


export default DeliveryItem