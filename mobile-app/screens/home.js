
import React from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Pressable,
  ImageBackground
} from 'react-native';

import landingImg from '../capture.jpg'

const HomeScreen = ({navigation}) => {
    return (
      <ImageBackground source={landingImg} imageStyle={{opacity:0.85}} style={styles.backgroundImg}>
        <Text style={styles.text1}>CAN Connect.</Text>
        <Text style={styles.text2}>Upload your car's data.</Text>
        <Pressable 
        style={styles.btn}
        onPress={()=>{
          navigation.navigate('Login')
        }}
        >
            <Text style={{color: 'white'}}>Get Started</Text>
        </Pressable>
        <Pressable 
        style={styles.btn}
        onPress={()=>{
          navigation.navigate('Bluetooth')
        }}
        >
            <Text style={{color: 'white'}}>Bluetooth test</Text>
        </Pressable>
        <Pressable 
        style={styles.btn}
        onPress={()=>{
          navigation.navigate('Website')
        }}
        >
            <Text style={{color: 'white'}}>Website</Text>
        </Pressable>
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
        width: '50%',
        marginTop: 25,
        // marginLeft: '25%'
    }
  });

export default HomeScreen