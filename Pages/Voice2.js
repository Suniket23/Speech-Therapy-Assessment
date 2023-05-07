import React, { Component } from 'react';
import { StyleSheet, View, Button, Title } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

class Voice2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFile: '',
      recording: false,
      paused: true,
      loaded: false,
      playTime: 0,
      duration: 0
    };
  }

  async componentDidMount() {
    await this.checkPermission();
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    // console.log('permission request', p);
  };

  start = async () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true });
    const path = 'path/to/save/recording.mp3'; // Set the path where you want to save the recording
    await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({ isRecording: true });
    });
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({ recording: false, audioFile: result });
    console.log(result);
  };

  play = () => {
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
      playTime: data.currentTime,
      duration: data.seekableDuration
    });
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
        <Title style={styles.title}>
          {this.state.playTime} / {this.state.duration}
        </Title>
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

export default Voice2;
