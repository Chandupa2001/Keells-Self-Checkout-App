import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { firebase } from '../configs/FirebaseConfig'

export default function EditProfile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const uid = await AsyncStorage.getItem('USERID');
        if (uid) {
            const user = (await firebase.firestore().collection('users').doc(uid).get()).data();
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setPhoneNo(user.phoneNumber)
            }
        } else {
            console.log("No user found")
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => router.replace('/(tabs)/profile')}>
                    <Ionicons name="chevron-back-outline" size={24} color={Colors.Primary} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>Edit Profile</Text>
                </View>
                <View style={[styles.backBtnContainer, { backgroundColor: Colors.Primary }]}>
                </View>
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.photoContainer}>
                    <Image style={styles.profilePic} source={require('../assets/images/profile.png')} />
                    <Text style={styles.deleteTxt}>Delete photo</Text>
                </View>
                <View>
                    <Text style={styles.nametxt}>{name}</Text>
                    <Text>{email}</Text>
                    <TouchableOpacity style={styles.editbtn} onPress={() => router.push('/EditProfile')}>
                        <Text style={styles.editBtnTxt}>Change Photo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputField}>
                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email Address"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={name}
                            style={styles.input}
                            onChangeText={setName}
                            placeholder="Name"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phoneNo}
                            onChangeText={setPhoneNo}
                            placeholder="Mobile Number"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: Colors.Primary,
        flexDirection: 'row',
        height: '12%',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        marginBottom: '5%',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTxtContainer: {
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'poppins-semibold',
        marginTop: '5%',
    },
    backBtnContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '8%'
    },
    profileContainer: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginBottom: '3%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        marginRight: '5%',
        borderRadius: 10,
    },
    nametxt: {
        fontFamily: 'poppins',
        fontSize: 20,
        color: '#141514',
    },
    editbtn: {
        marginTop: '10%',
        padding: 8,
        borderColor: '#C8C8C8',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 15,
    },
    editBtnTxt: {
        fontWeight: '800',
    },
    photoContainer: {
        alignItems: 'center'
    },
    deleteTxt: {
        marginTop: 10,
        color: 'red',
    },
    inputField: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between'
    },
    inputContainer: {
        marginTop: 25
    },
    label: {
        marginBottom: 5,
        fontFamily: 'poppins'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#82C969",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 50
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'poppins-bold',
    },
})