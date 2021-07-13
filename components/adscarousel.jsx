import React from 'react'

import { StyleSheet , View , Text , ScrollView  } from 'react-native'

import AdItem from '../components/aditem'


const AdsCarousel = () =>{
  return(
    <View style={styles.container}>
      <ScrollView style={{flexGrow:0}} showsHorizontalScrollIndicator={false} horizontal >
        <AdItem imgurl={require('../assets/aditem01.jpg')}/>
        <AdItem imgurl={require('../assets/aditem03.jpg')}/>
        <AdItem imgurl={require('../assets/aditem04.jpg')}/>
        <AdItem imgurl={require('../assets/aditem05.jpg')}/>        
        <AdItem imgurl={require('../assets/aditem02.jpg')}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical:5
  }
});


export default AdsCarousel