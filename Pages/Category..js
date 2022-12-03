import React,{useEffect, useState} from 'react'
import { StyleSheet,TextInput,TouchableHighlight,Text,View} from 'react-native';
import { NativeBaseProvider,  VStack,Icon, addTextAndPropsToStrings} from "native-base";
import { Dropdown } from 'react-native-element-dropdown';
import { IconButton } from 'react-native-paper';
import {LogBox} from "react-native";


// import axios from "axios" ;
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
function Category(props) {
  
  const [text,setText] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [data,setData] = useState([]);  

  const onTextChange = (txt) => {
    setText(txt);
  }

  const insertData = () => {
    console.log("text= "+JSON.stringify(text));
    fetch('http://192.168.43.13:3001/insert',{
      method:'POST',
        body:JSON.stringify({
          title:text
        }),
        mode: 'no-cors',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
      } 
    })
    .then(response => response.json())
    .then(() => getData());
  }

  const getData = () => {
    console.log("text= "+JSON.stringify(text));
    fetch('http://192.168.43.13:3001/getInfo')
    .then(response => response.json())
    .then(data => setData(data))
  }
  
  
  useEffect(() => {
    getData();
  },[]);


  const ontxtChange = (data) => {
    props.route.params.onGoBack(data);
  }



  
  return (
    <NativeBaseProvider>
        
        <View style={{flexDirection:'row'}}>
            <View style={styles.container}>
            <TextInput
                style={{alignItems:'center',justifyContent:'center',backgroundColor:'white'}} 
                placeholder = 'Add Category'
                value={text}
                onChangeText={(text) => onTextChange(text)}
              />
            </View>
            <IconButton icon="plus-circle" size={30} onPress={insertData} style={styles.button}/>
            <View style={styles.container}>

              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' },styles.containerType]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="val"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                ontxtChange(item.label);
                setValue(item.label);
                setIsFocus(false);
                
                    }}       
                />
            </View>
           
        </View>
      
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    
    container : {
      paddingVertical:100,
      marginHorizontal:15,
      flex:1,
      alignContent:'center',
      justifyContent:'center'
    },
    containerType : {
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
   button : {
      marginTop:100,
   }
   ,dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
export default Category;