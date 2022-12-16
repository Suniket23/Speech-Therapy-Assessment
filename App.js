import React, {useState} from 'react';

import {
  
  StyleSheet,
} from 'react-native';

import { NativeBaseProvider, Box, VStack} from "native-base";


import Home from './Pages/Home';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import Create from './Pages/Create';
// import Voice from './Pages/Voice';
import Category from './Pages/Category';
import Voice1 from './Pages/Voice1';
import SubCategory from './Pages/SubCategory';
import User from './Pages/User';
import Display from './Pages/Display';
import Delete from './Pages/Delete';
import DeleteSubCategory from './Pages/DeleteSubCategory';
import ChooseSubDelete from './Pages/ChooseSubDelete';
import Update from './Pages/Update';
import SubUpdate from './Pages/SubUpdate'
import ChooseOptions from './Pages/ChooseOptions'

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DeleteCategory from './Pages/DeleteCategory';

 
const Stack = createNativeStackNavigator();

function App(){


  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='StartScreen' >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create" component={Create} /> 
          <Stack.Screen name="Category" component={Category} /> 
          <Stack.Screen name="SubCategory" component={SubCategory} /> 
          <Stack.Screen name="Display" component={Display} />  
          <Stack.Screen name="User" component={User} />   
          <Stack.Screen name="Delete" component={Delete} /> 
          <Stack.Screen name="DeleteSubCategory" component={DeleteSubCategory} /> 
          <Stack.Screen name="ChooseSubDelete" component={ChooseSubDelete} /> 
          <Stack.Screen name="DeleteCategory" component={DeleteCategory} /> 
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen name="SubUpdate" component={SubUpdate} />
          <Stack.Screen name="ChooseOptions" component={ChooseOptions} />
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