import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { firebase } from '../../configs/FirebaseConfig'

interface Deals {
  id: string;
  data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  };
}

export default function notification() {

  const [deals, setDeals] = useState<Deals[]>([]);

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection("deals").get();

      const tempData: Deals[] = [];
      querySnapshot.forEach((documentSnapshot) => {
        const data = documentSnapshot.data();
        tempData.push({
          id: documentSnapshot.id,
          data: {
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
          },
        });
      });
      setDeals(tempData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      {deals.map((deal) => (
        <View key={deal.id} style={styles.card}>
          <Text style={styles.cardTitle}>{deal.data.title}</Text>
          <Text style={styles.cardDesc} >{deal.data.description}</Text>

          <View style={styles.cardDate} >
            <Text>{"From: " + deal.data.startDate}</Text>
            <Text>{"To: " + deal.data.endDate}</Text>
          </View>
        </View>
      ))}
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
    marginBottom: '5%'
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'poppins-semibold',
    marginTop: '5%',
  },
  card: {
    marginHorizontal: '5%',
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: 20,
  },
  cardTitle: {
    fontFamily: 'poppins-semibold',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: '5%'
  },
  cardDesc: {
    fontFamily: 'poppins',
    textAlign: 'center',
    marginBottom: '5%'
  },
  cardDate: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})