

import React, {useEffect, useState} from 'react';
import { LogBox } from "react-native";
import {Image, FlatList} from "native-base";

import {
  
  StyleSheet,

} from 'react-native';

import { NativeBaseProvider,  VStack} from "native-base";


import {useNavigation} from "@react-navigation/native";

// import { Button } from "native-base";
import { Center } from 'native-base';
import { Button } from 'react-native-paper';
// import {useNavigation} from "@react-navigation/native";



function SubCategory(props){
    // console.log("Props = ",props.route.params);
    
    const navigation = useNavigation();
    const [objData,setobjData] = useState();
    const label = props.route.params;
    console.log("Sub label = ",label);
    const serverIP = "http://192.168.43.13:3001/";
    const data = new FormData();
    data.append("subCategory",label);
    const config = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
                 },
        body: data
       };
    //    console.log("Config",config);
    const getData = () => {
        fetch(serverIP + "getSubCategoryData",config)
        .then(res => res.json())
        .then((data) => {console.log("data recieved  = ",data),setobjData(data)})
        .catch((err) => {console.log(err)});
    }
    useEffect(() => {
        console.log("calling get data");
        getData();
        console.log("Obj data= ",objData);
    },[]);

    const renderItem = ({item}) =>{
        console.log("ITEM = ",item);
        return(
          <Button mode='outlined' style={{paddingHorizontal:20,margin:10}} onPress={() => navigation.navigate('Display',[item.label,item.subLabel]) }>
            {item.subLabel}
          </Button>
        );
      }

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return(
    <NativeBaseProvider>      
      <Center flex={1}>
        {data && <FlatList data={objData} renderItem={renderItem} keyExtractor={(item) => item.val.toString()} />}
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
 
 
})
export default SubCategory;