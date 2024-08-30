import { View, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';

export default function Scan() {

  const isFocused = useIsFocused();
  const camRef = useRef<CameraView>(null);
  
  const [camPermissionStatus, requestCamPermission] = useCameraPermissions();

  useEffect(() => {
    if (camPermissionStatus) {
      if (!camPermissionStatus.granted) requestCamPermission();
    } else requestCamPermission();
  }, []);

  console.log(camPermissionStatus)
  

  return (
    <View style={styles.container}>
      {isFocused && <StatusBar barStyle="light-content" backgroundColor="#A2D68F" />}
      <View style={styles.box}>
        <CameraView 
        facing={CameraType.back} 
        ref={camRef}
        style={styles.camera} 
        mode='picture'
        barcodeScannerSettings={{
          barcodeTypes:['qr', 'aztec', 'codabar', 'code128', 'code39', 'code93', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e' ]
        }}
        onBarcodeScanned={(d) => console.log(d)}
      >

        </CameraView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2D68F',
    justifyContent: 'center',  
    alignItems: 'center',      
  },
  box: {
    width: '85%',
    height: '25%',
  },
  camera: {
    width: '100%', 
    flex: 1, 
    position: 'relative'
  }
});
