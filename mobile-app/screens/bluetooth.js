/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

 import React, {
    useState,
    useEffect,
  } from 'react';
  import {
    StyleSheet,
    PermissionsAndroid,
    Toast,
    ToastAndroid,
    View,
    Text,
    Pressable,
    ScrollView
  } from 'react-native';
  
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
  
  import RNBluetoothClassic, {
    BluetoothDevice
  } from 'react-native-bluetooth-classic';
  
  
  

  const BluetoothScreen = ({navigation}) => {

    const [bluetoothState, setBluetoothState] = useState({})
    
    const requestAccessFineLocationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access fine location required for discovery',
          message:
            'In order to perform discovery, you must enable/allow ' +
            'fine location access.',
          buttonNeutral: 'Ask Me Later"',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    };
    
    startDiscovery = async () => {
      try {
        console.log('starting...')
        let granted = await requestAccessFineLocationPermission();
    
        if (!granted) {
        throw new Error(`Access fine location was not granted`);
        }
    
        setBluetoothState({ discovering: true });
    
        let unpaired = await RNBluetoothClassic.startDiscovery();
        console.log(`Found ${unpaired.length} unpaired devices.`)
        ToastAndroid.show(`Found ${unpaired.length} unpaired devices.`, 2000);
        setBluetoothState({ unpaired, discovering: false });
        

      } catch (err) {
        ToastAndroid.show(err.message, 2000);
      }
    }

    useEffect(()=>{
      startDiscovery()
    }, [])
  
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          {bluetoothState.discovering ? 
          <Text style={{marginTop: 10, color: 'black'}}>Searching...</Text> :<Text style={{marginTop: 10, color: 'black'}}>Select a device to pair:</Text> }
          {bluetoothState.unpaired !== undefined && (bluetoothState.unpaired.map((device)=>{
            return (
                <Pressable 
                key={device._nativeDevice.address}
                style={styles.btn}
                onPress={async ()=>{
                  try {
                    await RNBluetoothClassic.pairDevice(device._nativeDevice.address)
                  } catch (error) {
                    console.error(error)
                  }
                }}
                >
                <Text style={{color: 'white'}}>Address: {device._nativeDevice.address}</Text>
                <Text style={{color: 'white'}}>Device Name: {device._nativeDevice.name}</Text>
              </Pressable> 
            )
          }))}
        </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    btn: {
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      // elevation: 10,
      backgroundColor: '#38a1f1',
      width: '50%',
      marginTop: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderColor: 'red'
      // marginLeft: '25%'
  }
  });
  
  export default BluetoothScreen;