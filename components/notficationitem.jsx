import React from 'react'

import { StyleSheet , View , Text} from 'react-native'

const NotfiItem = ({header,desc})=>{

  return(
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    padding:10,
    borderBottomWidth:0.3,
    backgroundColor:'#b3cdd0'
  },
  header: {
    fontWeight:'bold',
    fontSize:25
  },
  desc: {

  },


})  



export default NotfiItem