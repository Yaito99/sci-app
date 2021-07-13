import React,{ useContext , useEffect , useState } from 'react';

import { StyleSheet, Text, View , ScrollView } from 'react-native';
import CartItem from '../components/cartitem'
import YButton from '../components/ybutton'


import { Cart } from '../contexts/cart'
import { Logged } from '../contexts/logged'

const CartScreen = ({ navigation }) => {
  const { cart } = useContext(Cart)
  const { logged } = useContext(Logged)  
  const [total , setTotal] = useState(0)  
  useEffect(()=>{
    let price = 0
    cart.map(item => price = (item.price * item.quantity) + price)
    setTotal(price)
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      <ScrollView contentContainerStyle={{paddingHorizontal:15,}}>
          {
            cart.map(item=>(<CartItem key={item.id} item={item} navigation={navigation} />))
          }
      </ScrollView>
      {
        cart.length > 0 ?
        <View style={styles.checkout}>
          <YButton onPress={()=>logged ? navigation.navigate('Checkout') : navigation.navigate('Sign')} style={styles.checkout_button} textStyle={{color:'#fee644',textAlign:'center',textTransform:'uppercase',fontWeight:'500'}}>Buy {cart.length} Item for total of {total}.00 EGP</YButton>
       </View>:null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  header:{
    fontWeight:'bold',
    textAlign:'center',
    color:'#003365',
    fontSize:20,
    marginVertical:20,

  },
  checkout:{
    backgroundColor:'white',
    paddingVertical:10,
    paddingHorizontal:15,
  },
  checkout_button:{
    backgroundColor:'#003365',
    padding:20,
    borderRadius:5
  },
  })
  
export default CartScreen