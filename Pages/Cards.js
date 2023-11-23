// pages/Cards.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cards = () => {
  return (
    <View style={styles.container}>
      <Text>Cards</Text>
      {/* Add your content for Cards here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cards;
