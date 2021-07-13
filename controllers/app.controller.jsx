import React , { useContext }  from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileController from './profile.controller'
import HomeController from './home.controller'
import CartController from './cart.controller'

import SignScreen from '../screens/tab_sign_screen'

import ItemScreen from '../screens/stack_item_screen'
import NotficationScreen from '../screens/stack_notfication_screen'
import VistProfileScreen from '../screens/stack_visit_profile_screen';
import LocationScreen from '../screens/stack_location_screen';
import LocationShowScreen from '../screens/stack_locationshow_screen';
import FavScreen from '../screens/tab_favorites_screen'
import DeliveryScreen from '../screens/stack_delivery_screen'

import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Cart } from '../contexts/cart'
import { Logged } from '../contexts/logged'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



export default function AppNavigator({navigation}) {
  return (
    <Stack.Navigator initialRouteName="App" screenOptions={{ headerStyle:{backgroundColor:"#003365"},headerTintColor:"#fee644"}}  >      
      <Stack.Screen name="App" options ={{headerShown: false}} component={AppTabNavigator} />
      <Stack.Screen name="Item" options={({ route }) => ({ title: route.params.itemData.name })} component={ItemScreen} />                     
      <Stack.Screen name="Notfication" options ={{headerShown: false}} component={NotficationScreen} />
      <Stack.Screen name="VisitProfile" options={({ route }) => ({ title: route.params.shopData.username })} component={VistProfileScreen} />                       
      <Stack.Screen name="LocationSelector" component={LocationScreen} options={() => ({ title: "Location Picker" })}  />
      <Stack.Screen name="LocationShow" component={LocationShowScreen} options={() => ({ title: "Location Shower" })}  />
      <Stack.Screen name="Delivery" component={DeliveryScreen} options={() => ({ title: "Get Delivery" })}  />
    </Stack.Navigator>
  );
}


function AppTabNavigator({navigation}) {
  const { cart } = useContext(Cart);
  const { logged } = useContext(Logged);
  return (
    <Tab.Navigator 
      activeColor="#fee644"
      inactiveColor="#fee64480"
      barStyle={{ backgroundColor: '#003365' }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeController}         
        options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        }} />
      <Tab.Screen name="Cart" component={CartController}           
        options={{
        tabBarLabel: 'Cart',
        tabBarBadge:cart.length ? cart.length : null ,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cart" color={color} size={26} />
        ),
        }} />     
      <Tab.Screen name="Favorites" component={FavScreen}           
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart" color={color} size={26} />
        ),
        }} />                       
      { 
        logged ?
        <Tab.Screen name="Profile" component={ProfileController}
        options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
        }} />
        :         
        <Tab.Screen name="Sign" component={SignScreen}
        options={{
        tabBarLabel: 'Login',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="login" color={color} size={25} />
        ),
        }} />        
      }
    </Tab.Navigator>
  );
}


