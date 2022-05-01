
import React from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Pressable,
  ImageBackground
} from 'react-native';

import { useEffect, useState, useContext } from 'react';
import landingImg from '../capture.jpg'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../App';

const url = 'https://can-connect-server.herokuapp.com'


 
const HomeScreen = ({navigation}) => {
  const [authState, setAuthState] = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setAuthState(false)
      navigation.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ImageBackground source={landingImg} imageStyle={{opacity:0.85}} style={styles.backgroundImg}>
      <Text style={styles.text1}>CAN Connect.</Text>
      <Text style={styles.text2}>Upload your car's data.</Text>
      {!authState && <Pressable 
      style={styles.btn}
      onPress={()=>{
        navigation.navigate('Login')
      }}
      >
        <Text style={{color: 'white'}}>Get Started</Text>
      </Pressable>}
      {authState && <Pressable 
      style={styles.btn}
      onPress={()=>{
        navigation.navigate('Bluetooth')
      }}
      >
        <Text style={{color: 'white'}}>Connect Bluetooth Device</Text>
      </Pressable>}
      {authState && <Pressable 
      style={styles.btn}
      onPress={()=>{
        navigation.navigate('Website')
      }}
      >
        <Text style={{color: 'white'}}>Website</Text>
      </Pressable>}

      {authState && <Pressable 
      style={styles.btn}
      onPress={()=>{
        handleLogout()
      }}
      >
        <Text style={{color: 'white'}}>Logout</Text>
      </Pressable>}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    backgroundImg: {
        opacity: 1.0,
        width: '100%',
        height: '100%',
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        color: 'white',
        fontSize: 30,
        marginTop: 25,
        // marginLeft: '25%',
    },
    text2: {

        color: 'white',
        fontSize: 15,
        marginTop: 25,
        // marginLeft: '25%',
    },
    btn: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        // elevation: 10,
        backgroundColor: '#38a1f1',
        width: '65%',
        marginTop: 25,
        // marginLeft: '25%'
    }
  });

export default HomeScreen