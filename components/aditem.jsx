import React from 'react'

import { StyleSheet , Pressable , Image , Text  } from 'react-native'

const AdItem = ({ navigation , imgurl }) =>{

  return(
    <Pressable style={styles.container} > 
      <Image
        style={styles.image}
        source={imgurl}
      />    
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    margin:5,

  }, 
  image: {
    borderRadius:5,    
    height:80,
    width:150
  },
});


export default AdItem