import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);

    const router = useRouter();  

    const onLoginPress = async () => {
        if (email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email, password);
                if (response.user) {
                    const uid = response.user.uid;
                    const userRef = await firebase.firestore().collection('users').doc(uid);

                    try {
                        const userSnapshot = await userRef.get();

                        if (userSnapshot.exists) {
                            AsyncStorage.setItem('USERID', uid);
                            router.replace('/(tabs)/home');
                        }
                    } catch (error) {
                        
                    }
                } else {
                    
                }
            } catch (error) {
                
            }
        }
    }

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

            <View style={styles.itemContainer}>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email Address</Text>
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
                            inputMode='email'
                            onChangeText={(text) => setEmail(text)}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <View style={styles.inputField}>
                        <MaterialIcons
                            name="password"
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

                <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.createAccountText}>
                        Don't have a Nexus Account?
                        <Text style={styles.createAccountLink} onPress={() => router.push('/auth/sign-up/SignUp')} > Create one</Text>
                    </Text>
                </View>

                <Text style={{marginVertical: '8%', textAlign: 'center', marginTop: 0, backgroundColor: 'purple', color: 'white', padding: 15}} onPress={() => router.replace('/(tabs)/home')}>Temporary Login</Text>

            </View>

        </View>
    );
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
        height: '35%',
        alignSelf: 'center'
    },
    itemContainer: {
        marginHorizontal: '5%',
        marginTop: '-5%'
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
        alignItems: 'center'
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
    createAccountText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginTop: -8,
        fontFamily: 'poppins',
        marginBottom: 10
    },
    createAccountLink: {
        color: Colors.Primary,
        fontFamily: 'poppins-semibold',
    },
});