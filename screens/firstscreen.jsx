import React , { useState } from 'react';

import SiderData from '../appdata/firstscreen.data'

import { StyleSheet, Text, View , StatusBar } from 'react-native';
import SiderItem from '../components/sideritem';
import SiderSelector from '../components/siderselector';


const FirstScreen = ({setFirst}) => {
  const [select , setSelect] = useState(0)
  const sidermax = SiderData.length - 1 
  return (
    <View style={styles.container}>
    <StatusBar
    animated={true}
    barStyle={'default'}
    hidden={false} />
      <View style={{flex:1}}/>
      <SiderItem 
        title={SiderData[select].title} 
        desc={SiderData[select].desc} 
        imgurl={SiderData[select].img} 
        setSelect={setSelect}
        current={select}
        end ={sidermax}
        setFirst={setFirst}
      />      
      <View style={{flex:2 , flexDirection:'row' , marginTop:20}}>
        {SiderData.map(item =>(
          <SiderSelector key={item.id} activestate={parseInt(item.id) === select + 1 ? true : false} />
        ))}       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',

  },
});


export default FirstScreen