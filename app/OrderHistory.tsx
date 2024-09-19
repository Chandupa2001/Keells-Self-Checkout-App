import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { firebase } from '../configs/FirebaseConfig';

type CartItem = {
    data: {
        price: number;
        productName: string;
        productSize: string;
        serialNo: string;
        unit: string;
    };
    id: string;
    qty: number;
};

type Order = {
    id: string;
    data: {
        orderDate: string;
        totalAmount: number;
        cartItems: CartItem[];
    };
};

export default function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const querySnapshot = await firebase.firestore().collection('orders').get();
            const ordersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data() as Order['data'],
            }));
            setOrders(ordersData);
            console.log(ordersData);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleExpansion = (orderId: string) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtnContainer}
                    onPress={() => router.replace('/(tabs)/home')}
                >
                    <Ionicons name="chevron-back-outline" size={24} color={Colors.Primary} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>Order History</Text>
                </View>
                <View style={[styles.backBtnContainer, { backgroundColor: Colors.Primary }]} />
            </View>

            <ScrollView>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <View key={order.id} style={styles.card}>
                            <View style={styles.orderHeader}>
                                <View>
                                    <Text style={styles.orderText}>
                                        Order Date: {new Date(order.data.orderDate).toLocaleString()}
                                    </Text>
                                    <Text style={[styles.orderText, {fontWeight: 'bold'}]}>Total Amount: Rs. {order.data.totalAmount}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.expandButton}
                                    onPress={() => toggleExpansion(order.id)}
                                >
                                    <MaterialIcons name={expandedOrderId === order.id ? 'expand-less' : 'expand-more'} size={25} />
                                </TouchableOpacity>
                            </View>

                            {expandedOrderId === order.id && (
                                <View style={styles.cartItemsContainer}>
                                    {order.data.cartItems.map((item) => (
                                        <View key={item.id} style={styles.itemRow}>
                                            <Text style={styles.itemDetails}>
                                                {item.data.productName} {item.data.productSize} {item.data.unit} * {item.qty}
                                            </Text>
                                            <Text style={styles.itemPrice}>
                                                Rs. {item.data.price * item.qty}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                        </View>
                    ))
                ) : (
                    <Text style={styles.noOrdersText}>No orders found</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
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
        justifyContent: 'space-between',
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
        marginLeft: '8%',
    },
    card: {
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 15,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'poppins'
    },
    expandButton: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: '#C8C8C8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    expandButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cartItemsContainer: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5, 
    },
    itemDetails: {
        fontSize: 16,
        fontFamily: 'poppins'
    },
    itemPrice: {
        fontSize: 16,
        textAlign: 'right',
        fontFamily: 'poppins'
    },
    noOrdersText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});
