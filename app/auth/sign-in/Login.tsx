import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function Login() {

    const [phoneNumber, setPhoneNumber] = useState('+94');
    const [hidePass, setHidePass] = useState(true);

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

            <View style={styles.itemContainer}>

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
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.createAccountText}>
                        Don't have a Nexus Account?
                        <Text style={styles.createAccountLink} onPress={() => router.push('/auth/sign-up/SignUp')} > Create one</Text>
                    </Text>
                </View>

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
        fontFamily: 'poppins'
    },
    createAccountLink: {
        color: Colors.Primary,
        fontFamily: 'poppins-semibold',
    },
});