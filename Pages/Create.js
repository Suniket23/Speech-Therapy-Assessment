import React,{useState} from 'react'
import { StyleSheet } from 'react-native';
import { NativeBaseProvider,  VStack,View,Text, Button,Image} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';
import * as ImagePicker from "react-native-image-picker";
import {useNavigation} from "@react-navigation/native";
import * as RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function Create() {
    const navigation = useNavigation();
    const [photo,setPhoto] = useState(null);
    const [photoName,setPhotoName] = useState("");
    const [categoryName,setCategoryName] = useState("");
    const [voiceName,setVoiceName] = useState("");
    let [fontsLoaded] = useFonts({
      Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium
    });

   
  
    const handleUploadImage = (image) => {
      const data = new FormData();
      data.append('file',image);
      data.append('upload_preset','fluencyApp')
      data.append("cloud_name","bhavesh07")
                
   
     fetch("https://api.cloudinary.com/v1_1/bhavesh07/Home/upload",{
      method : "post",
      body: data,
     }).then(res => res.json())
       .then(data => {
             console.log("MESSAGE RECI = ",data);
          })
    }
    const handleChooseImage = () => {
        const options = {
                noData : true,
                mediaTypes: 'Images',
                quality: 0.1,
              };
          ImagePicker.launchImageLibrary(options,(response) => {
            if(response.didCancel !== true)
            { 
                if (response.didCancel !== true) {
                    setPhoto(response.assets[0].uri);
                console.log('User selected a file form camera or gallery', response); 
                setPhotoName(response.assets[0].fileName);
                let newFile = {
                  uri : response.assets[0].uri,
                  type : response.assets[0].type,
                  name : response.assets[0].name
                };

                handleUploadImage(newFile);
                  // const config = {
                  //   method: 'POST',
                  //   headers: {
                  //   'Accept': 'application/json',
                  //   'Content-Type': 'multipart/form-data',
                  //             },
                  //   body: data,
                  // };
                  // console.log("CONFIg ",config.body);
                  // console.log("CONFIg ",config);
                  // fetch("http://192.168.43.13:3001/upload", config)
                  // .then((checkStatusAndGetJSONResponse)=>{       
                  //   console.log("check = "+checkStatusAndGetJSONResponse);
                  // }).catch((err)=>{console.log(err)});
                  
                }
            }else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
             }else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
             }
          });
        
      
    }

//  
// User selected a file form camera or gallery {"assets": [{"fileName": "rn_image_picker_lib_temp_95fa1d64-63e5-4e93-8b5f-08a3e7f9ae65.jpg", "fileSize": 284864, "height": 2760, "type": "image/jpeg", "uri": "file:///data/user/0/com.reactproject/cache/rn_image_picker_lib_temp_95fa1d64-63e5-4e93-8b5f-08a3e7f9ae65.jpg", "width": 4912}]}   Data recieved from voice =  {"_parts": [["name", "avatar"], ["fileData", [Object]]]}
//  LOG  CONFIg  {"_parts": [["name", "avatar"], ["fileData", [Object]]]}
//  LOG  CONFIg  {"body": {"_parts": [[Array], [Array]]}, "headers": {"Accept": "application/json", "Content-Type": "multipart/form-data"}, "hello": "world", "method": "POST"}
     
    const pull_data = (data) => {
      console.log("Data recieved from category = ",data);
      setCategoryName(data);
    }
    const pull_voice = (data) => {
      console.log("Data recieved from voice = ",data);
      var dataToSend;

      RNFS.readFile(data, 'base64') // r is the path to the .wav file on the phone
      .then((data) => {
      
          dataToSend = data;
      })

      var chunk = Buffer.from(data,'base64');
      var currentData = new Date();
      var addFileName = 'sound_' + currentData.getDate() + '_' + currentData.getMonth() + '_' + currentData.getFullYear() + '_' + currentData.getHours() + '_' + currentData.getMinutes() + '_' + currentData.getSeconds() + '_' + currentData.getMilliseconds();

      setVoiceName(addFileName);
      console.log("File Name = ",addFileName);
      

      const dataA = new FormData();
      console.warn("Data to send = ",chunk);
      dataA.append('name',JSON.stringify(chunk));
      dataA.append('fileName',addFileName)
      dataA.append('audio', {
        audioData : data,
      });
      console.log("DATA AAA  = ",dataA);
      const config = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
                 },
        body: dataA,
       };
      fetch("http://192.168.43.13:3001/uploadAudio", config)
                  .then((checkStatusAndGetJSONResponse)=>{       
                    console.log("check = "+checkStatusAndGetJSONResponse);
                  }).catch((err)=>{console.log(err)});
      
    }

    const onSubmitData = () => {
      // console.warn("submit button clicked ");
      const data = new FormData();
      data.append('imageName',photoName);
      data.append('audioName',voiceName);
      data.append('category',categoryName);
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
      fetch("http://192.168.43.13:3001/storeData", config)
                  .then((checkStatusAndGetJSONResponse)=>{       
                    console.log("check = "+checkStatusAndGetJSONResponse);
                  }).catch((err)=>{console.log(err)});
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