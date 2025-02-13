import { Tabs } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const Tabslayout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
            backgroundColor:'white',
            position:'absolute',
            borderTopColor:"#0061FF1A",
            borderTopWidth:1,
            height: 60, // Height badhane se aur centered lagega
          justifyContent: 'center', // Ensures centering
          alignItems: 'center', // Ensures centering
          
        }
    }}
    >
      
      <Tabs.Screen 
        name='index'
        options={{
            title:'Jobs',
            headerShown:false,
            
            tabBarIcon:({focused})=>(
              <View style={{ alignItems: 'center', marginTop:8 }}>
              <Feather name='search' size={28} color={focused ? 'orange' : 'gray'} />
              <Text style={{ fontSize: 12, color: focused ? 'orange' : 'gray' }}>Jobs</Text>
            </View>
           
            )
        }}
        />

<Tabs.Screen name="Bookmarks" 
options={{ 
  title: 'Bookmarks',
 headerShown: false ,
 tabBarIcon:({focused})=>(
  <View style={{ alignItems: 'center',marginTop:8 }}>
              <Feather name='bookmark' size={28} color={focused ? 'orange' : 'gray'} />
              <Text style={{ fontSize: 12, color: focused ? 'orange' : 'gray' }}>Save</Text>
            </View>

)

  
}} 

/>
    </Tabs>
  )
}

export default Tabslayout