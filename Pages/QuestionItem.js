import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Sound from 'react-native-sound';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';
const {height, width} = Dimensions.get('window');
const QuestionItem = ({data, selectedOption}) => {
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
  return (
    <View style={{width: width}}>
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => playSound(data)}>
            <Text style={styles.appButtonText}>Play Song</Text>
        </TouchableOpacity>
      <View style={{marginTop: 10}}>
        <FlatList
          data={[data.option1,data.option2,data.option3]}
          renderItem={({item, index}) => {
            return (
                <View style={styles.card}>
                    <TouchableOpacity style={[styles.card1,{backgroundColor:data.marked==index+1?'purple':'#fff'}]}
                     onPress={()=>selectedOption(index + 1)}>
                    <Image
                        style={styles.imgStyle}
                        resizeMode="cover"
                        source={{uri:item}}
                        alt="image"
                        />
                    </TouchableOpacity>
                </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles=StyleSheet.create({
          imgStyle:{
                    width:"95%",
                    height:150,
                    borderColor:"black",
                    margin:8,
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
        elevation:7,
        backgroundColor:'#fff',
        marginTop:10,
        marginBottom:10,
        // alignSelf:"center"
        },
        appButtonContainer: {
          elevation: 8,
          backgroundColor: "#009688",
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 12,
          marginLeft:50,
          marginRight:50,
        },
        appButtonText: {
          fontSize: 18,
          color: "#fff",
          fontWeight: "bold",
          alignSelf: "center",
          textTransform: "uppercase"
        }
        });

export default QuestionItem;
