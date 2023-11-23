

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




function Patient({navigation}){
 

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return(
    <NativeBaseProvider>
      
      <VStack space={4} alignItems="center" style={styles.container}>
        <Button w={240} height={140} padding={50} style={styles.button}  endIcon={<Icon name="plus-circle" size={40} color="#FFF"/>} onPress={() => navigation.navigate('AssignCards')} >
       Assign Cards
        </Button>
        <Button w={240} height={140} padding={50} colorScheme='blueGray'  endIcon={<Icon name="edit" size={40} color="#FFF"/>} onPress={() => navigation.navigate('NotifyAssessment')}>
         Notify Assessment
        </Button>
        
        <Button w={240} height={140} padding={45} colorScheme='yellow' endIcon={<MIcon name="message" size={40} color= "#FFF"/>} onPress={() => navigation.navigate('Feedback')}>
          Give Feedback Message
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
export default Patient;