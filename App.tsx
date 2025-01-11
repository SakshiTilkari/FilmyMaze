import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Search from "./screens/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false,}}/>
//       <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false,}}/>
//     </Stack.Navigator>
//   );
// };

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff0f1', 
        tabBarInactiveTintColor: '#217ea9', 
        tabBarStyle: {
          backgroundColor: '#003366', // Set the background color of the tab bar
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerShown: false,}}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false,}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
