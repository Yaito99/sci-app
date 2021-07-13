import React , { createContext , useState } from 'react'

export const LocationCon = createContext([{latitude:0.0000,longitude:0.0000},{latitude:0.0000,longitude:0.0000}])

export default function Loca ({ children }){
  const [loc, setloc] = useState([{latitude:0.0000,longitude:0.0000},{latitude:0.0000,longitude:0.0000}])
  function update1stLoction(value) {
    let array = []
    array.push(value)
    array.push(loc[1])
    setloc(array)    
  }
  function update2ndLoction(value) {
    let array = []
    array.push(loc[0])
    array.push(value)
    setloc(array)    
  }
  function resetLocation() {
    setloc([{latitude:0.0000,longitude:0.0000},{latitude:0.0000,longitude:0.0000}])  
  }  
  
  
  return(
    <LocationCon.Provider value = {{loc,update1stLoction,update2ndLoction,resetLocation}}>
      {children}  
    </LocationCon.Provider>
  )
}