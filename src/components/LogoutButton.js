import React from 'react';
import { Button } from 'react-native';

const LogoutButton = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  };

  return (
    <Button
      mode="outlined"
      colorScheme="gray"
      onPress={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
