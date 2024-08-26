import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

export default function SignUp() {
  return (
    <View>
      <View style={styles.vectorContainer}>
        <Image source={require('../../../assets/images/vector.png')} style={styles.vector} />
      </View>
      <Text>Nexus Registration</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  vector: {
    width: '75%',
    resizeMode: 'contain',
  },
  vectorContainer: {
    marginTop: -17
  },
  logoContainer: {
    marginBottom: 20
  },
  logo: {
    width: '50%',
    height: '45%',
    alignSelf: 'center'
  },
  inputContainer: {
    marginHorizontal: '10%',
    marginTop: -20
  },
  inputText: {
    fontFamily: 'roboto'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    marginHorizontal: '10%',
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'roboto-bold',
  },
  createAccountText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginTop: -15,
    fontFamily: 'roboto'
  },
  createAccountLink: {
    color: Colors.Primary,
    fontWeight: 'bold',
  },
});