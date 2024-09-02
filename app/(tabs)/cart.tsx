import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'

export default function Cart() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.itemDesc}>
          <Text>Rose Wine 1.5L</Text>
          <Text>Rs. 3560</Text>
        </View>
        <View style={styles.cartDesc}>
          <Entypo name='minus' size={25} color={Colors.Primary} />
          <View style={styles.itemCount}>
            <Text>1</Text>
          </View>
          <Entypo name='plus' size={25} color={Colors.Primary} />
        </View>

      </View>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.Primary,
    height: '12%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'poppins-semibold',
    marginTop: '5%',
  },
  itemContainer: {
    width: '85%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: '15%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20
  },
  itemDesc: {

  },
  cartDesc: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemCount: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    shadowColor: "#82C969",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: '8%',
    marginHorizontal: '5%',
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
})