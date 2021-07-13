import React from 'react'

import { StyleSheet , View , Text } from 'react-native'

import DisplayItem from './displayitem'

const ItemShow = ({ data , navigation , adminMode }) =>{
  return(
    <View style={styles.container}>
      <View style={{ flex:1, flexWrap:'wrap',flexDirection:'row'}} >
        {
          data.length > 0 ?
          data.map(
            item=>(
              <DisplayItem key={item.id} item={item} navigation={navigation} adminMode={adminMode} />
              ))
          : <Text style={{fontWeight:'bold'}}>No Products has been found</Text>
        }         
      </View >
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical:5
  }
});


export default ItemShow