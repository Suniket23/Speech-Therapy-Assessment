import { Button, Center,FlatList,Image } from "native-base";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TextInput,textStyle, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider,  VStack} from "native-base";
import Sound from 'react-native-sound';
import {useNavigation} from "@react-navigation/native";
const Guest=()=>{
    const navigation = useNavigation();
    const serverIP = "http://192.168.1.18:3001/";
    const [data,setData] = useState([]);
    const getData = async() => {
       
        fetch(serverIP + 'records')
        .then(response => response.json())
        .then(results => {console.log("results = ",results); setData(results)});
        
    }
    useEffect(() => {
        getData();
    },[])

    const playSound = (item) => {
        sound1 = new Sound(item.audioURL,'', (error, _sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound1.play(() => {
            sound1.release();
          });
        });
      }
    const renderItem = ({item}) =>{
        return(
          <View style={styles.card}>
            <View style={styles.imgContainer}>
              <Image
              style={styles.imgStyle}
              resizeMode="cover"
              source={{uri:item.imageURL}}
              alt="img1"
              />
            </View>
            <View style={styles.dataContainer}>
            <TouchableOpacity onPress={() => playSound(item)}>
              <Text style={styles.buttonPlay}>Play</Text>
            </TouchableOpacity>
              {/* <Text>{item.audioURL}</Text> */}
              {/* <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14}}  color="black"> {item.imageURL} </Text> */}
            </View>
          </View>
        );
      }
    return (
            <View style={styles.mainContainer}>
             {/* <Text style={{color:"black"}}>Take assessment</Text> */}
             <TouchableOpacity style={styles.appButtonContainer} onPress={()=>navigation.navigate('TakeAssess')}>
              <Text style={styles.appButtonText}>Give assessment</Text>
             </TouchableOpacity>
              {data && <FlatList data={data} renderItem={renderItem}showsVerticalScrollIndicator={false} keyExtractor={(item) => item.id.toString()} />}
            </View>
    )
}

const styles=StyleSheet.create({
  textStyle:{
    fontSize:40,
    padding:30,
    backgroundColor:"blue",
    margin:20,
    color:"white",
  },
  listStyle:{
    flex:1,
    textAlign:"center",
    margin:20,
    padding:10,
  },
  card:{
    width:250,
    backgroundColor:"#fff",
    borderRadius:5,
    marginVertical:20,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
  },
  imgContainer:{
    padding:10,
  },
  imgStyle:{
    width:"100%",
    height:180
  },
  mainContainer:{
    width:"100%",
    paddingTop:50,
    backgroundColor:"#bb96d7",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
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
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
export default Guest;