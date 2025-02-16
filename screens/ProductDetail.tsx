import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";

const ProductDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  const isSelected = cart?.filter(el => el.id == item.id).length > 0

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={[styles.button, isSelected && styles.redButton ]} onPress={() => isSelected ? removeFromCart(item.id) : addToCart(item) }>
        <Text style={styles.buttonText}>{isSelected ? 'Remove from cart' : 'Add to Cart'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: 300, height: 300, resizeMode: "contain" },
  title: { fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 18, color: "green" },
  description: { fontSize: 14, marginVertical: 10 },
  button: { backgroundColor: "blue", padding: 15, marginTop: 20, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  redButton: { backgroundColor: "red", padding: 15, marginTop: 20, borderRadius: 5 },
});

export default ProductDetailsScreen;