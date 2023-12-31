import React, { Component } from 'react';
import { StyleSheet, View, Button, PermissionsAndroid } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from "react-native-sound";
import Video from 'react-native-video';
import AudioRecord from 'react-native-audio-record';
import { Title } from 'react-native-paper';
import * as RNFS from 'react-native-fs';
import { err } from 'react-native-svg/lib/typescript/xml';

export class Voice1 extends Component {
    constructor(props)
    {
        super(props);
    }
  state = {
    audioFile: '',
    recording: false,
    paused: true,
    loaded: false,
    playTime: 0,
    duration:0,
    sound:''
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16, 
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
      // console.log("CHUNK - ",chunk);
    });
  }

  checkPermission = async () => {
    const granted=await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title:"fluency app",
        message:"app needs access to your camera",
        buttonNeutral:"ask me later",
        buttonNegative:"cancel",
        buttonPositive:"ok"
      }
    );

    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true,loaded:false});
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ recording: false });
    // wait till file is saved, else react-native-video will load incomplete file
    setTimeout(() => {
      this.setState({ audioFile });
    }, 1000);
    this.props.route.params.onGoBack(audioFile);
  };

  load=()=>{
    return new Promise((resolve,reject)=>{
      if(!this.state.audioFile){
        return reject('file path is empty');
      }

      this.sound=new Sound(this.state.audioFile,'',error=>{
        if(error){
          console.log("failed to load the file",error);
          return reject(error);
        }
        this.setState({loaded:true});
        return resolve;
      });

    });
  };

  play = async() => {
    if (!this.state.loaded) this.player.seek(0);
    this.setState({ paused: false, loaded: true });
  };

  pause = () => {
    this.setState({ paused: true });
  };

  onLoad = data => {
    console.log('onLoad', data);
  };

  onProgress = data => {
    this.setState({
        playTime : data.currentTime,
        duration: data.seekableDuration
    })
    // console.log('progress', data);
  };

  onEnd = () => {
    console.log('finished playback');
    this.setState({ paused: true, loaded: false });
  };

  onError = error => {
    console.log('error', error);
  };

  render() {
    const { recording, audioFile, paused } = this.state;
    return (
      <View style={styles.container}>
        <Title style={styles.title}>{this.state.playTime} / {this.state.duration}</Title>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
        {!!audioFile && (
          <Video
            ref={ref => (this.player = ref)}
            source={{ uri: audioFile }}
            paused={paused}
            ignoreSilentSwitch={'ignore'}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onError={this.onError}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  title : {
    alignSelf:'center',
    marginVertical:20
  },
});

export default Voice1;