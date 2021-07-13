import React, { useEffect , useState } from 'react'
import axios from 'axios';

import { StyleSheet , View , Image , Text , Pressable  } from 'react-native'
import { FontAwesome , AntDesign  } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import YButton from './ybutton';

const OrderItem = ({ navigation,order , delivery }) =>{
  const [ item , setItem ] = useState({})
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const resp = await axios.get(`https://technologyterrain.com/sciapi/products/get/${order.itemId}`)
        resp.data.length > 0 ? setItem(resp.data[0]) : setItem({})
      }catch(err){
        console.log(err)
      }
    }
    fetchData()    
  }, [axios])
  return(
    <View style={styles.container} >
      <View style={{flex:1, justifyContent:'center'}} >
        <Pressable style={{ position:'absolute', left:10,top:5, height:25,width:25}}>
          <FontAwesome name="hashtag" size={25}  color="#003365" />
          <View style={styles.badgecontainer}>
            <Text style={{fontSize:7.5,color:"white",padding:3.5}}>{order.id}</Text>                           
          </View>
        </Pressable>       
        <Image
          style={styles.itemImage}
          source={{uri:`https://technologyterrain.com/sciapi/uploads/${item.img}`}}
          />   
      </View>
      <View style={{ flex:3 , paddingVertical:10}} >
      {       
        delivery ?
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
          <View style={{alignItems:'center'}}>
            <Pressable onPress={()=>navigation.navigate('LocationShow' , {location:order.pickup})} style={{alignItems:'center',padding:5,borderRadius:5,backgroundColor:'#003365',height:35,width:35}} >
              <Ionicons name="location-outline" size={24} color="white" />
            </Pressable>        
            <Text style={{fontWeight:'bold'}}>Pickup</Text>
          </View>
          <View style={{alignItems:'center',marginRight:30}}>
            <Pressable onPress={()=>navigation.navigate('LocationShow' , {location:order.target})} style={{alignItems:'center',padding:5,borderRadius:5,backgroundColor:'#003365',height:35,width:35}} >
              <Ionicons name="location-outline" size={24} color="#fee644" />
            </Pressable>        
            <Text style={{fontWeight:'bold'}}>Target</Text>
          </View>        
        </View>
        :
        <View>
          <Text>{item.name}</Text>
          <Text>Quantity:{order.quantity}</Text>
          <Text>Order Total: {order.price} EGP</Text>
        </View>
      }

        <Text style={{fontWeight:'700'}}>Info:</Text>
        <Text>Name:{order.name}</Text>
        <Text>Number:{order.number}</Text>
      {       
        !delivery ?
        <View>
          <Text>Province:{order.province}</Text>
          <Text>Area:{order.area}</Text>        
        </View> : null
      }
        <View style={{marginTop:5,flexDirection:'row' , justifyContent:'space-between',marginRight:10}}>
          <YButton style={{padding:5, width:100,backgroundColor:'#003365'}} textStyle={{textAlign:'center',color:'#00ff00'}}>
            Received
          </YButton>
          <YButton style={{padding:5, width:100,backgroundColor:'#003365'}} textStyle={{textAlign:'center',color:'#ff0000'}}>
            Cancel
          </YButton>        
        </View>   
        {       
          !delivery ?
          <Pressable onPress={()=>navigation.navigate('LocationShow' , {location:order.location})} style={{alignItems:'center',padding:5,borderRadius:5,backgroundColor:'#003365',position:'absolute',right:5,top:9}} >
            <Ionicons name="location-outline" size={24} color="#fee644" />
          </Pressable> : null
        }            

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    borderColor:'#003365',
    borderWidth:1,
    borderRadius:10,
    minHeight:100,
    marginVertical:5     
  },
  itemImage:{
    height:70,
    width:70,
    alignSelf:'center'
  } ,
  badgecontainer:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#ff0000cc',
    borderRadius:50, 
    textAlign:'center', 
    position: 'absolute', 
    zIndex: 99, 
    right: 0, 
    top: 0
  },   
});


export default OrderItem