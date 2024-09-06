import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { firebase } from "../../configs/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ItemData {
  id: string;
  data: {
    productName: string;
    productSize: number;
    unit: string;
    price: number;
  };
  qty?: number;
}

export default function Scan() {
  const isFocused = useIsFocused();
  const camRef = useRef<CameraView>(null);

  const [camPermissionStatus, requestCamPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [items, setItems] = useState<ItemData[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (camPermissionStatus) {
      if (!camPermissionStatus.granted) requestCamPermission();
    } else requestCamPermission();
  }, [camPermissionStatus, scannedData]);

  const handleBarcodeScanned = (data: any) => {
    setScannedData(data);
    fetchData();
    setModalVisible(true);
  };

  const fetchData = async () => {
    const querySnapshot = await firebase
      .firestore()
      .collection("items")
      .where("serialNo", "==", scannedData)
      .get();

    const tempData: ItemData[] = [];
    querySnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data();
      if (data.serialNo == scannedData) {
        tempData.push({
          id: documentSnapshot.id,
          data: {
            productName: data.productName,
            productSize: data.productSize,
            unit: data.unit,
            price: data.price,
          },
        });
      }
    });
    setItems(tempData);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddToCart = async (item: ItemData) => {
    const userId = await AsyncStorage.getItem("USERID");
    if (userId) {
      const user = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      let tempCart = user.data()?.cart || [];

      const existingItemIndex = tempCart.findIndex(
        (itm: ItemData) => itm.id === item.id
      );
      if (existingItemIndex !== -1) {
        tempCart[existingItemIndex].qty += quantity;
      } else {
        tempCart.push({ ...item, data: { ...item, qty: quantity } });
      }

      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({ cart: tempCart });
      setModalVisible(false);
      setQuantity(1);
    }
  };

  const onCancelPress = () => {
    setModalVisible(false);
    setItems([]);
    setQuantity(1);
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <StatusBar barStyle="light-content" backgroundColor="#A2D68F" />
      )}
      <View style={styles.box}>
        <CameraView
          facing={CameraType.back}
          ref={camRef}
          style={styles.camera}
          mode="picture"
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "aztec",
              "codabar",
              "code128",
              "code39",
              "code93",
              "datamatrix",
              "ean13",
              "ean8",
              "itf14",
              "pdf417",
              "upc_a",
              "upc_e",
            ],
          }}
          onBarcodeScanned={(e) => handleBarcodeScanned(e.data)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.productTitle}>
                {item.data.productName +
                  " " +
                  item.data.productSize +
                  item.data.unit}
              </Text>
              <Text style={styles.productPrice}>
                {"Rs. " + item.data.price + " / item"}
              </Text>
              <Text style={styles.quantityText}>
                Change the quantity you wish to add.
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={decrementQuantity}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity
                  onPress={incrementQuantity}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancelPress}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onAddToCart(item)}
                  style={styles.addButton}
                >
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2D68F",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    height: "25%"
  },
  camera: {
    width: "100%",
    flex: 1,
    position: "relative"
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
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 20
  },
  quantityText: {
    fontSize: 14,
    marginBottom: 10
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  quantityValue: {
    marginHorizontal: 20,
    fontSize: 18
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    marginRight: 10,
    borderRadius: 5,
  },
  addButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 5,
  },
  cancelText: {
    fontSize: 16,
    color: "#000"
  },
  addText: {
    fontSize: 16,
    color: "#FFF"
  },
});
