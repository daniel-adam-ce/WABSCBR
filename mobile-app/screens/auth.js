import React from 'react';
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
GoogleSignin.configure({
    webClientId: '469403570539-fnk4vhg7v5eb9ta1no0lr5fc24gco4b8.apps.googleusercontent.com', 
    offlineAccess: true
})



  
const LoginScreen = ({navigation}) => {
  
  const [authState, setAuthState] = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const url = 'https://can-connect-server.herokuapp.com';

  const signInGoogle = async (navigation) => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
        const user = {
          token: userInfo.idToken,
          isGoogle: true,
          profileObj: userInfo.user
        }
        const res = await axios.post(`${url}/user/auth/google`, {tokenId: user.token})
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setAuthState(true)
        navigation.navigate('Home')
        // this.setState({ userInfo });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
        console.log(error)
      }
  };

  const signInNative = async () => {
    try {
      const res = await axios.post(`${url}/user/auth/login?email=${email}&password=${password}`)
      await AsyncStorage.setItem('user', res.data)
      setAuthState(true)
      navigation.navigate('Home')
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <View style={styles.view}>

      <Text style={styles.textHelpers}>Email</Text>
      <TextInput style={styles.textInput} value={email} onChange={(event)=>{
        setEmail(event.target.value)
      }}/>

      <Text style={styles.textHelpers}>Password</Text>
      <TextInput style={styles.textInput} value={password} onChange={(event)=>{
        setPassword(event.target.value)
      }}></TextInput>

      <Pressable 
      style={styles.btn}
      onPress={()=>{
        signInNative()
      }}
      >
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Text style={styles.textExtra}>or</Text>
      <GoogleSigninButton
      style={styles.googleBtn}
      onPress={()=>{
        signInGoogle(navigation)
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 24
  },
  textHelpers: {
    color: 'black',
    marginLeft: 12,
    marginTop: 12
  },
  textExtra: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    borderColor: '#bbbbbb',
    backgroundColor: 'white',
    borderRadius: 8
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24
  },
  btn: {
    backgroundColor: '#1990eb',
    textAlign: 'center',
    color: 'white',
    marginTop: 12,
    borderRadius: 10,
  },
  googleBtn: {
    marginLeft: '0%',
    width: '100%', 
    height: 48
  }

})

export default LoginScreen