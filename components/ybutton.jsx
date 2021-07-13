import React from 'react'

import { Pressable ,Text } from 'react-native'


const YButton = ({ children  , textStyle, ...props }) =>{
  return(
    <Pressable {...props}>
      <Text style={textStyle}>
        {children}
      </Text>
    </Pressable>
  )
}

export default YButton