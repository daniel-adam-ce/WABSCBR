
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/home.js'
import BluetoothScreen from './screens/bluetooth.js';
import WebsiteScreen from './screens/website.js';
import LoginScreen from './screens/auth.js';

const Stack = createNativeStackNavigator()


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Bluetooth"
          component={BluetoothScreen}
        />
        <Stack.Screen
          name="Website"
          component={WebsiteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};


export default App;
