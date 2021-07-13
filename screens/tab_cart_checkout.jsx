import React,{ useContext , useEffect , useState } from 'react';
import axios from 'axios';

import { StyleSheet, Text, View , ScrollView , TextInput , Alert , Pressable , Dimensions  } from 'react-native';

import CartItem from '../components/cartitem'
import YButton from '../components/ybutton'
import { Ionicons } from '@expo/vector-icons'; 
import { Logged } from '../contexts/logged'
import { Cart } from '../contexts/cart'
import { LocationCon } from '../contexts/location'

const CheckoutScreen = ({ navigation }) => {
  const { logged } = useContext(Logged)  
  const { cart , resetCart } = useContext(Cart)
  const { loc } = useContext(LocationCon)
  const [shops , setShops] = useState([])   
  const [price , setPrice] = useState(0)    
  const [total , setTotal] = useState(0)  
  const [isEnabled, setIsEnabled] = useState(false);
  const [name , setName] = useState(logged.name)    
  const [phone , setPhone] = useState(logged.phone)    
  const [province , setProvince] = useState('')  
  const [area , setArea] = useState('')    
   
  const [req , setReq] = useState(true)    
  useEffect(()=>{
    let prices = 0   
    let owners = []   
    cart.map(item => {prices = (item.price * item.quantity) + prices;owners.includes(item.shop.username) ? null : owners.push(item.shop.username)})  
    setShops(owners)
    setPrice(prices)
    setTotal(prices)
  }, [cart])
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const checkOut =  () =>{
    cart.map(item =>{
      axios.post('https://technologyterrain.com/sciapi/checkout/productorder',{
        userid:logged.id,
        name:name,
        phone:phone,
        province:province,
        area:area,
        cords:loc[0],
        itemId:item.id,
        shopname:item.shop.username,
        quantity:item.quantity,
        price:item.price * item.quantity
      })
      .then(function (response) {
        Alert.alert(`Item ${item.id} has been ordered`)
      })
      .catch(function (error) {
        Alert.alert(error.message)
      });
    })
    shops.map(shop =>{
      axios.post('https://technologyterrain.com/sciapi/checkout/shoporder',{
        userid:logged.id,
        shopname:shop,
      })
      .then(function (response) {
        console.log(`Shop ${shop} has been ordered`)
      })
      .catch(function (error) {
        Alert.alert(error.message)
      });
    })    
    if(req){
      resetCart()
      navigation.goBack();      
      navigation.navigate('Home')      
    }
  }
  return (
    <View style={styles.container}>
      <View style={{flex:3}}>
      <ScrollView contentContainerStyle={{paddingHorizontal:15,}}>
        {
          cart.map(item=>(<CartItem key={item.id} item={item} checkout navigation={navigation} />))
        }
      </ScrollView>
        
      </View>  
      <View style={{flex:3 , paddingHorizontal:15 }}>
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            value={name}        
            placeholder="Full Name"
          />
        <TextInput
          style={styles.input}
          onChangeText={text => setPhone(text)}
          value={phone}
          placeholder="Phone Number"
        />
        <View style={{flexDirection:'row'}}>
          <TextInput
            style={styles.inputs}
            onChangeText={text => setProvince(text)}
            value={province}         
            placeholder='Province EX:Sohag' 
          />
          <TextInput
            style={styles.inputs}
            onChangeText={text => setArea(text)}
            value={area}    
            placeholder='Area EX:Tahta'                   
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text>Select Your Location</Text>
          <Pressable onPress={()=>navigation.navigate('LocationSelector',{order:1})} style={{alignSelf:'center',padding:5,borderRadius:5,backgroundColor:'#003365'}} >
            <Ionicons name="location-outline" size={24} color="#fee644" />
          </Pressable>        
        </View>
        <TextInput
          style={styles.input}
          value={loc[0].latitude< 1 ? '' : loc[0].latitude + ',' + loc[0].longitude}
          editable={false}
          placeholder='Select Location'           
        />        
      </View>      
      <View style={{flex:1 , paddingHorizontal:15 }}>
        <Text>Delivery Fee     : ??? EGP</Text>      
        <Text>Items Amount : {price} EGP</Text>
        <View style={{borderTopWidth:2, marginVertical:5 , borderTopColor:'#003365'}} />
        <Text>Total Amount  : {total} EGP</Text>
      </View>
      <View style={styles.checkout}>
        <YButton onPress={()=>logged ? checkOut() : navigation.navigate('Sign')} style={styles.checkout_button} textStyle={{color:'#fee644',textAlign:'center',textTransform:'uppercase',fontWeight:'700'}}>Checkout with {total}.00 EGP</YButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  checkout:{
    backgroundColor:'white',

  },
  checkout_button:{
    backgroundColor:'#003365',
    borderBottomWidth:1,
    borderColor:'#fee644',
    padding:20,
  },  
  input:{
    height: 40,
    borderColor: 'rgba(0, 91, 150,0.2)',
    borderWidth: 1 ,
    borderRadius:7,
    paddingHorizontal:5,
    marginVertical:5
  },
  inputs:{
    flex:1,
    height: 40,
    borderColor: 'rgba(0, 91, 150,0.2)',
    borderWidth: 1 ,
    borderRadius:7,
    paddingHorizontal:5,
    marginVertical:5
    
  },  
  inputlabel:{
    color:'#003365',
    marginLeft:5,
    marginBottom:5
  },
  formOption:{
    marginVertical:15,
  },  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },  
  })
  
export default CheckoutScreen