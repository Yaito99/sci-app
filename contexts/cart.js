import React , { createContext , useState , useEffect } from 'react'

export const Cart = createContext()

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TheCart ({ children }){
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (cart.length >  0) {
      const jsonValue = JSON.stringify(cart)      
      AsyncStorage.setItem('SCI_APP::CART_ITEMS', jsonValue);
    }
  }, [cart]);

  useEffect(() => {
    AsyncStorage.getItem('SCI_APP::CART_ITEMS').then((value) => {
      if (value) {
        setCart(JSON.parse(value));
      }
    });
  }, []);

  function resetCart() {
    setCart([])
    AsyncStorage.setItem('SCI_APP::CART_ITEMS', '');      
  }

  function addItem(cart, itemToAdd , shop) {
    const itemExists = cart.find(
      item=> item.id ===itemToAdd.id
    )

    if(itemExists){
      const newCart=cart.map(item=>
        item.id===itemToAdd.id ? {...item , quantity:item.quantity+1 } : item
        )
        const jsonValue = JSON.stringify(newCart)      
        AsyncStorage.setItem('SCI_APP::CART_ITEMS', jsonValue);          
        return  setCart(newCart)
      }
    const newCart = [...cart ,{...itemToAdd , shop:{...shop} , quantity:1} ]
    const jsonValue = JSON.stringify(newCart)      
    AsyncStorage.setItem('SCI_APP::CART_ITEMS', jsonValue);       
    return setCart(newCart)
  }
  function removeItem(cart, itemToRemove) {
    const itemExists = cart.find(
      item=> item.id ===itemToRemove.id
    )
    if(itemExists && itemToRemove.quantity > 1 ){
      const newCart=cart.map(item=>
        item.id===itemToRemove.id ? {...item , quantity:item.quantity - 1 } : item
        )
        const jsonValue = JSON.stringify(newCart)      
        AsyncStorage.setItem('SCI_APP::CART_ITEMS', jsonValue);           
        return setCart(newCart)
      }
  }  
  function destroyItem(cart, itemToDestroy) {
    const itemExists = cart.find(
      item=> item.id ===itemToDestroy.id
    )
    if(itemExists){
     const newCart=cart.filter(item=>
        item.id !==itemToDestroy.id
        )
        const jsonValue = JSON.stringify(newCart)      
        AsyncStorage.setItem('SCI_APP::CART_ITEMS', jsonValue);           
        return setCart(newCart)
      }
      else{console.log('failed')}
  }  
  return(
    <Cart.Provider value = {{cart, addItem , removeItem , destroyItem , resetCart}}>
      {children}  
    </Cart.Provider>
  )
}