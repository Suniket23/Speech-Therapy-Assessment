

import React, {useState} from 'react';
import { LogBox } from "react-native";

import {
  
  StyleSheet,

} from 'react-native';

import { NativeBaseProvider,  VStack} from "native-base";

import Icon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "native-base";




function AssignCards({navigation}){
 

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return(
    <NativeBaseProvider>
      
      <VStack space={4} alignItems="center" style={styles.container}>
        <Button w={240} height={140} padding={50} style={styles.button}  endIcon={<Icon name="select-arrows" size={40} color="#FFF"/>} >
            Select Category
        </Button>
        <Button w={240} height={140} padding={50} colorScheme='blueGray'  endIcon={<Icon name="select-arrows" size={40} color="#FFF"/>} >
            Select SubCategory
        </Button>
        <Button colorScheme='green' endIcon={<MIcon name="assignment" size={40} color= "#FFF"/>}>
        Assign
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
export default AssignCards;