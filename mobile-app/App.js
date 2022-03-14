
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useState, useEffect } from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/home.js'
import BluetoothScreen from './screens/bluetooth.js';
import WebsiteScreen from './screens/website.js';
import LoginScreen from './screens/auth.js';

const Stack = createNativeStackNavigator()

const url = 'https://can-connect-server.herokuapp.com'


export const AuthContext = React.createContext();

const App = () => {
  const [authState, setAuthState] = useState(null)

  const getAuthState = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user)
      if (user === null) {
        console.log('user is null')
        setAuthState(false)
      } else {
        const res = await axios.post(`${url}/user/auth`, {}, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        setAuthState(true)
      }
    } catch (error) {
      setAuthState(false)
    }
  }

  useEffect(()=>{
    getAuthState()
  }, [])

  return (
    <NavigationContainer>
      <AuthContext.Provider value={[authState, setAuthState]}>
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
      </AuthContext.Provider>
      
    </NavigationContainer>
    
  );
};


export default App;
