import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { firebase } from '../../configs/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Profile() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      }
    } else {
      console.log("No user found")
    }
  }

  const onSignOut = () => {
    Alert.alert("Log Out", "Are you sure you need to logout from the app?",[
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          firebase.auth().signOut().then(() => {
            AsyncStorage.clear();
            router.replace('/auth/sign-in/Login')
          }).catch((error) => {
            console.log(error)
          });
        }
      }
    ])
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image style={styles.profilePic} source={require('../../assets/images/profile.png')} />
        <View>
          <Text style={styles.nametxt}>{name}</Text>
          <Text>{email}</Text>
          <TouchableOpacity style={styles.editbtn}>
            <Text style={styles.editBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.settingContainer}>
        <View style={styles.settingTitleContainer}>
          <FontAwesome name="lock" size={24} color={Colors.Primary} style={styles.settingIcon} />
          <View>
            <Text style={styles.titleTxt}>Change Password</Text>
            <Text style={styles.subTitleText}>Change your password</Text>
          </View>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingContainer}>
        <View style={styles.settingTitleContainer}>
          <FontAwesome name="lock" size={24} color={Colors.Primary} style={styles.settingIcon} />
          <View>
            <Text style={styles.titleTxt}>About Us</Text>
            <Text style={styles.subTitleText}>About us</Text>
          </View>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingContainer}>
        <View style={styles.settingTitleContainer}>
          <MaterialIcons name="privacy-tip" size={20} color={Colors.Primary} style={styles.settingIcon} />
          <View>
            <Text style={styles.titleTxt}>Privacy Policy</Text>
            <Text style={styles.subTitleText}>View our privacy poliy</Text>
          </View>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingContainer}>
        <View style={styles.settingTitleContainer}>
          <MaterialCommunityIcons name="frequently-asked-questions" size={20} color={Colors.Primary} style={styles.settingIcon} />
          <View>
            <Text style={styles.titleTxt}>FAQ</Text>
            <Text style={styles.subTitleText}>Asked any questions</Text>
          </View>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingContainer} onPress={onSignOut}>
        <View style={styles.settingTitleContainer}>
          <Entypo name="log-out" size={24} color={Colors.Primary} style={styles.settingIcon} />
          <View>
            <Text style={styles.titleTxt}>Logout</Text>
            <Text style={styles.subTitleText}>Logout of the app</Text>
          </View>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>

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
    height: '12%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    marginBottom: '5%',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'poppins-semibold',
    marginTop: '5%',
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginBottom: '10%',
    backgroundColor: 'white',
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
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15, 
    paddingHorizontal: '8%', 
    marginBottom: 5, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  settingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  settingIcon: {
    marginRight: 20, 
  },
  arrowIcon: {
    marginRight: '5%',
  },
  titleTxt: {
    fontFamily: 'poppins-semibold',
    fontSize: 16,
  },
  subTitleText: {
    fontFamily: 'poppins',
    color: '#6E726E',
  },
});
