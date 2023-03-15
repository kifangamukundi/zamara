import React, { useState, useContext  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

// for testing
// "rshawe2", OWsTbMUgFc
const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('https://dummyjson.com/auth/login', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      const { id, token, firstName, lastName, username } = res.data;
      const newUser = {
        id: id,
        token: token,
        firstName: firstName,
        lastName: lastName,
        username: username,
        isLoggedIn: true,
      };
      // Store user in context
      login(newUser);
    })
    .catch(error => {
      console.error(error.response.data);
      // Handle login error
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#BDBDBD"
        onChangeText={setUsername}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#BDBDBD"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
