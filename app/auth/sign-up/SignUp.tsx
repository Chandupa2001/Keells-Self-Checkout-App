import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';

export default function SignUp() {
  const [hidePass, setHidePass] = useState(true);

  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.vectorContainer}>
          <Image source={require('../../../assets/images/vector.png')} style={styles.vector} />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.txt}>Welcome to our self-service application.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Name</Text>
            <View style={styles.inputField}>
              <Ionicons
                name="person-outline"
                size={18}
                color="#6E726E"
                style={{ marginLeft: '3%', marginRight: '8%' }}
              />
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={'#C8C8C8'}
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email address</Text>
            <View style={styles.inputField}>
              <Fontisto
                name="email"
                size={18}
                color="#6E726E"
                style={{ marginLeft: '3%', marginRight: '8%' }}
              />
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={'#C8C8C8'}
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Phone Number</Text>
            <View style={styles.inputField}>
              <Feather
                name="phone"
                size={18}
                color="#6E726E"
                style={{ marginLeft: '3%', marginRight: '8%' }}
              />
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={'#C8C8C8'}
                style={styles.textInput}
                secureTextEntry={hidePass}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <View style={styles.inputField}>
              <Feather
                name="lock"
                size={18}
                color="#6E726E"
                style={{ marginLeft: '3%', marginRight: '8%' }}
              />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={'#C8C8C8'}
                style={styles.textInput}
                secureTextEntry={hidePass}
              />
              <Feather
                name={hidePass ? 'eye-off' : 'eye'}
                size={18}
                onPress={() => setHidePass(!hidePass)}
                style={styles.icon}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.loginText}>
              already have an account?
              <Text style={styles.loginLink} onPress={() => router.push('/auth/sign-in/Login')} > Log in</Text>
            </Text>
          </View>

        </View>
      </View>
    </KeyboardAwareScrollView>
  );
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
    marginTop: -17,
  },
  itemContainer: {
    marginHorizontal: '5%',
    marginTop: '3%',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'poppins-semibold',
    color: Colors.Primary,
  },
  txt: {
    fontFamily: 'poppins',
    color: '#AAAAAA',
    marginTop: -5,
    marginBottom: '10%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputText: {
    fontFamily: 'poppins',
    color: '#3B3D3B',
  },
  inputField: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    marginTop: 5,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 8,
  },
  icon: {
    textAlign: 'right',
    marginRight: '3%'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: '8%',
    shadowColor: "#82C969",
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 4, 
    elevation: 8
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
    fontWeight: 'bold',
  },
});
