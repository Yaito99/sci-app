import React from 'react'

import Log from './logged'
import TheCart from './cart'
import Cata from './catagory'
import Loca from './location'
const PuplicState = ({ children }) =>{
  return(
      <Log>
        <TheCart>
          <Cata>
            <Loca>
              {children}                  
            </Loca>
          </Cata>
        </TheCart>
      </Log>    
  )
}


export default PuplicState