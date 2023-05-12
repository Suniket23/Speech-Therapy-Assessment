import { Button, Center,FlatList,Image } from "native-base";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TextInput,textStyle, TouchableOpacity, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider,  VStack} from "native-base";
import Sound from 'react-native-sound';
const {height,width}=Dimensions.addEventListener
import {useNavigation} from "@react-navigation/native";

const Quiz=()=>{
    const navigation = useNavigation();
    const serverIP = "http://192.168.1.18:3001/";
    const [data,setData] = useState([]);
    const [currindex,setcurrindex]=useState(1);
    const [marks,setmarks]=useState(0);
    const [flag1,setflag1]=useState(0);
    const [flag2,setflag2]=useState(0);
    const [flag3,setflag3]=useState(0);
    const [i,seti]=useState(0);
    const getData = async() => {
       
        fetch(serverIP + 'Assessment')
        .then(response => response.json())
        .then(results => {setData(results);console.log("results = ",results);});
    }
    useEffect(() => {
      // console.warn("render",i)
        getData();
    },[])

    const submit=()=>{
      if(flag1===1){
        if(option1===data.correct_option){
          setmarks(marks+1);
        }
      }
    }
    const onchoose1=()=>{
      if(flag2===1){setflag2(0)};
      if(flag3===1){setflag3(0)};
        setflag1(1);

        console.log(flag1);
    };
    const onchoose2=()=>{
      if(flag3===1){setflag3(0)};
      if(flag1===1){setflag1(0)};
        setflag2(1);
        console.log(flag1);
    };
    const onchoose3=()=>{
      if(flag1===1){setflag1(0)};
      if(flag2===1){setflag2(0)};
        setflag3(1);
        console.log(flag1);
    };

    const playSound = (item) => {
      sound1 = new Sound(item.audio,'', (error, _sound) => {
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
      // setflag(false)
      return(
        <View style={styles.card}>
          <TouchableOpacity style={{justifyContent:"center"}} onPress={() => playSound(item)}>
              <Text style={styles.buttonPlay}>Play</Text>
          </TouchableOpacity>
          <View style={{marginTop:10}}>
            <TouchableOpacity style={[styles.card1,{backgroundColor:flag1===1?'red':'#fff'}]} onPress={onchoose1}>
              <Image
                style={styles.imgStyle}
                resizeMode="cover"
                source={{uri:item.option1}}
                alt="image"
                />
                {/* <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: data.marked ==  1 ? '#fff' : 'cyan',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: '600', color: '#000'}}>
                    A
                  </Text>
                </View> */}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.card1,{backgroundColor:flag2===1?'red':'#fff'}]} onPress={onchoose2}>
              <Image
                style={styles.imgStyle}
                resizeMode="cover"
                source={{uri:item.option2}}
                alt="image"
                />
              </TouchableOpacity>
            <TouchableOpacity style={[styles.card1,{backgroundColor:flag3===1?'red':'#fff'}]} onPress={onchoose3}>
            <Image
              style={styles.imgStyle}
              resizeMode="cover"
              source={{uri:item.option3}}
              alt="image"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonPlay} onPress={submit}>
              <Text style={{fontWeight:"bold",marginLeft:100}}>Next</Text>
           </TouchableOpacity>
        </View>
      );
    }
    return (
        <View style={{flex:1}}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 20,
            color: '#000',
            marginTop:20}}>Total Questions:{' '+currindex+'/'+data.length}</Text>
            <View style={{marginTop:10}}>
            <FlatList pagingEnabled data={data} renderItem={renderItem} horizontal showsVerticalScrollIndicator={false} keyExtractor={(item) => item.id} />
            </View>
           {/* <TouchableOpacity style={styles.buttonPlay} onPress={submit}>
              <Text style={{fontWeight:"bold",marginLeft:100}}>Next</Text>
           </TouchableOpacity> */}
        </View>
    )
}

const styles=StyleSheet.create({
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
        marginTop:10
      },
      card:{
        width:300,
        // backgroundColor:"#fff",
        borderRadius:5,
        marginVertical:0,
        // display:"flex",
        flexDirection:"column",
        // justifyContent:"space-between",
        marginLeft:50,
        marginRight:50
        // justifyContent:"center"
      },
      card1:{
        // width:'90%',
        // height:50,
        elevation:3,
        backgroundColor:'#fff',
        marginTop:10,
        marginBottom:10,
        // alignSelf:"center"
      },
      imgContainer:{
        padding:10,
      },
      imgStyle:{
        width:"90%",
        height:150,
        borderColor:"black",
        margin:8,
      }
})
export default Quiz;