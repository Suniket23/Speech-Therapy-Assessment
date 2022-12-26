import React,{useState} from 'react'
import { StyleSheet } from 'react-native';
import { NativeBaseProvider,  VStack,View,Text, Button,Image} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';
import * as ImagePicker from "react-native-image-picker";
import {useNavigation} from "@react-navigation/native";
;
var RNFS = require('react-native-fs');

import { LogBox } from 'react-native';
import { Alert } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function Create() {
    const navigation = useNavigation();
    const [photo,setPhoto] = useState(null);
    const [photoName,setPhotoName] = useState("");
    const [categoryName,setCategoryName] = useState("");
    const [subCategoryName,setSubCategoryName] = useState("");
    const [voiceName,setVoiceName] = useState("");
    const serverIP = "http://192.168.43.13:3001/";
    let [fontsLoaded] = useFonts({
      Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium
    });

   
  
    const handleUploadImage = (response) => {
        const data = new FormData();
       
        data.append("file", 'data:image/jpg;base64,' + response.assets[0].base64);
        data.append("cloud_name", "bhavesh07");
        data.append("upload_preset", "fluencyApp");
                
       
     fetch("https://api.cloudinary.com/v1_1/bhavesh07/image/upload",{
      method : "post",
      body: data,
     }).then(res => res.json())
       .then(data => {
             setPhotoName(data.url);
          }).catch((err) => {
              console.log(err)
          })
    }
    const handleChooseImage = () => {
        const options = {
            mediaTypes: 'Images',
            quality: 0.1,
            includeBase64: true
            };
          ImagePicker.launchImageLibrary(options,(response) => {
            if(response.didCancel !== true)
            { 
                if (response.didCancel !== true) {
                    setPhoto(response.assets[0].uri);
                
                
                let newFile = {
                  uri : response.assets[0].uri,
                  type : response.assets[0].type,
                  name : response.assets[0].name
                };

                handleUploadImage(response);
                }
            }else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
             }else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
             }
          });
        
      
    }

    
    const pull_data = (data) => {
      console.log("Data recieved from category = ",data);
      setCategoryName(data.title);
      setSubCategoryName(data.subTitle);
    }
    const pull_voice = async (data) => {
    

      const tempData = await RNFS.readFile(data.toString(),'base64') // r is the path to the .wav file on the phone
      
      const fd = new FormData();
      fd.append("file","data:audio/mpeg;base64,"+tempData);
      fd.append("upload_preset", "fluencyApp");
      fd.append("cloud_name","bhavesh07");
      fd.append("resource_type", "video");

      fetch('https://api.cloudinary.com/v1_1/bhavesh07/auto/upload', {
        method: 'POST',
        body: fd
      }).then(res => res.json())
      .then(data => {
            setVoiceName(data.url);
            console.log("DATA Recieved = ",data);
         }).catch((err) => {
             console.log(err)
         })
     
    }

    const onSubmitData = async() => {
      console.log("submit button clicked ");
      const data = new FormData();
      data.append('imageName',photoName);
      data.append('audioName',voiceName);
      data.append('category',categoryName);
      data.append('subCategory',subCategoryName);
      data.append('allData',{
          imageName : photoName
      })
      const config = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
                 },
        body: data
       };
       console.log("CONFIG -> ",config);
       fetch(serverIP+"storeData", config)
                  .then((checkStatusAndGetJSONResponse)=>{       
                    console.log("check = "+checkStatusAndGetJSONResponse);
                  }).catch((err)=>{console.log(err)});

      Alert.alert(
                    "Data Submitted",
                    "Record added successfully",                   
                    [
                      {
                        text: "Ok",
                        style: "cancel"
                      },                     
                    ]
                  );
                
    }
    
  return (
    <NativeBaseProvider>
        
        <VStack space={5} alignItems="center" style={styles.container}>
        {!photo && <View style={styles.previewTab}>

        </View>}
        {photo && <Image source={{uri : photo}} alt="Image" style={{width:250,height:250}}/> } 
        
        <Button w={250} colorScheme="blueGray" startIcon={<Icon name="camera" size={18} color="#FFF"/>} onPress={handleChooseImage}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white"> Choose फोटो  </Text>
        </Button>
        <Button w={250} colorScheme="blueGray" startIcon={<Icon name="music" size={18} color="#FFF"/>} onPress={() => navigation.navigate('Voice1', {onGoBack : pull_voice})}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white"> Choose ऑडिओ  </Text>
        </Button>

        <Button w={250} colorScheme="blueGray" startIcon={<Icon name="music" size={18} color="#FFF"/>} onPress={() => navigation.navigate('Category', {onGoBack : pull_data})}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white"> Category  </Text>
        </Button>
   
        <Button w={250} colorScheme="blueGray"  >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white" onPress={onSubmitData}>सबमिट  </Text>
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
export default Create;