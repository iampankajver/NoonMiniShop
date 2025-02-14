import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GameIntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Win Discounts by Playing the Game!</Text>
      <Text style={styles.description}>Score high to get discount codes.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Game")}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 18 }
});

export default GameIntroScreen;