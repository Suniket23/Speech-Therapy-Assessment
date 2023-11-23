

import React, {useState} from 'react';
import { LogBox } from "react-native";

import Background from '../src/components/Background'
import Logo from '../src/components/Logo'
import Header from '../src/components/Header'
import Paragraph from '../src/components/Paragraph'
// import Button from '../src/components/Button'


import {
  
  StyleSheet,

} from 'react-native';

import { NativeBaseProvider,  VStack} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "native-base";




function Home({navigation}){
 

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return(
    
    <NativeBaseProvider>
      <Button
        mode="outlined"
        colorScheme='gray'
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>

      <VStack space={4} alignItems="center" style={styles.container}>
        
       
        <Button w={240} height={140} padding={50} colorScheme='blueGray'  endIcon={<Icon name="th-list" size={40} color="#FFF"/>} onPress={() => navigation.navigate('PatientsList')}>
         Patients List
        </Button>
        <Button w={240} height={140} padding={50} colorScheme='teal' endIcon={<MIcon name="cards" size={40} color= "#FFF"/>} onPress={() => navigation.navigate('Cards')}>
          Cards
        </Button>
        
        
      </VStack>
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
export default Home;