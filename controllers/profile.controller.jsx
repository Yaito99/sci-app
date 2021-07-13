import React  from 'react';

import ProfileScreen from '../screens/tab_profile_screen'
import ProfileEditScreen from '../screens/tab_profile_edit_screen'
import PartnershipScreen from '../screens/tab_profile_partnership_screen'
import AdminScreen from '../screens/tab_profile_admin_screen'
import ShopScreen from '../screens/tab_profile_shop_screen'
import OrdersPanelScreen from '../screens/tab_profile_orderpanel_screen'
import UserOrdersScreen from '../screens/tab_profile_userorders_screen'

import { createStackNavigator } from '@react-navigation/stack';


const ProfileStack = createStackNavigator();

export default function ProfileController() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerStyle:{backgroundColor:"#003365"},headerTintColor:"#fee644"}}>      
      <ProfileStack.Screen options={{headerShown:false}} name="Profiler" component={ProfileScreen} />    
      <ProfileStack.Screen options={{title:'Profile Edit'}} name="ProfileEdit"  component={ProfileEditScreen} />    
      <ProfileStack.Screen options={{title:'Join Us'}} name="Partnership"  component={PartnershipScreen} />    
      <ProfileStack.Screen options={{title:'Admin Panel'}} name="Administration"  component={AdminScreen} />
      <ProfileStack.Screen options={{title:'Partner Panel'}} name="Shoppanel"  component={ShopScreen} />
      <ProfileStack.Screen options={{title:'Orders Panel'}} name="Orderpanel"  component={OrdersPanelScreen} />
      <ProfileStack.Screen options={{title:'Orders'}} name="Userorders"  component={UserOrdersScreen} />
    </ProfileStack.Navigator>
  );
}
