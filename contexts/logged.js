import React , { createContext , useState , useEffect } from 'react'


import AsyncStorage from '@react-native-async-storage/async-storage';


export const Logged = createContext(0)

export default function Log ({ children }){
  const [logged, setLogged] = useState(0)
  function signIn(value) {
    setLogged(value)
    const jsonValue = JSON.stringify(value)      
    AsyncStorage.setItem('SCI_APP::USER_VALUE', jsonValue);    
  }
  function signOut() {
    setLogged(0)
    AsyncStorage.setItem('SCI_APP::USER_VALUE', '');    
  }  
  
  useEffect(() => {
    if (logged !== 0) {
      const jsonValue = JSON.stringify(logged)      
      AsyncStorage.setItem('SCI_APP::USER_VALUE', jsonValue);
    }
  }, [logged]);

  useEffect(() => {
    AsyncStorage.getItem('SCI_APP::USER_VALUE').then((value) => {
      if (value) {
        setLogged(JSON.parse(value));
      }
    });
  }, []);

  return(
    <Logged.Provider value = {{logged, signIn , signOut , setLogged}}>
      {children}  
    </Logged.Provider>
  )
}