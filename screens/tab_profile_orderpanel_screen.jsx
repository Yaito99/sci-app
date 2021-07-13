import React , { useContext , useState , useEffect } from 'react';
import axios from 'axios';


import { StyleSheet, Text, View , Image , Alert , TextInput } from 'react-native';
import OrderItem from '../components/orderitem'

import { Logged } from '../contexts/logged'
import { ScrollView } from 'react-native-gesture-handler';


const OrdersPanelScreen = ({ navigation }) => {
  const { logged } = useContext(Logged)
  const [orders , setOrders ] = useState([])
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        if(logged.type === 20){
        const resp = await axios.get(`https://technologyterrain.com/sciapi/profile/shop/orders/${logged.id}`)
        resp.data.length > 0 ? setOrders(resp.data) : setOrders([])
        }
        else if (logged.type === 30){
          const resp = await axios.get(`https://technologyterrain.com/sciapi/delivery/orders/${logged.id}`)
          resp.data.length > 0 ? setOrders(resp.data) : setOrders([])          
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[axios])
  return (  
    <View style={styles.container}>     
      <ScrollView contentContainerStyle={{    paddingHorizontal:20}}>
        {
          orders.map(order =>
            <OrderItem key={order.id} navigation={navigation} order={order} delivery={logged.type===30} />
          )
        }      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
});


export default OrdersPanelScreen