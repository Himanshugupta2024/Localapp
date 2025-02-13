import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Index from "./app/(tabs)/index";
import Bookmarks from "./app/(tabs)/Bookmarks";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
