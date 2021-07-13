import React , { useContext } from 'react'

import { StyleSheet , View , Text , ScrollView  } from 'react-native'
import YButton from '../components/ybutton'
import DisplayItem from './displayitem'


import { Catagory } from '../contexts/catagory'


const Carousel = ({ title , data , navigation , cataID }) =>{
  const { updateCatagory } = useContext(Catagory)  
  return(
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={{color:'#fee644'}}>{title}</Text>
        <YButton onPress={()=>updateCatagory({id:cataID , name:title})} textStyle={{color:'#fee644'}}>SEE ALL</YButton>     
      </View>
      <ScrollView style={{flexGrow:0}} showsHorizontalScrollIndicator={false} horizontal >
        {
          data.map(
            item=>(
              <DisplayItem key={item.id} item={item} navigation={navigation} />
              ))
        }  
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical:5
  },
  header_container:{
    backgroundColor:'#003365',
    borderRadius:5,
    padding:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  }
});


export default Carousel