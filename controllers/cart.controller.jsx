import React  from 'react';

import CartScreen from '../screens/tab_cart_screen'
import CheckoutScreen from '../screens/tab_cart_checkout'

import { createStackNavigator } from '@react-navigation/stack';


const CartStack = createStackNavigator();

export default function CartController() {
  return (
    <CartStack.Navigator screenOptions={{ headerStyle:{backgroundColor:"#003365"},headerTintColor:"#fee644"}}>      
      <CartStack.Screen options={{headerShown:false}} name="Carter" component={CartScreen} />    
      <CartStack.Screen options={{title:'Checkout'}} name="Checkout"  component={CheckoutScreen} />   
    </CartStack.Navigator>
  );
}
