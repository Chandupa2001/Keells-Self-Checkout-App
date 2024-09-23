import { View, Text, StyleSheet, StatusBar, Image, LogBox, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router, useRouter } from 'expo-router';

export default function Home() {

    const [name, setName] = useState('');
    const isFocused = useIsFocused();

    const router = useRouter();

    useEffect(() => {
        getName();
    }, [])

    const getName = async () => {
        const uid = await AsyncStorage.getItem('USERID');
        if (uid) {
            const user = (await firebase.firestore().collection('users').doc(uid).get()).data();
            if (user) {
                setName(user.name);
            }
        } else {
            console.log("No user found")
        }
    }

    return (
        <View>
            {isFocused && <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} />}
            <View style={styles.topBox}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/logo_white.png')} />
                    <TouchableOpacity style={styles.notificationContainer} onPress={() => router.push('/OrderHistory')}>
                        <FontAwesome5 name="history" size={24} color={Colors.Primary} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textTop}>{'Hello, ' + name}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/home.jpg')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/scan')}>
                <Text style={styles.buttonTxt}>Start Shopping</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: '6%'
    },
    logoContainer: {
        flexDirection: 'row',
        marginHorizontal: 25,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        width: '25%',
        resizeMode: 'contain',
        marginTop: 20,
        justifyContent: 'flex-start'
    },
    notificationContainer: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22,
    },
    textTop: {
        color: 'white',
        fontFamily: 'poppins-semibold',
        fontSize: 20,
        marginLeft: 25,
        marginTop: -10
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '65%'
    },
    image: {
        width: '90%',
    },
    button: {
        padding: 20,
        marginTop: '55%',
        backgroundColor: Colors.Primary,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20
    },
    buttonTxt: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'poppins-semibold',
        fontSize: 16
    }
});
