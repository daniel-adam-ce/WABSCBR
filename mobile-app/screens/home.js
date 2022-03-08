
import React from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Pressable,
  ImageBackground
} from 'react-native';

import { useEffect, useState } from 'react';
import landingImg from '../capture.jpg'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://can-connect-server.herokuapp.com'

const checkAuth = async () => {
  const [authState, setAuthState] = useState(false)
  useEffect(()=>{
      let user = ''
      AsyncStorage.getItem('user').then((res)=>{
        console.log(res)
        user = JSON.parse(res)
        if (user === null) {
          console.log('user is null')
        } else {
          axios.post(`${url}/user/auth`, {}, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }).then((res)=>{
            console.log(res)
            setAuthState(true)
          })
        }
      }).catch((res)=>{
        console.log(res.response)
      })
      
  }, [])
  return [authState, setAuthState]
}
 
const HomeScreen = ({navigation}) => {

  const [authState, setAuthState] = useState(false)

  useEffect(()=>{
    let user = ''
    AsyncStorage.getItem('user').then((res)=>{
      user = JSON.parse(res)
      // console.log('user:', user)
      if (user === null) {
        console.log('user is null')
      } else {
        axios.post(`${url}/user/auth`, {}, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }).then((res)=>{
          // console.log(res)
          setAuthState(true)
        }).catch((res)=>{
          setAuthState(false)
          console.log(res.response)
        })
      }
    }).catch((res)=>{
      setAuthState(false)
      console.log(res.response)
    })
    
}, [])

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