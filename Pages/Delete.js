import React,{useState} from 'react'
import { StyleSheet } from 'react-native';
import { NativeBaseProvider,  VStack,View,Text, Button,Image} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';

import { LogBox } from 'react-native';

import {useNavigation} from "@react-navigation/native";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function Delete() {
  
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium
  });
  return (
    <NativeBaseProvider>
        
        <VStack space={5} alignItems="center" style={styles.container}>
            {/* <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14}}  color="white"> Choose what to delete </Text> */}
        
            <Button w={250} colorScheme="blueGray" endIcon={<Icon name="caret-down" size={18} color="#FFF"/>} onPress={() => navigation.navigate('DeleteCategory')} >
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14}}  color="white"> Category  </Text>
            </Button>
            <Button w={250} colorScheme="blueGray" endIcon={<Icon name="caret-down" size={18} color="#FFF"/>} onPress={() => navigation.navigate('ChooseSubDelete')}>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14}}  color="white"> Sub Category  </Text>
            </Button>

        </VStack>
      
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    
    container : {
      flex:1,
      alignContent:'center',
      justifyContent:'center'
    },
   previewTab : {
    backgroundColor:"grey",
    width:250,
    height:250
   }
   
  })
export default Delete;