import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import axios from "axios";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const BANNER_DATA = [
  {
    "title": "Banner 1",
    "imageMobile": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    "imageDesktop": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg"
  },
  {
    "title": "Banner 2",
    "imageMobile": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    "imageDesktop": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg"
  },
  {
    "title": "Banner 3",
    "imageMobile": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    "imageDesktop": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg"
  },
  {
    "title": "Banner 4",
    "imageMobile": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    "imageDesktop": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg"
  },
  {
    "title": "Banner 5",
    "imageMobile": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    "imageDesktop": "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg"
  }
]

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState(BANNER_DATA);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      

    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}  // Set to 2 for a grid layout
      columnWrapperStyle={styles.row} // Adds space between rows
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate("ProductDetails", { item })}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text numberOfLines={2} style={styles.productDescription}>{item.description}</Text>
        </TouchableOpacity>
      )}
      ListHeaderComponent={<Carousel
        data={banners}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageMobile }} style={styles.banner} />
        )}
        sliderWidth={width}
        itemWidth={width}
        autoplay
        loop
      />}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  banner: { width: width, height: 200, resizeMode: "cover" }, 
  productImage: { width: 100, height: 100, resizeMode: "contain" },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 14, color: "green" },
  productDescription: { fontSize: 12, color: "gray" },
  row: {
    justifyContent: "space-between", // Ensures even spacing between columns
    paddingHorizontal: 10,
  },
  productCard: {
    flex: 1, // Takes equal space
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});


export default HomeScreen;