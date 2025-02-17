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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <NavigationContainer >
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: "#282c34", paddingBottom: 5 }, // Customize tab bar
            tabBarActiveTintColor: "#ffcc00",
            tabBarInactiveTintColor: "#888",
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home-outline";
              } else if (route.name === "Game") {
                iconName = "gamepad-variant-outline";
              } else if (route.name === "Cart") {
                iconName = "cart-outline";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Game" component={GameScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;