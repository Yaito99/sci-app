import React  from 'react';
import 'react-native-gesture-handler';


import ItemScreen from '../screens/stack_item_screen'
import HomeScreen from '../screens/tab_home_screen'
import NotficationScreen from '../screens/stack_notfication_screen'
import VistProfileScreen from '../screens/stack_visit_profile_screen';

import CustomDrawer from '../components/drawer'

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

const HomeStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function HomeNavigator({navigation}) {
  return (
    <HomeStack.Navigator initialRouteName="Homee" screenOptions={{ headerStyle:{backgroundColor:"#003365"},headerTintColor:"#fee644"}}  >      
      <HomeStack.Screen name="Homee" options ={{headerShown: false}} component={HomeScreen} />
    </HomeStack.Navigator>
  );
}



export default function HomeController() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeScreen" options={{swipeEnabled:false}} component={HomeNavigator} />
    </Drawer.Navigator>
  );
}
