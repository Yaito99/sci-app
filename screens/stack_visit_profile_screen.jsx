import React , { useEffect , useCallback , useState , useContext } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import { StyleSheet, Text, View , Image , Alert , Pressable , ActivityIndicator } from 'react-native';
import YButton from '../components/ybutton'
import { MaterialCommunityIcons , FontAwesome , MaterialIcons  } from '@expo/vector-icons'; 
import StarRating from 'react-native-star-rating';

import { Logged } from '../contexts/logged'

const VistProfileScreen = ({ route }) => {
  const {logged} = useContext(Logged)
  const [loading , setLoading ] = useState(true)
  const [user , setUser ] = useState({})
  const [products , setProducts ] = useState([])
  const shop = route.params.shopData 
  const rating = shop.rates/shop.raters
  const [shopStarCount , setShopStarCount ] = useState(rating)  
  const [love , setLove] = useState(false)
  useEffect(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/user/${shop.id}`)
          resp.data.length > 0 ? setUser(resp.data[0]) : null
          const respB = await axios.get(`https://technologyterrain.com/sciapi/products/shop/${shop.id}`)
          respB.data.length > 0 ? setProducts(respB.data) : null    
          const respC = await axios.get(`https://technologyterrain.com/sciapi/profile/user/favourite/${shop.id}/${logged.id}`)
          setLove(respC.data.length > 0 )                
          setLoading(false)
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[axios])
  const setFavourite = ()=>{
    setLove(!love)
    if(!love){
    axios.post('https://technologyterrain.com/sciapi/profile/user/favourite/add',{
      partner:user.id,
      user:logged.id
    })
  }else{
    axios.post('https://technologyterrain.com/sciapi/profile/user/favourite/delete',{
      partner:user.id,
      user:logged.id
    })    
  }
  }
  return (
    <View style={styles.container}>
      <View style={styles.firsthalf}>
        <Pressable style={{ position:'absolute', left:10,top:10, height:25,width:25}} onPress={()=>navigation.toggleDrawer()}>
          <MaterialIcons name="report" size={28} color="#fee644" />
        </Pressable>      
        <Pressable style={{ position:'absolute', right:10,top:10, height:25,width:25}} onPress={setFavourite}>
          <FontAwesome name={love ? "heart" : "heart-o"} size={25}  color="#fee644" />
        </Pressable>      
        <Image
          style={styles.profile_image}
          source={{uri:`https://technologyterrain.com/sciapi/uploads/${user.profile_img}`}}
        />
        <Text style={styles.profile_name}>{user.name}</Text>
        <Text style={styles.profile_username}>@{user.username}</Text>              
      </View>
      <View style={styles.secondhalf}>
        <View style={{marginTop:35}} />
        <View style={styles.infoItem}>
          <View style={styles.leftside}>
            <MaterialCommunityIcons name="email" size={24} color="#fee644" />           
          </View>
          <View style={styles.rightside}>
            <Text style={{color:'#003365',marginLeft:5 }}>{user.email}</Text>      
          </View>            
        </View>
        <View style={styles.infoItem}>
          <View style={styles.leftside}>
            <MaterialCommunityIcons name="phone" size={24} color="#fee644" />           
          </View>
          <View style={styles.rightside}>
            <Text style={{color:'#003365',marginLeft:5 }}>{user.phone}</Text>      
          </View>            
        </View>
        <View style={styles.infoItem}>
          <View style={styles.leftside}>
            <MaterialCommunityIcons name="home-modern" size={24} color="#fee644" />           
          </View>
          <View style={styles.rightside}>
            <Text style={{color:'#003365',marginLeft:5 }}>{user.address}</Text>      
          </View>            
        </View>  
        <View style={{alignItems:'center' , marginVertical:10}}>
          <StarRating
            maxStars={10}
            rating={shopStarCount}
            selectedStar={(rating) => setShopStarCount(rating)}
            starSize={23}
            fullStarColor="#003365"
          />        
          <YButton textStyle={{color:'#fee644' , fontWeight:'500'}} style={{backgroundColor:'#003365', marginTop:15, padding:10, paddingHorizontal:30 , borderRadius:5 }}>
            Rate 
          </YButton>
        </View>       
      </View>
      <View style={styles.dashbored}>
        <View style={styles.dashboreditem}>
          <Text>Products</Text>
          <Text style={styles.dashvalue}>{products.length}</Text>          
        </View>
        <View style={styles.dashboreditem}>
          <Text>Rating</Text>
          <Text style={styles.dashvalue}>{rating}</Text>          
        </View>
        <View style={styles.dashboreditem}>
          <Text>Followers</Text>
          <Text style={styles.dashvalue}>156</Text>          
        </View>        
      </View>     
      {loading ? <ActivityIndicator style={{position:'absolute',top:0,bottom:0,left:0,right:0}} size={50} color="#003365" /> : null}
    </View>
  )

  }

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  dashbored:{
    flex:1,
    flexDirection:'row',
    padding:5,
    position:'absolute',
    backgroundColor:'#ffffff',
    height:75,
    width:280,
    top:245,
    left:40,
    borderRadius:10,
    shadowColor: "#003365",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    
    elevation: 13,

  },
  dashboreditem:{
    flex:1,
    paddingTop:9,
    alignItems:'center',
  },
  dashvalue:{
    color:'#003365',
    marginTop:6,
    fontWeight:'bold'
  },
  firsthalf:{
    flex: 6 ,
    backgroundColor: "#003365",
    alignItems:'center',
  },  
  profile_image:{
    height:150,
    width:150,
    borderRadius:120,
    marginVertical:20,
    borderColor:'#fee644',
    borderWidth:0.5
  },
  profile_name:{
    fontWeight:'bold',
    color:'#fee644',
    textTransform:'uppercase',
  },
  profile_username:{
    color:'#fee644ee',
    marginVertical:5
  },
  profile_edit:{
    position:'absolute',
    bottom:5,
    right:5
  },
  secondhalf:{
    flex: 7 ,
    backgroundColor: "#ffffff",
    alignItems:'center',
    paddingTop:20
  },  
  infoItem:{
    flexDirection:'row',
    alignItems:'center',
    width:300,
    borderColor: '#003365',
    borderWidth: 1 ,    
    marginVertical:10
  },
  leftside:{
    flex:3,
    height: 40,
    backgroundColor:'#003365', 
    alignItems:'center',
    justifyContent:'center'   
  },
  rightside:{
    flex:15,    
    height: 40,
    justifyContent:'center',   
  },
  button_1:{
    width:150,
    backgroundColor:'#003365',
    padding:10,
    marginTop:10,
    borderRadius:5,
    alignItems:'center'
  },
  button_2:{
    width:160,
    backgroundColor:'#003365',
    padding:10,
    marginTop:10,
    borderRadius:5,
    alignItems:'center'
  },  
  button_3:{
    width:140,
    backgroundColor:'#05cd7a',
    padding:10,
    marginTop:10,
    borderRadius:5,
    alignItems:'center'
  },  
  button_4:{
    width:140,
    backgroundColor:'#fee644',
    padding:10,
    marginTop:10,
    borderRadius:5,
    alignItems:'center'
  },  

  badgecontainer:{
    flex:1,
    alignItems:'center',
    backgroundColor:'red',
    borderRadius:50, 
    textAlign:'center', 
    position: 'absolute', 
    zIndex: 99, 
    right: 0, 
    top: 0
  },  
});


export default VistProfileScreen