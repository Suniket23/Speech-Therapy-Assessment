import { Button, Center,FlatList,Image } from "native-base";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TextInput,textStyle} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider,  VStack} from "native-base";

const Guest=()=>{
    const serverIP = "http://192.168.1.7:3001/";
    const [data,setData] = useState([]);
    const getData = async() => {
       
        fetch(serverIP + 'records')
        .then(response => response.json())
        .then(results => {console.log("results = ",results); setData(results)});
        
    }
    useEffect(() => {
        getData();
    },[])
    const renderItem = ({item}) =>{
      
        return(
          <View style={styles.card}>
            <View style={styles.imgContainer}>
              <Image
              style={styles.imgStyle}
              resizeMode="cover"
              source={{uri:item.imageURL}}
              />
            </View>
            <View style={styles.dataContainer}>
              <Button
              onPress={()=>{item.audioURL}}
              title="Learn More"
              color="#841584"
              />
              {/* <Text>{item.audioURL}</Text> */}
              {/* <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14}}  color="black"> {item.imageURL} </Text> */}
            </View>
          </View>
        );
      }
    return (
            <View style={styles.mainContainer}>
             {/* <Text style={{color:"black"}}>hello guys</Text> */}
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
  }
})
export default Guest;