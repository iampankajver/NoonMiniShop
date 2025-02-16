import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing, runOnJS, useDerivedValue, cancelAnimation } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const GAME_HEIGHT = width * 2
const GAME_WIDTH = width

const Arrow = forwardRef((props, ref) => {
  const rotation = useSharedValue(0);
  const arrowY = useSharedValue(GAME_HEIGHT / 2)

  useImperativeHandle(ref, () => ({
    throwArrow: () => {
      arrowY.value = withTiming(100, { duration: 200 }, () => {
        rotation.value = withRepeat(
          withTiming(360, { duration: 2000, easing: Easing.linear }),
          -1, // Infinite loop
          false // No reversing
        );
      })
    }
  }))

  const animatedBlockStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowY.value <= 100 ? rotation.value : 0}deg` }]
  }))

  const animatedArrowImg = useAnimatedStyle(() => ({
    top: arrowY.value
  }))

  return <Animated.View style={[animatedBlockStyles, styles.arrowContainer]}>
    <Animated.Image source={require('./../assets/arrow.png')} style={[animatedArrowImg, styles.arrowImg]} />
  </Animated.View>
})

const Block = memo(() => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1, // Infinite loop
      false // No reversing
    );
  }, []);

  const animatedBlockStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return <Animated.View style={animatedBlockStyles}>
    <Image source={require('./../assets/block.png')} style={styles.block} />
  </Animated.View>
})

const ArrowHitGame = () => {
  const [numOfArrow, setNumArrow] = useState(50)
  const arrowRefs = useRef({})
  const currentArrow = useRef(0)
  const score = useRef(0)
  const scoreRef = useRef()

  // Function to Shoot Arrow
  const shootArrow = () => {
    if (currentArrow.current < numOfArrow) {
      score.current++
      scoreRef.current.setNativeProps({ text: String(score.current) });
      arrowRefs.current[currentArrow.current]?.throwArrow()
      currentArrow.current += 1
    }
  };



  return (
    <TouchableWithoutFeedback style={styles.container} onPress={shootArrow}>
      <View style={styles.container}>
        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score</Text>
          <TextInput ref={scoreRef} style={styles.input} placeholder="" />
        </View>
        <View style={styles.background}>
          <Block />
          {new Array(numOfArrow).fill(0).map((_, index) => <Arrow key={index} ref={(ref) => arrowRefs.current[index] = ref}/>)}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222", alignItems: "center", justifyContent: "center" },
  score: { color: "#fff", fontSize: 24, fontWeight: "bold"},
  scoreContainer: { flex: 0.3, position: "absolute", top: 50 },
  background: { width: GAME_WIDTH, height: GAME_HEIGHT, justifyContent: 'center', alignItems: 'center', top: - GAME_HEIGHT / 8, position: 'absolute'  },
  scoreText: {fontSize: 28, color: 'white'},
  input: { width: 70, height: 70, paddingHorizontal: 10, marginBottom: 10, color: 'white', fontSize: 36, textAlign: 'center' },
  block: { width: 200, height: 200 },
  arrowContainer: { width: GAME_WIDTH, height: GAME_HEIGHT, position: 'absolute', 
    // backgroundColor: '#0000FF12', 
  justifyContent: 'center', alignItems: 'center' },
  arrowImg: { width: 50, height: 50, transform: [{ rotateZ: '130deg' }] },
});

export default ArrowHitGame;