import React, { Component } from 'react'

import { StyleSheet,PermissionsAndroid,Platform } from 'react-native'
import AudioRecorderPlayer,{
     AVEncoderAudioQualityIOSType,
     AVEncodingOption,
     AudioEncoderAndroidType,
     AudioSet,
     AudioSourceAndroidType,
    } from 'react-native-audio-recorder-player';
import { Card,Title,Header } from 'react-native-paper';
import { NativeBaseProvider, Button, Center,Text} from "native-base";
import { useFonts, Poppins_600SemiBold,Poppins_400Regular,Poppins_500Medium } from '@expo-google-fonts/poppins';
import RNFetchBlob from "rn-fetch-blob";
import Icon from "react-native-vector-icons/MaterialIcons";

export class Voice extends Component {
  constructor(props)
  {
    super(props);
    console.log(props);
    this.state = {
        isLoggingIn: false,      
        recordSecs: 0,        
        recordTime: '00:00:00',       
        currentPositionSec: 0,       
        currentDurationSec: 0,        
        playTime: '00:00:00',        
        duration: '00:00:00',
        audioURI: '',
        body:[]        
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();        
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    
    
  }
  
  onStartRecord = async () => {       
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({android : `${dirs.CacheDir}/hello.mp3`});       
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberofChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
      const meteringEnabled = false;
      
      const uri = await this.audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled,
      );
      
      this.audioRecorderPlayer.addRecordBackListener((e) => {
        this.setState({
          recordSecs: e.currentPosition,
          recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        });
      });
    console.log('audioSet', audioSet);
    // console.log(`uri: ${uri}`);
    var body = new FormData();
    //console.log("BODY",abc);
    body.append('inputFile', {
       name: 'sound.mp4',
       type: 'audio/mp3',
       uri: uri
    });
    this.audioURI = uri;
    // this.body = body;
    

  };
  onStopRecord = async () => {
    console.log("IIN stop Record");
        const result = await this.audioRecorderPlayer.stopRecorder();  
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({ 
          recordSecs: 0,    
        });  
        console.log("URI? ",result);
        const blob = await (await fetch(this.audioURI)).blob();

    var bodyData = new FormData();
    console.log("BODY",blob);
    bodyData.append('name','avatar');
    bodyData.append('fileData', {
      uri : result,
      type: blob._data.type,
      name: blob._data.name
    });
    console.log("BODY DATA ",blob._data.type);
//DATA  =  {"_parts": [["name", "avatar"], ["fileData", [Object]]]}
    this.props.route.params.onGoBack(bodyData);
      };

      onStartPlay = async (e) => {       
            console.log('onStartPlay');       
            const dirs = RNFetchBlob.fs.dirs;
            const path = Platform.select({android : `${dirs.CacheDir}/hello.mp3`});        
            const msg = await this.audioRecorderPlayer.startPlayer(path);    
              
            this.audioRecorderPlayer.setVolume(1.0);        
            console.log(msg);
       
            this.audioRecorderPlayer.addPlayBackListener((e) => {       
              if (e.current_position === e.duration) {       
                console.log('finished');       
                this.audioRecorderPlayer.stopPlayer();      
              }
       
              this.setState({       
                currentPositionSec: e.currentPosition,       
                currentDurationSec: e.duration,      
                playTime: this.audioRecorderPlayer.mmssss(       
                  Math.floor(e.currentPosition),       
                ),       
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),       
              });      
            });
     
          };
          
        onPausePlay = async (e) => {
        await this.audioRecorderPlayer.pausePlayer();
        };

        onStopPlay = async (e) => {
             console.log('onStopPlay');  
             this.audioRecorderPlayer.stopPlayer();
             this.audioRecorderPlayer.removePlayBackListener();
             };
  render() {
    return (
        <Card style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
        
          <Title style={styles.title}>{this.state.recordTime}</Title>
          <Button  backgroundColor={"gray.600"} onPress={() => this.onStartRecord()}  startIcon={<Icon name="fiber-manual-record" size={18} color="#FFF"/>} style={styles.button} >
            <Text style={styles.text}>रेकॉर्ड</Text>    
          </Button>

          <Button
            backgroundColor={"red.700"}
            style={styles.button}
            onPress={() => this.onStopRecord()}
            startIcon={<Icon name="stop" size={18} color="#FFF"/>}
          >
            <Text style={styles.text}> स्टॉप</Text> 
           
        </Button>

    

          <Title style={styles.title}>{this.state.playTime} / {this.state.duration}</Title>

          <Button backgroundColor={"blue.600"}  onPress={() => this.onStartPlay()}  startIcon={<Icon name="play-arrow" size={18} color="#FFF"/>} style={styles.button}>
            <Text style={styles.text}>प्ले</Text> 
          

        </Button>


          <Button onPress={() => this.onPausePlay()} style={styles.button} startIcon={<Icon name="pause" size={18} color="#FFF"/>}>
          <Text style={styles.text}>पौझ</Text> 

            </Button>

          <Button backgroundColor={"red.700"} onPress={() => this.onStopPlay()} startIcon={<Icon name="stop" size={18} color="#FFF"/>}style={styles.button} >
            <Text style={styles.text}>स्टॉप</Text> 
         </Button>

  

      </Card>
    )
  }
}

const styles = StyleSheet.create({
    cardStyle : {
        flex : 1,
        paddingTop:50,
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center'
    },
    button : {
      width:150,
      alignSelf:'center',
      marginBottom:10,

    },
    title : {
      alignSelf:'center',
      marginVertical:20
    },
    text : {
      fontSize:18,
      color:'white',
    }
})

export default Voice;