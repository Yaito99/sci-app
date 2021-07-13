import React from 'react'

import { StyleSheet } from 'react-native'
import YButton from './ybutton'



const SiderSelector = ({ activestate }) =>{

  return(
    <YButton style={ activestate ? styles.active : styles.nonActive } />
  )
}

const styles = StyleSheet.create({
  active:{
    backgroundColor:'#005b96',
    borderColor:'#011f4ba0',
    borderRadius:5,
    height:6,
    width:20,
    marginHorizontal:2
  },
  nonActive:{
    borderColor:'#011f4ba0',
    borderWidth:1,
    borderRadius:5,
    height:6,
    width:20,
    marginHorizontal:2
  }  
});


export default SiderSelector