import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import ArrowHitGame from "./ArrowHitGame";

export const screenWidth = Dimensions.get("screen").width
export const screenHeight = Dimensions.get("screen").height

const GameIntroScreen = ({ navigation }) => {
  const [isGameVisible, setIsGameVisible] = useState(false)

  const handleDismiss = useCallback(() => {
    setIsGameVisible(false)
  }, [])

  return (
    <View style={styles.container}>
       {/* Title */}
      <Animated.Text style={styles.title} entering={FadeInDown.duration(800)}>
        🏹 Welcome to Arrow Hit!
      </Animated.Text>

      {/* Game Description */}
      <Animated.Text style={styles.description} entering={FadeInDown.duration(1000).delay(200)}>
        🎯 Shoot arrows and win exciting discounts!{"\n"}
        🏆 Score high to unlock bigger rewards.
      </Animated.Text>

      {/* How to Play */}
      <Animated.Text style={styles.rules} entering={FadeInDown.duration(1200).delay(400)}>
        🔹 Tap to shoot arrows at the rotating target.{"\n"}
        🔹 Avoid hitting other arrows.{"\n"}
        🔹 The higher your score, the bigger your reward!
      </Animated.Text>

      {/* Rewards */}
      <Animated.Text style={styles.rewards} entering={FadeInDown.duration(1400).delay(600)}>
        🎁 **Win Rewards!**{"\n"}
        🎯 Score **50+ points** → Get **5% OFF**{"\n"}
        🎯 Score **100+ points** → Unlock **10% discount**{"\n"}
        🎯 Score **200+ points** → Win a **special surprise!**
      </Animated.Text>

      <TouchableOpacity style={styles.button} onPress={() => setIsGameVisible(true)}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      <Modal visible={isGameVisible} onRequestClose={handleDismiss}>
        <ArrowHitGame />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  logo: { width: 200, height: 200, marginBottom: 20, resizeMode: "contain" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 18 },
  rules: { fontSize: 16, color: "green", textAlign: "center", marginBottom: 10 },
  rewards: { fontSize: 16, color: "black", textAlign: "center", fontWeight: "bold", marginBottom: 20 },
});

export default GameIntroScreen;