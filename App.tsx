import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Index from "./app/(tabs)/index";
import Bookmarks from "./app/(tabs)/Bookmarks";
import JobDetails from "./app/(tabs)/JobDetails";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './app/types'; // Import RootStackParamList

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>(); // Use RootStackParamList

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Jobs"
        component={Index}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
