import React, {useState} from 'react';

import {
  
  StyleSheet,
} from 'react-native';

import { NativeBaseProvider, Box, VStack} from "native-base";


import Home from './Pages/Home';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import Create from './Pages/Create';
import Voice from './Pages/Voice';
import Category from './Pages/Category.';
import Voice1 from './Pages/Voice1';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

 
const Stack = createNativeStackNavigator();

function App(){


  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Create' >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create" component={Create} /> 
          <Stack.Screen name="Category" component={Category} />      
          <Stack.Screen name="Voice1" component={Voice1} />
        </Stack.Navigator>
      </NavigationContainer> 

    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignContent:'center',
    justifyContent:'center',
     
  },
 
 
})
export default App;