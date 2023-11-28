// MarksDisplayScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const MarksDisplayScreen = () => {
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.4:3001/progress');
      const data = await response.json();
      setMarksData(data);
      console.log("data=",data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Marks</Text>
      {marksData.map((data, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>assessmentID:</Text>
          <Text style={styles.value}>{data.assessmentID}</Text>
          <Text style={styles.label}>Marks:</Text>
          <Text style={styles.value}>{data.score/25*100}%</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
});

export default MarksDisplayScreen;
