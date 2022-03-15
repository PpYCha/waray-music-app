import React from 'react'
import {SafeAreaView, Text} from 'react-native'


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen'
import  MusicScreen  from './src/screens/MusicScreen';


const Stack = createNativeStackNavigator();

const App = () => {


  return (
   
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   
  )
}

export default App