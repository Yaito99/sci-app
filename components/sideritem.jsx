import React from 'react'

import { StyleSheet , View , Image , Text } from 'react-native'
import YButton from './ybutton'

import AsyncStorage from '@react-native-async-storage/async-storage';

const SiderItem = ({ title , desc , imgurl , setSelect , current , end , setFirst}) =>{
  const next = () =>{
    if ( current < end){
      setSelect(current+1)
    }
    else {
      setFirst(false)
      AsyncStorage.setItem('SCI_APP::FIRST_OPEN', '0');
    }
  }
  return(
    <View style={styles.container}> 
      <Image
        style={styles.Logo}
        source={imgurl}
      />    
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>    
      <YButton style={styles.nextbtn} textStyle={styles.nextbtnText} onPress={next} >Next</YButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:5,
    borderWidth:1,
    borderRadius:10,
    borderColor:'#00000020',
    padding:20,
    alignItems:'center'
  },
  Logo: {
    width: 150,
    height: 150,
    marginVertical:20
  },
  title:{
    fontWeight:'bold',
    marginBottom:20
  },
  desc:{
    textAlign:'center',
    maxWidth:200,
    marginBottom:20
  },
  nextbtn:{
    backgroundColor:'#005b96',
    padding:10,
    paddingHorizontal:25,
    borderColor:'#011f4ba0',
    borderWidth:1,
    borderRadius:15,
    marginTop:50
  }
  ,nextbtnText:{
    textAlign:'center',
    color:'#011f4b'
  }
});


export default SiderItem