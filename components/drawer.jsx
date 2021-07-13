import React , { useContext , useEffect , useState } from 'react'
import axios from 'axios'

import { Image } from 'react-native'
import { DrawerContentScrollView , DrawerItem } from '@react-navigation/drawer';


import CatagoryData from '../appdata/catagory.data'


import { Catagory } from '../contexts/catagory'



const CustomDrawer = ({props}) =>{
  const { catagoryState ,updateCatagory } = useContext(Catagory)
  const [ categories , setCategories ] = useState([])
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const resp = await axios.get(`https://technologyterrain.com/sciapi/categories/all`)
        resp.data.length > 0 ? setCategories(resp.data) : setCategories([])
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[axios])
  return(
  <DrawerContentScrollView style={{backgroundColor:'#003365cc',borderBottomWidth:1 , borderBottomColor:'#fee644'}} {...props}>
    {
      categories.map(catagory =>(
        <DrawerItem 
          key={catagory.id} 
          focused={catagoryState.id === catagory.id}
          label={catagory.name}
          labelStyle={catagoryState.id === catagory.id ? {fontWeight:'bold' , color:'#fee644'} : {color:'#fee644cc'}} 
          onPress={()=>updateCatagory(catagory)} 
          activeBackgroundColor="#003365"      
          icon={({ focused, color, size }) => (
            <Image
              source={{uri:`https://technologyterrain.com/sciapi/uploads/${catagory.img}`}}              
              style={catagoryState.id === catagory.id ? {height: size, width: size , tintColor:'#fee644'} : { height: size, width: size , tintColor:'white'} }
              resizeMode="contain"
            />
          )}
        />))
    }    
</DrawerContentScrollView>)
}


export default CustomDrawer

