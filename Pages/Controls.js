

import React, {useEffect, useState} from 'react';
import { LogBox } from "react-native";
import {Image, FlatList} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Video from 'react-native-video';

import {
  
  StyleSheet,

} from 'react-native';

import { NativeBaseProvider,  VStack} from "native-base";


import {useNavigation} from "@react-navigation/native";

// import { Button } from "native-base";
import { Center } from 'native-base';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';



function Controls({togglePlayPause,pause}){
    
     
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return(
    
    <NativeBaseProvider>      
        <Center flex={1}>
            {pause ? (<TouchableOpacity style={styles.playPause}>
                <Icon name="play-circle" size={30} />
            </TouchableOpacity>) :
            
            (<TouchableOpacity style={styles.playPause}>
                <Icon name="pause-circle" size={30} />
            </TouchableOpacity>)}
        </Center>
     </NativeBaseProvider>
  
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignContent:'center',
    justifyContent:'center',
  },
  playPause : {
    width:120,
    height:120
  }
 
 
})
export default Controls;