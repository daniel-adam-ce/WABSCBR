import React from 'react';

import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'

const WebsiteScreen = ({navigation}) => {
    const [loadState, setLoadState] = useState(true)
    const [token, setToken] = useState(null)
    const loadToken = async () => {
      try {
        const user = await AsyncStorage.getItem('user')
        if (user === undefined) {
          navigation.navigate('Login')
        }
        setToken(JSON.parse(user).token)
        console.log('storage: ', token)
        setLoadState(false)
      } catch (error) {
        console.log(error) 
      }
    }
    useEffect(()=> {
      
      loadToken()
    }, [])
    return (
      <>
      {!loadState && 
      <WebView
        source={{
            uri: `http://10.0.0.214:5001/auth?token=${token}`
        }}
      />}
      </>
    )
}


export default WebsiteScreen