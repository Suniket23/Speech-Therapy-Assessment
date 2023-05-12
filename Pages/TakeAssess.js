import React, {useEffect, useState} from 'react';
import { LogBox,SafeAreaView,TouchableOpacity } from "react-native";
import {Image, FlatList,Text,View} from "native-base";

import {
  
  StyleSheet,

} from 'react-native';

import { NativeBaseProvider,  VStack} from "native-base";

import {useNavigation} from "@react-navigation/native";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';

import { Center } from 'native-base';
import { Button, TextInput } from 'react-native-paper';

const TakeAssess=()=>{
    const navigation = useNavigation();
    const [Name, setName] = useState('');
    const [Phoneno, setPhoneno] = useState('');

    const onPhonenoChange = (txt) => {
        setPhoneno(txt);
      }
      const onNameChange = (txt) => {
        setName(txt);
      }
    
      const onsubmit=()=>{
        // const data={Phoneno,Name};
        fetch('http://192.168.1.18:3001/TakeAssess', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          iduser:Phoneno,
      
          name: Name,
        })
      }).then(response => response.json())
        .then(json=>console.log(json))
        .catch(error => console.error(error))

        navigation.navigate('Quiz')
      }
    return (
        <View>
            <Text style={styles.heading}>
                welcome to assessment
            </Text>
            <TextInput
            style={styles.input}
            placeholder='enter your Number'
            value={Phoneno}
            onChangeText={(text) => onPhonenoChange(text)}
            />
            <TextInput
            style={styles.input}
            placeholder='enter your Name'
            value={Name}
            onChangeText={(text) => onNameChange(text)}
            />
           <TouchableOpacity style={styles.buttonPlay} onPress={onsubmit}>
              <Text style={{fontWeight:"bold",marginLeft:100}}>Play Quiz</Text>
           </TouchableOpacity>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        // flex:1,
        // alignContent:"center",
        // justifyContent:"center",
        // alignItems:"center"
    },
    heading:{
        marginLeft:100,
        marginRight:100,
        marginTop:50,
        fontSize:15,
        borderColor:"black",
        height:60
    },
    btn:{
        marginBottom:8,
        backgroundColor:"purple"
    },
    input:{
        borderColor:"black",
        marginTop:20,
        paddingHorizontal: 100,
        marginVertical:15,
        marginLeft:20,
        marginRight:40
    },
    buttonPlay: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'rgba(00,80,00,1)',
        borderWidth: 1,
        borderColor: 'rgba(80,80,80,0.5)',
        overflow: 'hidden',
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginLeft:50,
        marginRight:50,
        marginTop:30
      }
})

export default TakeAssess;