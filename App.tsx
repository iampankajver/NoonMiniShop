/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import GameScreen from './screens/GameScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './screens/ProductDetail';
import { CartProvider } from './context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

// Home Stack with Native Stack Navigator
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "Home" }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Product Details" }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Game" component={GameScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;