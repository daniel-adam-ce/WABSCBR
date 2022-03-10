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
    ScrollView,
    NativeModules
  } from 'react-native';
  
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
  
  import RNBluetoothClassic, {
    BluetoothDevice
  } from 'react-native-bluetooth-classic';
  
  const { EnableDiscovery } = NativeModules;
  

  const BluetoothScreen = ({navigation}) => {

    const [bluetoothState, setBluetoothState] = useState({})


    const acceptConnections = async () => {
      setBluetoothState({ accepting: true });
      console.log('accept connections')
      try {
        const granted = await requestBluetoothAdvertise();
        console.log(granted)
        if (!granted) {
          throw new Error('Advertisement was not granted');
          }
        console.log('accepting...')
        let device = await RNBluetoothClassic.accept({});
        console.log('finished acception')
        console.log(device)
        console.log(device?._nativeDevice)
        console.log(device?.name, device?.address)
        setBluetoothState({device});
      } catch (error) {
        // Handle error accordingly
        console.error(error)
        setBluetoothState({accepting:false})
      } finally {
        setBluetoothState({ accepting: false });
      }
    }

    useEffect(()=>{
      return () => {
        if (bluetoothState.acceptimg) {
          RNBluetoothClassic.cancelAccept()
        }
      }
    }, [])
  
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <Pressable
          style={styles.btn}
          onPress={()=> {
              console.log(EnableDiscovery)
              // EnableDiscovery.Test((res)=>{
              //   console.log(res)
              // })
              EnableDiscovery.EnableAppDiscovery()
              console.log('done')
            
          }}
          >
            <Text>accept</Text>
          </Pressable>
          <Pressable
          style={styles.btn}
          onPress={() => {
              RNBluetoothClassic.cancelAccept().then((res)=>{
                console.log('cancel',res)
              })
            }}
          >
            <Text>cancel</Text>
          </Pressable>
          {bluetoothState.accepting ? <Text>
            accepting
          </Text> : <Text>{`address: ${bluetoothState.device?.address}`} {`name: ${bluetoothState.device?.name}`}</Text>}
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