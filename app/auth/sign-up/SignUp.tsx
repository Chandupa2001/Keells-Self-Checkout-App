import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Href, useRouter } from 'expo-router';
import { firebase } from '../../../configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const [hidePass, setHidePass] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+94');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handlePhoneNumberChange = (text: any) => {
    if (!text.startsWith('+94')) {
      setPhoneNumber('+94');
    } else {
      setPhoneNumber(text);
    }
  };

  const onCreateAccount = async () => {
    if (!name || !email || !phoneNumber || !password) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG)
      return;
    }

    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);

      if(response.user) {
        const uid = response.user.uid;
        const data = {
          id: uid,
          name,
          email,
          phoneNumber
        };

        const userRef = firebase.firestore().collection('users').doc(uid);
        await userRef.set(data);

        await firebase.auth().currentUser?.sendEmailVerification();
        Alert.alert("Success", "User created successfully! \nPlease verify your email address to proceed.")
        router.push('/auth/sign-in/Login');
      } else {
        console.error('User object not available in response');
        Alert.alert('Error', 'An unexpected error occurred during registration.')
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message)
    }
  }  

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
                onChangeText={(text) => setName(text)}
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
                inputMode='email'
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Nexus Mobile Number</Text>
            <View style={styles.inputField}>
              <Feather
                name="phone"
                size={18}
                color="#6E726E"
                style={{ marginLeft: '3%', marginRight: '8%' }}
              />
              <TextInput
                placeholder="Enter your nexus number"
                placeholderTextColor={'#C8C8C8'}
                value={phoneNumber}
                inputMode='numeric'
                maxLength={12}
                onChangeText={handlePhoneNumberChange}
                style={styles.textInput}
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
                onChangeText={(text) => setPassword(text)}
              />
              <Feather
                name={hidePass ? 'eye-off' : 'eye'}
                size={18}
                onPress={() => setHidePass(!hidePass)}
                style={styles.icon}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onCreateAccount} >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.loginText}>
              already have an account?
              <Text style={styles.loginLink} onPress={() => router.push('/auth/sign-in/Login')} > Log in</Text>
            </Text>
          </View>

          <View id='recaptcha'></View>

        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: 'poppins',
    marginBottom: 10
  },
  loginLink: {
    color: Colors.Primary,
    fontFamily: 'poppins-semibold',
  },
});
