/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

 import React, {
    useState,
    useEffect,
    useRef,
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

    const [bluetoothState, setBluetoothState] = useState({test:true});
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [device, setDevice] = useState(null);
    const enableDiscoveryTimeoutRef = useRef()
    const acceptTimeoutRef = useRef()
    // console.log(bluetoothState?.device?.name, bluetoothState)
    const acceptTimer = () => {
      console.log(bluetoothState)
      const id = setTimeout(()=>{
        console.log('accept timer')
        RNBluetoothClassic.cancelAccept().then(()=>{  
          setBluetoothState({...bluetoothState, accepting: false})
        })
      }, 60000)
      acceptTimeoutRef.current = id;
    }

    const acceptConnections = async () => {
      setBluetoothState({...bluetoothState, accepting: true, device: null });
      console.log('accept connections')
      try {
        console.log('accepting...')
        acceptTimer()
        const device = await RNBluetoothClassic.accept({});
        console.log('finished acception')
        console.log(device?._nativeDevice)
        console.log(device?.name, device?.address)
        setDevice(device);
        setAddress(device.address)
        setName(device.name)
        setBluetoothState({...bluetoothState, paired: true})
        device.onDataReceived((res)=>{
          console.log(res)
        });
      } catch (error) {
        console.error(error)
      } finally {
        setBluetoothState({accepting: false });
      }
    };

    // may not be necessary - session may continue without needing discoverability to be reenabled
    // const enableDiscoveryTimer = () => {
    //   console.log(bluetoothState)
    //   const id = setTimeout(()=>{
    //     console.log('enDisc timer')
    //     setBluetoothState({...bluetoothState, discoveryEnabled: false})
    //   }, 300000)
    //   enableDiscoveryTimeoutRef.current = id;
    // }

    const sendData = async () => {
      try {
        const res = device.write("Test Write");
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    const returnDeviceText = () => {
      console.log('display')
      return (
        <>
          <Text style={{color: "black"}}>Paired Device: </Text>
          <Text style={{color: "black"}}> {`address: ${address}`}</Text>
          <Text style={{color: "black"}}> {`name: ${name}`}</Text>
        </>
      )
    }

    useEffect(()=>{
      const disableSub = RNBluetoothClassic.onBluetoothDisabled(()=>{
        ToastAndroid.show(`Please enable Bluetooth.`, 5000);
        RNBluetoothClassic.openBluetoothSettings();
      });

      RNBluetoothClassic.isBluetoothEnabled().then((res)=>{
        console.log(res ? 'Bluetooth is enabled' : 'Bluetooth is disabled')
        if (!res) {
          ToastAndroid.show(`Please enable Bluetooth.`, 5000);
          RNBluetoothClassic.openBluetoothSettings();
        }
      }).catch((res)=>{
        console.log(res)
      });
      return () => {
        clearTimeout(enableDiscoveryTimeoutRef.current)
        clearTimeout(acceptTimeoutRef.current)
        if (bluetoothState.acceptimg) {
          RNBluetoothClassic.cancelAccept();
          disableSub.remove();
        }
      }
    }, []);
  
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>

          {!bluetoothState.discoveryEnabled && <Pressable
          style={styles.btn}
          onPress={()=> {
              EnableDiscovery.EnableAppDiscovery((res)=> {
                if (res) {
                  console.log('cb', res);
                  setBluetoothState({...bluetoothState, discoveryEnabled: true})
                  // see definition of discoveryTimer
                  // enableDiscoveryTimer()
                }
              });
          }}
          >
            <Text style={{color: 'white'}}>Turn on Discoverability</Text>
          </Pressable>}
          {(bluetoothState.discoveryEnabled && !bluetoothState.accepting) && <Pressable
          style={styles.btn}
          onPress={() => {
              acceptConnections()
            }}
          >
            <Text style={{color: 'white'}}>Search for a Device</Text>
          </Pressable>}
          {bluetoothState.accepting && <Pressable
          style={styles.btn}
          onPress={() => {
              RNBluetoothClassic.cancelAccept().then((res)=>{
                console.log('cancel',res)
                setBluetoothState({...bluetoothState, accepting: false})
              });
            }}
          >
            <Text style={{color: 'white'}}>Cancel Search</Text>
          </Pressable>}

          {bluetoothState.accepting && <Text style={{color: "black"}}> Searching for a Device... </Text>} 
          
          {returnDeviceText()}
          {device && <Pressable
          style={styles.btn2}
          onPress={() => {
              sendData()
            }}
          >
            <Text style={{color: 'white'}}>Send Data</Text>
          </Pressable>}

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
      marginTop: '50%',
      marginBottom: 10,
      borderStyle: 'solid',
      borderColor: 'red'
      // marginLeft: '25%'
  },
  btn2: {
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