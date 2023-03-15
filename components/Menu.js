import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

const Menu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleGoToStaff = () => {
    navigation.navigate('Staff');
  };

  const handleGoToContinents = () => {
    navigation.navigate('Continents');
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name={isMenuVisible ? 'close' : 'menu'} size={28} color="#fff" />
      </TouchableOpacity>

      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleGoToDashboard}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoToStaff}>
            <Text style={styles.menuItem}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoToContinents}>
            <Text style={styles.menuItem}>Continents</Text>
          </TouchableOpacity>
          {/* Logout */}
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#333',
    padding: 16,
    zIndex: 1, // to make sure the menu is on top of other elements
  },
  menu: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
});



export default Menu;
