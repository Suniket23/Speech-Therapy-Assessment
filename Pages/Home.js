

import React, {useState} from 'react';
import { LogBox } from "react-native";

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
      
      <VStack space={4} alignItems="center" style={styles.container}>
        <Button w={250} padding={50} style={styles.button}  endIcon={<Icon name="plus-circle" size={50} color="#FFF"/>} onPress={() => navigation.navigate('Create')} >
       
        </Button>
        <Button w={250} padding={50} colorScheme='blueGray'  endIcon={<Icon name="edit" size={50} color="#FFF"/>} onPress={() => {console.warn("Button 2")}}>
         
        </Button>
        <Button w={250} padding={50} colorScheme='red' endIcon={<MIcon name="delete" size={50} color= "#FFF"/>} onPress={() => {console.warn("Button 3")}}>
          
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