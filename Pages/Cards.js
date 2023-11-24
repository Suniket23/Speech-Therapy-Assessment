import { Button, Center,FlatList,Image } from "native-base";
import React, { useEffect, useState } from "react";
// Import LogBox
import { LogBox } from 'react-native';

// Ignore the warning
LogBox.ignoreLogs(['Warning: Failed prop type: Image']);

import {View,Text,StyleSheet,TextInput,textStyle, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider,  VStack} from "native-base";
import Sound from 'react-native-sound';
import {useNavigation} from "@react-navigation/native";


import { ImageBackground } from 'react-native'; //To suppress the warning.


const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch the list of cards from the database
    const fetchCards = async () => {
      try {
        const response = await fetch('http://192.168.196.55:3001/card');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

const playSound = (item) => {
  if (item && item.cardAudio) {
    const sound1 = new Sound(item.cardAudio, '', (error, _sound) => {
      if (error) {
        console.error('Error: ' + error.message);
        return;
      }
      sound1.play(() => {
        sound1.release();
      });
    });
  } else {
    console.error('Item or cardAudio is missing');
  }
};



const renderCardItem = ({ item }) => (
  <View style={styles.cardContainer}>
    <ImageBackground
      source={{ uri: item.cardImg }}
      style={styles.cardImage}
      accessibilityRole="image"
      accessibilityLabel={item.altText}
    >
    </ImageBackground>
      <TouchableOpacity style={styles.playButton} onPress={() => playSound(item)}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
  </View>
);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cards</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.cardID.toString()}
        renderItem={renderCardItem}
        style={styles.cardList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardList: {
    flex: 1,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 200, // You can adjust the height as needed
    borderRadius: 8,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cards;
