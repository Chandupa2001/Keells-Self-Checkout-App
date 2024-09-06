import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { firebase } from '../../configs/FirebaseConfig'
import { useStripe } from '@stripe/stripe-react-native';

interface CartItem {
  id: string;
  data: {
    productName: string;
    productSize: string;
    price: string;
    unit: string;
    serialNo: string;
  };
  qty: number;
}


export default function Cart() {

  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [errormsg, setErrorMsg] = useState('');

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      if (!userId) return;

      const userDoc = await firebase.firestore().collection('users').doc(userId).get();
      const cartItems = userDoc.data()?.cart || [];

      const initializedCartItems = cartItems.map((item: CartItem) => ({
        ...item,
        qty: item.qty || 1
      }));

      setCartList(initializedCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addItem = async (item: CartItem) => {
    const updatedCart = cartList.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
    );
    updateCart(updatedCart);
  };

  const removeItem = async (item: CartItem) => {
    const updatedCart = cartList.map(cartItem =>
      cartItem.id === item.id && cartItem.qty > 1 ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
    );
    updateCart(updatedCart);
  };

  const deleteItem = async (index: number) => {
    Alert.alert('Delete Confirmation', 'Are you sure you need to remove it from cart', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          const updatedCart = cartList.filter((_, i) => i !== index);
          updateCart(updatedCart);
        }
      },
    ]);
  };

  const updateCart = async (updatedCart: CartItem[]) => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      if (!userId) return;

      await firebase.firestore().collection('users').doc(userId).update({ cart: updatedCart });
      getCartItems();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const getTotal = () => {
    return cartList.reduce((total, item) => {
      const itemPrice = parseFloat(item.data.price);
      const itemQuantity = parseFloat(item.qty.toString());
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return total + (itemPrice * itemQuantity);
      } else {
        return total;
      }
    }, 0);
  };

  const fetchPaymentSheetParams = async () => {

    const totalAmount = getTotal() * 100;
    const response = await fetch(`http://192.168.8.106:3000/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount
      })
    });
    const { paymentIntent } = await response.json();

    return {
      paymentIntent,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      setErrorCode(error.code);
      setErrorMsg(error.message)
      setErrorModal(true);
    } else {
      await addOrderToFirestore();
      setSuccessModal(true);
    }
  };

const addOrderToFirestore = async () => {
  try {
    const userId = await AsyncStorage.getItem('USERID');
    if (!userId) return;

    const orderData = {
      userId: userId,
      cartItems: cartList, 
      totalAmount: getTotal(),  
      orderDate: new Date().toISOString(),  
    };

    await firebase.firestore().collection('orders').add(orderData);

    await updateCart([]); 

    console.log('Order saved successfully.');
  } catch (error) {
    console.error('Error adding order to Firestore:', error);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cartList}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameText} numberOfLines={2} ellipsizeMode='tail'>{item.data.productName + " " + item.data.productSize + item.data.unit}</Text>
              <Text style={styles.priceText}>{"Rs. " + item.data.price}</Text>
            </View>
            <View style={styles.cartDesc}>
              <View style={styles.cartcountContainer}>
              <Entypo name='minus' size={25} color={Colors.Primary} onPress={() => removeItem(item)} />
              <View style={styles.itemCount}>
                <Text>{item.qty}</Text>
              </View>
              <Entypo name='plus' size={25} color={Colors.Primary} onPress={() => addItem(item)} />
              </View>
              <View style={styles.deleteContainer}>
                <MaterialCommunityIcons name='delete-empty-outline' color={'white'} size={24} onPress={() => deleteItem(index)} />
              </View>
            </View>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalText}>Sub Total: </Text>
        <Text style={styles.totalPrice}>{'Rs. ' + getTotal()}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={ async () => {
        await initializePaymentSheet().then( async () => {
          await openPaymentSheet();
        })
      }} >
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={successModal}
        onRequestClose={() => setSuccessModal(!successModal)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={[styles.iconContainer, {backgroundColor: Colors.Primary}]}>
              <Ionicons name='bag-check-outline' color={'white'} size={36} />
            </View>
            <Text style={styles.statusText} >Success</Text>
            <Text style={styles.msgText} >Your payment was successful! Thank you for your purchase.</Text>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: Colors.Primary}]} onPress={() => setSuccessModal(false)}>
              <Text style={styles.modalbtntext}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={errorModal}
        onRequestClose={() => setErrorModal(!errorModal)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={[styles.iconContainer, {backgroundColor: 'red'}]}>
              <AntDesign name='question' color={'white'} size={36} />
            </View>
            <Text style={styles.statusText} >{'Error: ' + errorCode}</Text>
            <Text style={styles.msgText} >{errormsg}</Text>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: 'red'}]} onPress={() => setErrorModal(false)}>
              <Text style={styles.modalbtntext}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  itemContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: '5%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  nameTextContainer: {
    flex: 1,
    marginRight: 10
  },
  nameText: {
    fontFamily: 'poppins-semibold',
    fontSize: 15,
    marginBottom: 8,
    flexWrap: 'wrap',
    flexShrink: 1
  },
  priceText: {
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  cartDesc: {
    alignItems: 'center',
    width: 80
  },
  cartcountContainer: {
    flexDirection: 'row'
  },
  itemCount: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: '#00000033',
    alignItems: 'center',
    shadowColor: "#82C969",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    marginHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 5
  },
  deleteContainer: {
    width: 50,
    height: 30,
    backgroundColor: '#ED1C24',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    backgroundColor: '#C8C8C8',
    padding: 10,
    borderRadius: 15
  },
  totalText: {
    fontSize: 16,
    fontFamily: 'poppins'
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: 'poppins-semibold'
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
    elevation: 8,
    marginBottom: '35%'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'poppins-bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60, 
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 20,
    fontFamily: 'poppins-semibold',
    fontSize: 24,
  },
  msgText: {
    marginTop: 20,
    textAlign: 'center'
  },
  modalButton: {
    marginTop: 35,
    marginBottom: 10,
    width: '80%',
    padding: 13,
    alignItems: 'center',
    borderRadius: 10
  },
  modalbtntext: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'poppins-bold'
  }
})