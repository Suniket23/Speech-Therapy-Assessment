import React,{useState} from 'react'
import { StyleSheet } from 'react-native';
import { NativeBaseProvider,  VStack,View,Text, Button,Image} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';
import * as ImagePicker from "react-native-image-picker";
import {useNavigation} from "@react-navigation/native";

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
    const serverIP = "http://192.168.1.2:3001/";
    let [fontsLoaded] = useFonts({
      Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium
    });

   
  
    const handleUploadImage = (response) => {
        const data = new FormData();
       
        data.append("file", 'data:image/jpg;base64,' + response.assets[0].base64);
        data.append("cloud_name", "dplappado");
        data.append("upload_preset", "fluencyApp");
                
       
     fetch("https://api.cloudinary.com/v1_1/dplappado/image/upload/",{
      method : "post",
      body: data,
     }).then(res => res.json())
       .then(data => {
        console.warn(data);
             setPhotoName(data.url);
          }).catch((err) => {
              console.log(err)
          })
    }
    const handleChooseImage = () => {
        const options = {
            mediaTypes: 'Images',
            quality: 0.1,
            allowsEditing:true,
            includeBase64: true
            };
          ImagePicker.launchImageLibrary(options,(response) => {
            if(response.didCancel !== true)
            { 
                    setPhoto(response.assets[0].uri);
                    console.log(response.assets[0].uri);
                
                
                let newFile = {
                  uri : response.assets[0].uri,
                  type : response.assets[0].type,
                  name : response.assets[0].name
                };

                handleUploadImage(response);
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
    // const pull_voice = async (data) => {
    //   try{
    
    //   const tempData = await RNFS.readFile(data.toString(),'base64') // r is the path to the .wav file on the phone
      
    //   const fd = new FormData();
    //   console.log("tempdata=",tempData);
    //   fd.append("file","data:audio/mpeg;base64,"+tempData);
    //   fd.append("upload_preset", "fluencyApp");
    //   fd.append("cloud_name","dplappado");
    //   fd.append("resource_type", "video");

    //   fetch('https://api.cloudinary.com/v1_1/dplappado/image/upload', {
    //     method: 'POST',
    //     body: fd
    //   }).then(res => res.json())
    //   .then(data => {
    //         setVoiceName(data.url);
    //         console.log("DATA Recieved = ",data);
    //      }).catch((err) => {
    //          console.log(err)
    //      })
    //     }catch(error){
    //       console.log("error=",error);
    //     }
     
    // }
    const pull_voice = async (data) => {
      try {
        const tempData = await RNFS.readFile(data.toString(), 'base64');
        const fd = new FormData();
        fd.append('file', `data:audio/mpeg;base64,${tempData}`);
        fd.append('upload_preset', 'fluencyApp');
        fd.append('cloud_name', 'dplappado');
        fd.append('resource_type', 'auto');
    
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dplappado/video/upload',
          {
            method: 'POST',
            body: fd
          }
        );
        if (!response.ok) {
          throw new Error('Failed to upload audio');
        }
        const responseData = await response.json();
        setVoiceName(responseData.url);
        console.log('DATA Received = ', responseData);
      } catch (error) {
        console.log(error);
      }
    };

    // const onSubmitData =async() => {
    //   console.log("submit button clicked ");
    //   const data = new FormData();
    //   data.append('imageName',photo);
    //   data.append('audioName',voiceName);
    //   data.append('category',categoryName);
    //   data.append('subCategory',subCategoryName);
    //   data.append('allData',{
    //       imageName : photoName
    //   })
    //   const config = {
    //     method: 'POST',
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //              },
    //     body:data
    //    }
    //    console.log("CONFIG -> ",config);
    //    fetch(serverIP+"storeData", config)
    //               .then((checkStatusAndGetJSONResponse)=>{       
    //                 console.log("check = "+checkStatusAndGetJSONResponse);
    //               }).catch((err)=>{console.log(err)});

    //   Alert.alert(
    //                 "Data Submitted",
    //                 "Record added successfully",                   
    //                 [
    //                   {
    //                     text: "Ok",
    //                     style: "cancel"
    //                   },                     
    //                 ]
    //               );
                
    // }
    // const onSubmitData = async () => {
    //   console.log('submit button clicked');
    //   const data = new FormData();
    //   data.append('imageName', photo);
    //   data.append('category', categoryName);
    //   data.append('subCategory', subCategoryName);
    //   data.append('allData', JSON.stringify({ imageName: photoName }));
    
    //   // Read the audio file and append it to the form data
    //   const audioData = await RNFS.readFile(voiceName, 'base64');
    //   data.append('audioName', audioData);
    
    //   const config = {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: data,
    //   };
    //   console.log('CONFIG -> ', config);
      
    //   try {
    //     const response = await fetch(serverIP + 'storeData', config);
    //     const checkStatusAndGetJSONResponse = await response.json();
    //     console.log('check = ', checkStatusAndGetJSONResponse);
        
    //     Alert.alert(
    //       'Data Submitted',
    //       'Record added successfully',
    //       [
    //         {
    //           text: 'Ok',
    //           style: 'cancel',
    //         },
    //       ]
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const onSubmitData = async () => {
      console.log('submit button clicked');
      const data = new FormData();
      data.append('imageName', photo);
      data.append('category', categoryName);
      data.append('subCategory', subCategoryName);
      data.append('allData', JSON.stringify({ imageName: photoName }));
    
      try {
        // Read the audio file and append it to the form data
        const audioData = await RNFS.readFile(voiceName, 'base64');
        data.append('audioName', audioData);
    
        const response = await fetch(serverIP + 'storeData', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        });
    
        if (response.ok) {
          const checkStatusAndGetJSONResponse = await response.json();
          console.log('check = ', checkStatusAndGetJSONResponse);
    
          Alert.alert(
            'Data Submitted',
            'Record added successfully',
            [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ]
          );
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.log(error);
        // Handle the error appropriately, such as showing an error message to the user
        Alert.alert(
          'Error',
          'An error occurred while submitting data.',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ]
        );
      }
    };
    
    
  return (
    <NativeBaseProvider>
        
        <VStack space={5} alignItems="center" style={styles.container}>
        {!photo && <View style={styles.previewTab}>

        </View>}
        {photo && <Image source={{uri : photo}} alt="Image" style={{width:250,height:250}}/> } 
        
        <Button w={250} colorScheme="blueGray" startIcon={<Icon name="camera" size={18} color="#FFF"/>} onPress={handleChooseImage}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white">Choose फोटो  </Text>
        </Button>
        <Button w={250} colorScheme="blueGray" startIcon={<Icon name="music" size={18} color="#FFF"/>} onPress={() => navigation.navigate('Voice1', {onGoBack : pull_voice})}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white">Choose ऑडिओ  </Text>
        </Button>

        <Button w={250} colorScheme="blueGray" startIcon={<Icon name="music" size={18} color="#FFF"/>} onPress={() => navigation.navigate('Category', {onGoBack : pull_data})}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white">Category  </Text>
        </Button>
   
        <Button w={250} colorScheme="blueGray"  >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white" onPress={onSubmitData}>सबमिट </Text>
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