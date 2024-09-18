import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function EditProfile() {

    const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => router.replace('/(tabs)/profile')}>
                    <Ionicons name="chevron-back-outline" size={24} color={Colors.Primary} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>Edit Profile</Text>
                </View>
                <View style={[styles.backBtnContainer, {backgroundColor: Colors.Primary}]}>
                </View>
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
})