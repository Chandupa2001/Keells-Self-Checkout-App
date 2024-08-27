import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { Colors } from '@/constants/Colors';

export default function Verify() {
  return (
    <View>
      <View style={styles.vectorContainer}>
        <Image source={require('../../../assets/images/vector.png')} style={styles.vector} />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo_green.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.verifyTxt} >Please type the vertification code send to</Text>
      <Text style={[styles.verifyTxt, { marginBottom: '5%' }]} >+9471 0253XXX</Text>

      <View style={styles.otpContainer}>
        <OTPTextInput textInputStyle={styles.otptext} tintColor={Colors.Primary} offTintColor={Colors.Primary} />
      </View>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.loginText}>
          Miss my vertification?
          <Text style={styles.loginLink} > Re-send code</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  vector: {
    width: '75%',
    resizeMode: 'contain',
  },
  vectorContainer: {
    marginTop: -17,
    marginBottom: 20
  },
  logoContainer: {
    marginBottom: -30
  },
  logo: {
    width: '50%',
    height: '40%',
    alignSelf: 'center'
  },
  verifyTxt: {
    fontFamily: 'poppins',
    textAlign: 'center',
    color: '#AAAAAA',
  },
  otpContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  otptext: {
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '12%',
    marginBottom: '6%',
    marginHorizontal: '5%',
    shadowColor: "#82C969",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'poppins-bold',
  },
  loginText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginTop: -8,
    fontFamily: 'poppins'
  },
  loginLink: {
    color: Colors.Primary,
    fontFamily: 'poppins-semibold',
  },
})