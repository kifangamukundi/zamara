import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

import { AuthContext } from './AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import Staff from './components/Staff';
import CreateStaff from './components/CreateStaff';
import UpdateStaff from './components/UpdateStaff';

import Continents from './components/Continents';
import Menu from './components/Menu';

const Stack = createStackNavigator();

const Main = () => {
  const { user } = useContext(AuthContext);

  const handleMenuToggle = () => {
    // TODO: Implement menu toggle logic
  };

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerLeft: () => (
                  <View style={{ marginLeft: 10 }}>
                    <Text onPress={handleMenuToggle}>Menu</Text>
                  </View>
                ),
              }}
              initialParams={{ user }}
            />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
          <Stack.Screen name="Staff" component={Staff} />
          <Stack.Screen name="CreateStaff" component={CreateStaff} />
          <Stack.Screen name="UpdateStaff" component={UpdateStaff} />
          <Stack.Screen name="Continents" component={Continents} />
        </Stack.Navigator>
        {/* <Menu /> */}
        {user && <Menu />}
      </NavigationContainer>
  );
};

export default Main;
