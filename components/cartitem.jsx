import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Cart } from '../contexts/cart'

import { StyleSheet , View , Image , Text , Pressable  } from 'react-native'

const CartItem = ({ item , checkout , navigation }) =>{
  const {cart, addItem , removeItem , destroyItem } = useContext(Cart)
  const {name , price , img , quantity , shop } = item
  return(
    <Pressable style={checkout ? styles.checkout_container :styles.container} onPress={()=> navigation.navigate('Item' , {itemData:item,shopInfo:shop})} >
      <View style={{flex:1, justifyContent:'center'}} >
        <Image
          style={styles.itemImage}
          source={{uri:`https://technologyterrain.com/sciapi/uploads/${img}`}}
          />   
      </View>
      <View style={{ flex:3 , paddingVertical:10}} >
        <Text>{name}</Text>
        <Text>Sold by:{shop.username}</Text>
        <View style={{flexDirection:'row' }}>
          <Text>Quantity:</Text>
          {
            checkout ? null :
            <Pressable style={styles.btn} onPress={()=>removeItem(cart,item)} >
              <Icon name="minus" size={13} color="#fee644" />        
            </Pressable>
          }
          <Text>{quantity}</Text>
          {
            checkout ? null :
            <Pressable style={styles.btn} onPress={()=>addItem(cart,item,shop)} >
              <Icon name="plus" size={13} color="#fee644" />        
            </Pressable>
        }
        </View>
        <Text>{price} EGP</Text>
        <Pressable onPress={()=>destroyItem(cart , item)} style={{position:'absolute', right:5 , top:10}}>
          <Icon name="trash" size={25} color="red" />         
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    borderColor:'#003365',
    borderWidth:1,
    borderRadius:10,
    height:100,
    marginVertical:5     
  },
  checkout_container:{
    flexDirection:'row',
    borderColor:'#003365',
    height:100,
  },  
  itemImage:{
    height:70,
    width:70,
    alignSelf:'center'
  },
  btn:{
    marginHorizontal:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#003365',
    borderRadius:50,
    height:22,
    width:22,
  }
});


export default CartItem