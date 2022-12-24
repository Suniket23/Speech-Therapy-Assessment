import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs()

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>लर्निंग अँप </Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        लॉगिन 
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('User')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
