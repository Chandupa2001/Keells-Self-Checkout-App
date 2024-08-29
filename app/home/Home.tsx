import { View, Text, StyleSheet, StatusBar, Image, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

    const [name, setName] = useState('');

    useEffect(() => {
        getName();
    }, [])

    const getName = async () => {
        const uid = await AsyncStorage.getItem('USERID');
        if (uid) {
            const user = (await firebase.firestore().collection('users').doc(uid).get()).data();
            setName(user.name);
        } else {
            console.log("No user found")
        }
    }

    return (
        <View>
            <StatusBar backgroundColor={Colors.Primary} />
            <View style={styles.topBox}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/logo_white.png')} />
                    <View style={styles.notificationContainer}>
                    <Ionicons name="notifications-sharp" size={24} color={Colors.Primary} />
                    </View>
                </View>
                <Text style={styles.textTop}>{'Hello, ' + name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        height: '45%',
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
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
    }
})