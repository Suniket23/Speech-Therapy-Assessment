// pages/PatientsList.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientsList = () => {
  return (
    <View style={styles.container}>
      <Text>Patients List</Text>
      {/* Add your content for Patients List here */}
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

export default PatientsList;
