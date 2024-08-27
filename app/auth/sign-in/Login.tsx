import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function Login() {

    const [phoneNumber, setPhoneNumber] = useState('+94');

    const router = useRouter();

    const handlePhoneNumberChange = (text: any) => {
        if (!text.startsWith('+94')) {
          setPhoneNumber('+94');
        } else {
          setPhoneNumber(text);
        }
    };

    return (
        <View>
            <View style={styles.vectorContainer}>
                <Image source={require('../../../assets/images/vector.png')} style={styles.vector} />
            </View>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/images/logo green.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText} >Enter your Nexus Mobile number</Text>
                <View style={styles.inputField}>
                <Feather name="phone" size={20} color="black" style={{ marginHorizontal: '5%' }} />
                <TextInput 
                    inputMode='numeric'
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    maxLength={12}
                />
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <View>
                <Text style={styles.createAccountText}>
                    Don't have a Nexus Account?
                    <Text style={styles.createAccountLink} onPress={() => router.push('/auth/sign-up/SignUp')} > Create one</Text>
                </Text>
            </View>
        </View>
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
        fontFamily: 'poppins'
    },
    inputField: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        backgroundColor: 'E5E5E5',
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 5,
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: '10%',
        padding: 15,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
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
        fontFamily: 'poppins'
    },
    createAccountLink: {
        color: Colors.Primary,
        fontWeight: 'bold',
    },
});