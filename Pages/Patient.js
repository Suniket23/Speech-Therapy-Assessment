import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'native-base';
import { useRoute } from '@react-navigation/native';

function Patient({ navigation }) {
  const route = useRoute();
  const patientId = route.params.patientId;
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  LogBox.ignoreLogs(['EventEmitter.removeListener']);

const fetchPatientDetails = async () => {
  try {
    const response = await fetch(`http://192.168.4.55:3001/learns/${patientId}`);
    const data = await response.json();

    if (Array.isArray(data.learns) && data.learns.length > 0) {
      for (const learn of data.learns) {
        const { category, subCategory } = learn;
        // Now you have the category and subCategory, proceed to store in the "assessment" table
        await storeInAssessmentTable(category, subCategory);
      }
    } else {
      console.error('No data found for the patientID:', patientId);
    }
  } catch (error) {
    console.error('Error fetching patient details:', error);
  }
};


  const storeInAssessmentTable = async (category, subCategory) => {
    try {
      const response = await fetch('http://192.168.4.55:3001/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID: patientId,
          category: category,
          subCategory: subCategory,
        }),
      });

      if (response.ok) {
        console.log('Data stored in assessment table:', category, subCategory);
        // Add any additional actions you want to perform after storing data
      } else {
        console.error('Failed to store data in assessment table');
      }
    } catch (error) {
      console.error('Error storing data in assessment table:', error);
    }
  };

  useEffect(() => {
    // fetchPatientDetails();
  }, []);

  const notifyAssessment = async () => {
    try {
      const response = await fetch('http://192.168.4.55:3001/patients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID: patientId,
          category: category,
          subCategory: subCategory,
        }),
      });

      if (response.ok) {
        Alert.alert('Assessment Notified', 'The assessment has been notified.');
      } else {
        Alert.alert('Error', 'Failed to notify assessment. Please try again.');
      }
    } catch (error) {
      console.error('Error notifying assessment:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <VStack space={4} alignItems="center" style={styles.container}>
        <Button
          w={240}
          height={140}
          padding={50}
          style={styles.button}
          endIcon={<Icon name="plus-circle" size={40} color="#FFF" />}
          onPress={() => navigation.navigate('AssignCards', { patientId })}
        >
          Assign Cards
        </Button>
        <Button
          w={240}
          height={140}
          padding={50}
          colorScheme="blueGray"
          endIcon={<Icon name="edit" size={40} color="#FFF" />}
          onPress={() => {
            Alert.alert('Assessment Notified', 'The assessment has been notified.');
            fetchPatientDetails();
          }}
        >
          Notify Assessment
        </Button>
        <Button
          w={240}
          height={140}
          padding={45}
          colorScheme="yellow"
          endIcon={<MIcon name="message" size={40} color="#FFF" />}
          onPress={() => navigation.navigate('Progress')}
        >
          View progress
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Patient;
