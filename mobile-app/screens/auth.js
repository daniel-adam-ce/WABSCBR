import React from 'react';
import {
  Text,
  Button,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { AuthContext } from '../App';
GoogleSignin.configure({
    webClientId: '469403570539-fnk4vhg7v5eb9ta1no0lr5fc24gco4b8.apps.googleusercontent.com', 
    offlineAccess: true
})



  
const LoginScreen = ({navigation}) => {
  
  const [authState, setAuthState] = useContext(AuthContext)
  const signIn = async (navigation) => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
        const user = {
          token: userInfo.idToken,
          isGoogle: true,
          profileObj: userInfo.user
        }
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
  return (
    <View>
      <Text>login</Text>
      <GoogleSigninButton
      style={{width:192, height: 48}}
      onPress={()=>{
        signIn(navigation)
      }}
      />
      <Button 
      title="go to home"
      onPress={()=>{
        navigation.navigate('Home')
      }}
      />
    </View>
  )
}

export default LoginScreen