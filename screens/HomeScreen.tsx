import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import axios from "axios";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([
    "https://via.placeholder.com/400x200",
    "https://via.placeholder.com/400x200",
    "https://via.placeholder.com/400x200",
  ]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {/* <Carousel
        data={banners}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.banner} />
        )}
        sliderWidth={width}
        itemWidth={width}
        autoplay
        loop
      /> */}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate("ProductDetails", { item })}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text numberOfLines={2} style={styles.productDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  banner: { width: width, height: 200, resizeMode: "cover" },
  productCard: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  productImage: { width: 100, height: 100, resizeMode: "contain" },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 14, color: "green" },
  productDescription: { fontSize: 12, color: "gray" }
});

export default HomeScreen;