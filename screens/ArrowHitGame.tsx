import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Alert } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing, runOnJS, useDerivedValue, cancelAnimation } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const GAME_HEIGHT = width * 2
const GAME_WIDTH = width

const Arrow = forwardRef(({rotation: blockRotation, existingArrows}, ref) => {
  const rotation = useSharedValue(0);
  const arrowY = useSharedValue(GAME_HEIGHT / 2)

  useImperativeHandle(ref, () => ({
    throwArrow: () => {
      arrowY.value = withTiming(100, { duration: 200 }, () => {
        console.log(existingArrows.current)
        existingArrows.current = [...existingArrows.current, blockRotation.value]
        rotation.value = withRepeat(
          withTiming(360, { duration: 2000, easing: Easing.linear }),
          -1, // Infinite loop
          false // No reversing
        );
      })
    },
    resetArrow: () => {
      arrowY.value = GAME_HEIGHT / 2
      rotation.value = 0
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

const Block = memo(({rotation}) => {
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
const numOfArrow = 10
const ArrowHitGame = () => {
  const rotation = useSharedValue(0);
  const arrowRefs = useRef({})
  const currentArrow = useRef(0)
  const score = useRef(0)
  const scoreRef = useRef()
  const existingArrows = useRef([])
  const arrowLeftRef = useRef()

  useEffect(() => {
    arrowLeftRef.current.setNativeProps({ text: String(numOfArrow) });
  }, [])

  // Function to Shoot Arrow
  const shootArrow = () => {
    if (currentArrow.current < numOfArrow) {
      score.current++
      scoreRef.current.setNativeProps({ text: String(score.current) });
      arrowRefs.current[currentArrow.current]?.throwArrow()
      currentArrow.current += 1
      arrowLeftRef.current.setNativeProps({ text: String(numOfArrow - score.current) });
    } else {
      Alert.alert("Your Score: " + score.current)
      resetGame()
    }
  };

  const resetGame = () => {
    for (let i = 0; i < numOfArrow; i++) {
      arrowRefs.current[i]?.resetArrow()
    }
    scoreRef.current.setNativeProps({ text: String(0) });
    arrowLeftRef.current.setNativeProps({ text: String(numOfArrow) });
    currentArrow.current = 0
    score.current = 0
  }

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={shootArrow}>
      <View style={styles.container}>
        {/* Score */}
        <View style={styles.arrowLeftContainer}>
          <Animated.Image source={require('./../assets/arrow.png')} style={styles.arrowLeftImg} />
          <TextInput ref={arrowLeftRef} style={styles.arrowLeftInput} placeholder="" />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score</Text>
          <TextInput ref={scoreRef} style={styles.input} placeholder="" />
        </View>
        <View style={styles.background}>
          {new Array(numOfArrow).fill(0).map((_, index) => <Arrow key={index} ref={(ref) => arrowRefs.current[index] = ref} rotation={rotation} existingArrows={existingArrows}/>)}
          <Block rotation={rotation}/>
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
  arrowLeftInput: { width: 70, height: 70, paddingHorizontal: 10, marginBottom: 10, color: 'white', fontSize: 36, textAlign: 'center' , left: -30},
  arrowLeftImg: { width: 50, height: 50, transform: [{ rotateZ: '180deg' }] },
  arrowLeftContainer: {
    position: 'absolute',
    left: 20,
    bottom: 50,
    flexDirection: 'row',
  },
  block: { width: 200, height: 200 },
  arrowContainer: { width: GAME_WIDTH, height: GAME_HEIGHT, position: 'absolute', 
    // backgroundColor: '#0000FF12', 
  justifyContent: 'center', alignItems: 'center' },
  arrowImg: { width: 50, height: 50, transform: [{ rotateZ: '130deg' }] },
});

export default ArrowHitGame;