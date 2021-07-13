import React , { useEffect , useContext , useState } from 'react'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet , Pressable , Image , Text, Alert  } from 'react-native'

import { Cart } from '../contexts/cart'

const DisplayItem = ({ item, navigation , itemshowOn , adminMode }) =>{
  const { cart , addItem } = useContext(Cart)
  const [shop , setShop] = useState({profile_img:'emptyimage.jpg'})
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const resp = await axios.get(`https://technologyterrain.com/sciapi/products/shopinfo/${item.shopid}`)
        resp.data.length > 0 ? setShop(resp.data[0]) : setShop({profile_img:'emptyimage.jpg'})
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[axios])

  const deleteItem = (id)=>{
    axios.post('https://technologyterrain.com/sciapi/products/delete' , {itemId:id})
    .then(resp=>{
      Alert.alert('done')
    })
    .catch(err =>{
      Alert.alert('Mission Failed')      
    })
  }
  return(
    <Pressable style={itemshowOn ? styles.containerr : styles.container} onPress={()=> navigation.navigate('Item' , {itemData:item,shopInfo:shop})} > 
      <Image
        style={styles.logo}
        source={{uri:`https://technologyterrain.com/sciapi/uploads/${item.img}`}}
      />    
      <Text style={styles.name}>{item.name}</Text>   
      <Text style={styles.desc}>{item.description.length > 20 ? item.description.substring(0, 20) : item.description}</Text>
      <Text style={styles.price}>{item.price} EGP</Text>
      <Pressable>
        <Image
          style={styles.shopicon}
          source={{uri:`https://technologyterrain.com/sciapi/uploads/${shop.profile_img}`}}
        />          
      </Pressable>      
      {
        adminMode ?
        <Pressable style={styles.addCart} onPress={()=>deleteItem(item.id)} >
          <MaterialCommunityIcons name="delete" size={24} color="red" />        
        </Pressable>
        :
        <Pressable style={styles.addCart} onPress={()=>addItem(cart,item , shop)} >
          <MaterialCommunityIcons name="cart-plus" size={24} color="#05cd7a" />        
        </Pressable> 
    }         
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
    height:250,
    width:160,
    backgroundColor:'#efefef'
  }, 
  containerr: {
    flexBasis: '45%',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#003365',
    alignItems:'center',
    margin:5,
    padding:5,
    height:250,
    width:160,
    backgroundColor:'#efefef'    
  },   
  logo: {
    width: 100,
    height: 100,
    borderRadius:50,
    marginBottom:10,
  },
  name:{
    fontWeight:'bold',
    marginBottom:5,
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
    height:13,
    fontSize:10,
  },
  price:{
    position:'absolute',
    bottom:0,
    left:0,
    margin:5,
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


export default DisplayItem