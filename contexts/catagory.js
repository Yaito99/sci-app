import React , { createContext , useState } from 'react'

export const Catagory = createContext()

export default function Cata ({ children }){
  const [catagoryState, setCatagory] = useState({id:0})
  function updateCatagory(value) {
    setCatagory(value)
  }
  return(
    <Catagory.Provider value = {{catagoryState, updateCatagory}}>
      {children}  
    </Catagory.Provider>
  )
}