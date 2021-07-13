import React,{ useState , useEffect } from 'react';
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider} from 'react-query'


import FirstScreen from './screens/firstscreen'
import AppNavigator from './controllers/app.controller'

import AsyncStorage from '@react-native-async-storage/async-storage';


import PuplicState from './contexts/puplic';

const queryClient = new QueryClient()


export default function App() {
const [first , setFirst] = useState(0)
  useEffect(()=>{
    AsyncStorage.getItem('SCI_APP::FIRST_OPEN').then((value) => {
      if (value) {
        setFirst(parseInt(value));
      }
      else{
        setFirst(1)
      }
  })
})
  if (first) {
    return (
      <QueryClientProvider client={queryClient}>
        <FirstScreen setFirst = {setFirst}/>    
      </QueryClientProvider>
    );
}
else {
  return(
    <QueryClientProvider client={queryClient}>    
      <PuplicState>
        <NavigationContainer>
          <StatusBar
            animated={true}
            barStyle={'dark-content'}
            hidden={false} 
            backgroundColor="#fee644"
          />     
          <AppNavigator />
        </NavigationContainer>
      </PuplicState>
    </QueryClientProvider>
  );
}
}
