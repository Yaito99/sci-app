import React , { useContext , useCallback , useState } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import { StyleSheet, Text, View , Image , Alert , Pressable , ActivityIndicator } from 'react-native';
import YButton from '../components/ybutton'
import { MaterialCommunityIcons , FontAwesome , Feather  } from '@expo/vector-icons'; 

import { Logged } from '../contexts/logged'

const ProfileScreen = ({ navigation }) => {
  const { logged , setLogged ,signOut } = useContext(Logged)
  const [ extra , setExtra ] = useState({})
  const [ orders , setOrders ] = useState([])  
  const [loading , setLoading ] = useState(true)  
  useFocusEffect(
    useCallback(()=>{
      const fetchData = async () =>{
        try{
          const resp = await axios.get(`https://technologyterrain.com/sciapi/user/${logged.id}`)
          logged.id === resp.data[0].id ? setLogged(resp.data[0]) : null
          const resp2 = await axios.get(`https://technologyterrain.com/sciapi/profile/user/orders/${logged.id}`)
          if(resp2.data.length > 0){
          logged.id === resp2.data[0].userid ? setOrders(resp2.data) : null     
          } 
          if(logged.type === 20){
            const resp = await axios.get(`https://technologyterrain.com/sciapi/products/shopinfo/${logged.id}`)
            logged.id === resp.data[0].id ? setExtra(resp.data[0]) : null            
          }
          setLoading(false)
        }catch(err){
          console.log(err)
        }
      }
      fetchData()  
    },[axios])
    )

  return (
    <View style={styles.container}>
      <View style={styles.firsthalf}>      
        <Image
          style={styles.profile_image}
          source={{uri:`https://technologyterrain.com/sciapi/uploads/${logged.profile_img}`}}
        />
        <Pressable style={{ position:'absolute', right:10,top:10, height:25,width:25}} onPress={()=>navigation.navigate('Userorders')}>
          <FontAwesome name="bell" size={25}  color="#fee644" />
        {         
          orders.length > 0 ? 
          <View style={styles.badgecontainer}>
            <Text style={{fontSize:7.5,color:"white",padding:3.5}}>10</Text>                           
          </View> : null
        }
        </Pressable>
        <Pressable style={{ position:'absolute', left:10,top:10, height:25,width:25}} onPress={()=>navigation.navigate('Userorders')}>
          <Feather name="package" size={24} color="#fee644" />
          {         
            orders.length > 0 ?           
          <View style={styles.badgecontainer2}>
            <Text style={{fontSize:7.5,color:"white",padding:3.5}}>{orders.length}</Text>                           
          </View> : null
          }
        </Pressable>                
        <Text style={styles.profile_name}>{logged.name}</Text>
        <Text style={styles.profile_username}>@{logged.username}</Text> 
        <Pressable style={styles.profile_edit} onPress={()=>navigation.navigate('ProfileEdit')}>
          <MaterialCommunityIcons name="pencil" size={24} color="#fee644" />        
        </Pressable>              
      </View>
      <View style={styles.secondhalf}>
        <View style={{marginTop:35}} />
        <View style={styles.infoItem}>
          <View style={styles.leftside}>
            <MaterialCommunityIcons name="email" size={24} color="#fee644" />           
          </View>
          <View style={styles.rightside}>
            <Text style={{color:'#003365',marginLeft:5 }}>{logged.email}</Text>      
          </View>            
        </View>
        <View style={styles.infoItem}>
          <View style={styles.leftside}>
            <MaterialCommunityIcons name="phone" size={24} color="#fee644" />           
          </View>
          <View style={styles.rightside}>
            <Text style={{color:'#003365',marginLeft:5 }}>{logged.phone}</Text>      
          </View>            
        </View>
        <View style={styles.infoItem}>
          <View style={styles.leftside}>
            <MaterialCommunityIcons name="home-modern" size={24} color="#fee644" />           
          </View>
          <View style={styles.rightside}>
            <Text style={{color:'#003365',marginLeft:5 }}>{logged.address}</Text>      
          </View>            
        </View>  
        {
          logged.type === 1 ?
          <YButton onPress={()=>navigation.navigate('Partnership')} textStyle={{color:'#fee644',fontWeight:'bold'}} style={styles.button_1}>Become A Partner</YButton> 
          : logged.type === 2 ?
          <YButton onPress={()=>Alert.alert('Your Partner Request is still on review')} textStyle={{color:'#fee644',fontWeight:'bold'}} style={styles.button_2}>Request is on review</YButton> 
          : logged.type === 100 ?
          <YButton onPress={()=>navigation.navigate('Administration')} textStyle={{color:'#000000',fontWeight:'bold'}} style={styles.button_3}>Admin Panel</YButton> 
          : logged.type === 20 ?
          <View style={{flexDirection:'row'}}>
            <YButton onPress={()=>navigation.navigate('Shoppanel')} textStyle={{color:'#003365',fontWeight:'bold'}} style={styles.button_4}>Partner Panel</YButton> 
            <YButton onPress={()=>navigation.navigate('Orderpanel')} textStyle={{color:'#003365',fontWeight:'bold'}} style={styles.button_4}>Orders</YButton> 
          </View>
          : logged.type === 30 ?
          <View style={{flexDirection:'row'}}>
            <YButton onPress={()=>navigation.navigate('Shoppanel')} textStyle={{color:'#003365',fontWeight:'bold'}} style={styles.button_4}>Partner Panel</YButton> 
            <YButton onPress={()=>navigation.navigate('Orderpanel')} textStyle={{color:'#003365',fontWeight:'bold'}} style={styles.button_4}>Orders</YButton> 
          </View>          
          : null
        }
        <View>
          <YButton onPress={signOut} textStyle={{color:'white'}} style={{backgroundColor:'red', marginTop:30 , padding:10,borderRadius:5}}>
            Logout 
          </YButton>
        </View>                       
      </View>
      <View style={styles.dashbored}>
        <View style={styles.dashboreditem}>
          <Text>Orders</Text>
          <Text style={styles.dashvalue}>{logged.type === 20 ? extra.orders :logged.orders}</Text>          
        </View>
        <View style={styles.dashboreditem}>
          <Text>{logged.type === 20 ? 'Products' : 'Bought'}</Text>
          <Text style={styles.dashvalue}>{logged.type === 20 ? extra.products : logged.products}</Text>          
        </View>
        <View style={styles.dashboreditem}>
          <Text>{logged.type === 20 ? 'Followers' : 'Favourites'}</Text>
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
    flex: 5 ,
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
    marginHorizontal:5,    
    alignItems:'center'
  },  
  button_3:{
    width:140,
    backgroundColor:'#05cd7a',
    padding:10,
    marginTop:10,
    marginHorizontal:5,    
    borderRadius:5,
    alignItems:'center'
  },  
  button_4:{
    width:140,
    backgroundColor:'#fee644',
    padding:10,
    marginTop:10,
    borderRadius:5,
    marginHorizontal:5,    
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
    right: -3, 
    top: -3
  },  
  badgecontainer2:{
    flex:1,
    alignItems:'center',
    backgroundColor:'red',
    borderRadius:50, 
    textAlign:'center', 
    position: 'absolute', 
    zIndex: 99, 
    left: -3, 
    top: -3
  },   
});


export default ProfileScreen