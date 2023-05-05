import { Button, Center } from "native-base";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';
import {useNavigation} from "@react-navigation/native";
import { Alert } from "react-native";
import { json } from "body-parser";
import * as ImagePicker from "react-native-image-picker";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
const serverIP = "http://192.168.13.91:3001/";
// import TextInput from "../src/components/TextInput";

const Assessment=()=>{
  const navigation = useNavigation();
    const [audio,setaudio]=useState();
    // const [Option1,setOption1]=useState("");
    // const [Option2,setOption2]=useState("");
    // const [Option3,setOption3]=useState("");
    const [CorrectOption,setCorrectOption]=useState("");
    const [Info,setInfo]=useState({});
    const [photo1,setPhoto1] = useState(null);
    const [photo2,setPhoto2] = useState(null);
    const [photo3,setPhoto3] = useState(null);
    const [photoName,setPhotoName] = useState("");
    // const onTextChange1 = (txt) => {
    //   setOption1(txt);
    // }
    // const onTextChange2= (txt) => {
    //   setOption2(txt);
    // }
    // const onTextChange3 = (txt) => {
    //   setOption3(txt);
    // }
    const onTextChange4 = (txt) => {
      setCorrectOption(txt);
    }
    const handleUploadImage = (response) => {
      const data = new FormData();
     
      data.append("file", 'data:image/jpg;base64,' + response.assets[0].base64);
      // data.append("file",response);
      data.append("cloud_name", "dplappado");
      data.append("upload_preset", "fluencyApp");
              
   fetch("https://api.cloudinary.com/v1_1/dplappado/image/upload",{
    method : "post",
    body: data,
   }).then(res => res.json())
     .then(data => {
      console.log(data);
          //  setPhotoName(data.url);
        }).catch((err) => {
            console.log(err)
        })
  }
    const handleChooseImage = () => {
      const options = {
          mediaTypes: 'Images',
          allowsEditing:true,
          quality: 0.1,
          includeBase64: true
          };
        ImagePicker.launchImageLibrary(options,(response) => {
          if(response.didCancel !== true)
          { 
              if (response.didCancel !== true) {
                if(photo1===null)setPhoto1(response.assets[0].uri);
                else if(photo2===null)setPhoto2(response.assets[0].uri);
                else if(photo3===null)setPhoto3(response.assets[0].uri);
              
                let newFile = {
                  uri : response.assets[0].uri,
                  type : response.assets[0].type,
                  name : response.assets[0].name
                };
                console.log(photo1);
                console.log(photo2);

                handleUploadImage(response);
              }
          }else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
           }else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
           }
        }); 
     }

      const onSubmit =async()=>{
        const data={photo1,photo2,photo3,CorrectOption};
        setInfo(data);
        // alert(Option1);
        fetch('http://192.168.13.91:3001/Assessment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          audio:audio,
      
          option1: photo1,
      
          option2: photo2,

          option3:photo3,

          correct_option:CorrectOption,
        })
      }).then(response => response.json())
        .then(json=>console.log(json))
        .catch(error => console.error(error))

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
        <View style={styles.container}>
            <Text style={{marginBottom:8}}>Welcome to Assessment</Text>
            <Button w={250} style={styles.btn} startIcon={<Icon name="music" size={18} color="#FFF"/>} /*onPress={() =>navigation.navigate('Voice1', {onGoBack : pull_voice})}*/>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12,color:"white"}}> Choose ऑडिओ  </Text>
            </Button>
              <Button w={250} style={{paddingHorizontal: 100,marginVertical:10}} colorScheme="blueGray" startIcon={<Icon name="camera" size={18} color="#FFF"/>} onPress={handleChooseImage}>
                 <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white">{photo1===null?"Choose फोटो 1":"uploaded"}</Text>
              </Button>
              <Button w={250} style={{paddingHorizontal: 100,marginVertical:10}} colorScheme="blueGray" startIcon={<Icon name="camera" size={18} color="#FFF"/>} onPress={handleChooseImage}>
                 <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white"> {photo2===null?"Choose फोटो 2":"uploaded"} </Text>
              </Button>
              <Button w={250} style={{paddingHorizontal: 100,marginVertical:10}} colorScheme="blueGray" startIcon={<Icon name="camera" size={18} color="#FFF"/>} onPress={handleChooseImage}>
                 <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12}}  color="white"> {photo3===null?"Choose फोटो 3":"uploaded"}  </Text>
              </Button>

              <TextInput
                style={{alignItems:'center',justifyContent:'center',color:'black',backgroundColor:'white',paddingHorizontal: 100,marginVertical:15}} 
                placeholder = 'Add CorrectOption'
                value={CorrectOption}
                onChangeText={(text) => onTextChange4(text)}
              />

              <Button w={250} style={{backgroundColor:"green",paddingHorizontal: 100,marginVertical:10}} onPress={onSubmit}>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12,color:"white"}}> Submit  </Text>
              </Button>

        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        marginBottom:8,
        backgroundColor:"purple"
    }
})
export default Assessment;