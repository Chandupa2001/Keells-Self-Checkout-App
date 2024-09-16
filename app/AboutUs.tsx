import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function AboutUs() {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => router.replace('/(tabs)/profile')}>
                    <Ionicons name="chevron-back-outline" size={24} color={Colors.Primary} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>About Us</Text>
                </View>
                <View style={[styles.backBtnContainer, {backgroundColor: Colors.Primary}]}>
                </View>
            </View>

            <ScrollView>

            <Text style={styles.welcomeTxt}>Welcome to <Text style={{color: Colors.Primary}}>Keells</Text></Text>

            <View style={styles.aboutTxt}>

            <Text>Keells is proudly Sri Lankan, owned and operated over the last 25 years, delivering the freshest quality products, along with great value, serving thousands of Sri Lankans every day.{'\n'}</Text>

            <Text>As a subsidiary of the John Keells Group, Keells operates 116 supermarkets; 109 of which are fully owned and 6 franchise outlets operating under the ‘Super K’ brand. Operating with the core purpose of improving the quality of life for the nation, the supermarkets are conveniently located across the country providing our shoppers with a world class retail experience.{'\n'}</Text>

            <Text>With a passion for food particularly fresh food, our team of over 4500 people are at the heart of our success as we strive to provide our customers with an enjoyable shopping experience and our stakeholders with long lasting partnerships. With over 7 collection centers in strategic locations Keells sources fresh produce from farmers and ensures this produce reaches the stores in 24 hours delivering on the promise of freshness. Our SLSI certified bakeries at store provide oven fresh bread and bakery products and our Good Manufacturing Practices (GMP) certified hot kitchens provide the busy customers of today with food to go.{'\n'}</Text>

            <Text>Our ever-growing own label product portfolio includes over 335 products and Keells also carries a varied range of products exclusively sourced and sold at our supermarkets providing discerning customers a range of choice. Being the first supermarket to launch an online shopping platform providing customers with the facility of home delivery and click and collect, Keells also operates with state-of-the-art systems to ensure the operations run smooth providing consistent access to products customers need. The Nexus loyalty program with over 1.3 million membership provides customers with great deals and ways to save while shopping and earn points on top of that.{'\n'}</Text>

            <Text>Keells was also the first retailer in Sri Lanka to commit to reduce by 50%, single use polythene bag and instore prepared food packaging by the year 2025, ensuring that as the business grows the impact on the environment is minimized and sustainable practices employed. Over 57 of our stores also use solar power relying more on renewable sources of energy as another initiative towards being sustainable.{'\n'}</Text>
            </View>
            </ScrollView>
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
    welcomeTxt: {
        textAlign: 'center',
        fontFamily: 'poppins-semibold',
        fontSize: 25,
        marginVertical: '3%'
    },
    aboutTxt: {
        marginHorizontal: '5%'
    }
})