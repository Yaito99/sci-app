import React , { useState,useContext } from 'react';
import axios from 'axios'

import { StyleSheet, Text, View , Image ,ScrollView, Pressable , TextInput , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';

import { Cart } from '../contexts/cart'
import { Logged } from '../contexts/logged'

const ItemScreen = ({ route , navigation }) => {
  const {cart, addItem} = useContext(Cart)
  const { logged } = useContext(Logged)
  const item = route.params.itemData
  const shop = route.params.shopInfo 
  const [starCount , setStarCount] = useState(item.rating)
  const rating = shop.rates/shop.raters
  const [shopStarCount , setShopStarCount] = useState(rating)  
  const [admin ] = useState(logged.id === item.shopid)  
  const [name , setName] = useState(item.name)
  const [quantity , setQuantity] = useState(String(item.quantity))
  const [price , setPrice] = useState(String(item.price))
  const [pDesc , setPDesc] = useState(item.description)
  const itemEdit = () => {
    axios.post('https://technologyterrain.com/sciapi/products/edititem' ,{
       id:item.id,
       name:name, 
       desc:pDesc,
       quantity:quantity,
       price:price
      })
    .then(function (response) {
      Alert.alert("SUCCSUSS")
    })
    .catch(function (error) {
      Alert.alert("FAILED , Please fill up all the fields")
      console.log(error)      
    });
  } 
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.itemImage}
          source={{uri:`https://technologyterrain.com/sciapi/uploads/${item.img}`}}
        />            
        {
          admin ?
          <Pressable style={styles.btn} onPress={itemEdit} >
            <Icon name="edit" size={30} color="#fee644" />      
          </Pressable>
          :
          <Pressable style={styles.btn} onPress={()=>addItem(cart,item,shop)} >
            <Icon name="add-shopping-cart" size={30} color="#fee644" />      
          </Pressable>
        }
      </View>
      {
        admin ? 
        <ScrollView contentContainerStyle={{marginHorizontal:10}} >
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text)=>setName(text)}
          />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={styles.formOption}>
              <Text style={styles.inputlabel}>Product Price</Text>        
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={(text)=>setPrice(text)}
              />
            </View>  
            <View style={styles.formOption}>
              <Text style={styles.inputlabel}>Product Quantity</Text>        
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={(text)=>setQuantity(text)}
              />
            </View>     
          </View>
          <TextInput
            style={styles.input}
            value={pDesc}
            onChangeText={(text)=>setPDesc(text)}
            multiline
            numberOfLines={15}
            textAlignVertical="top"
          />
        </ScrollView>      
        :
        <ScrollView contentContainerStyle={{marginHorizontal:10}} >
        <Text style={styles.header}>{item.name}</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={styles.price}>{item.price}EGP</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={(rating) => setStarCount(rating)}
            starSize={30}
          />
        </View>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={{fontWeight:'bold'}}>About Seller</Text>
        <Pressable style={{flexDirection:'row' , backgroundColor:'#003365' , padding:5 , borderWidth:1 , borderRadius:10 }} onPress={()=> navigation.navigate('VisitProfile' , {shopData:shop})}>
          <View style={{flex:2, justifyContent:'center'}}>
          <Image
            style={styles.shopicon}
            source={{uri:`https://technologyterrain.com/sciapi/uploads/${shop.profile_img}`}}
          />             
          </View>
          <View style={{flex:3}}>
            <Text style={styles.shop}>@{shop.username}</Text>
            <Text style={styles.shop}>{shop.name}</Text>
            <View style={{marginVertical:5}}>
              <StarRating
                disabled={true}
                maxStars={10}
                rating={shopStarCount}
                selectedStar={(rating) => setShopStarCount(rating)}
                starSize={20}
                fullStarColor="#fee644cc"
              />            
            </View>
          </View>

        </Pressable>
      </ScrollView>
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
    fontSize:20,
    marginVertical:20
  },
  imageContainer:{
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#003365'
  },
  desc:{
    marginVertical:5
  },
  price:{
    color:'red',
    fontWeight:'bold',
    fontSize:20,
    marginLeft:10
  },
  itemImage:{
    height:250,
    width:350
  },
  btn:{
    position:'absolute',
    right:5,
    bottom:5,
    borderRadius:50,
    padding:5,
    borderColor:'#fee644',
    borderWidth:2
  },
  input:{
    minHeight:40,
    borderColor: '#00336580',
    borderWidth: 1 ,
    borderRadius:7,
    paddingHorizontal:5
  },
  inputlabel:{
    color:'#003365',
    marginLeft:5,
    marginBottom:5
  },
  inputlabeltwo:{
    backgroundColor:'#003365',
    padding:5,
    fontSize:16,
    color:'#fee644',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },  
  formOption:{
    marginVertical:5,
  },    
  shopicon:{
    height:120,
    width:120,
    borderRadius:150,
    top:1,
    right:1,
    borderWidth:1,
    borderColor:'#003365'
  },  
  shop:{
    color:'#fee644',
    fontSize:20,
    marginVertical:5
  },  
  })
  
export default ItemScreen