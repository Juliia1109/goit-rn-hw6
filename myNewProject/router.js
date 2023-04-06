import React from "react";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import Home from "./Screens/Home/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./Screens/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "./redux/auth/authOperations";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          lineHeight: 22,
          fontFamily: "Roboto-Medium",
        },
      }}
    >
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 24, marginRight: 10 }}
              onPress={signOut}
              activeOpacity={0.8}
            >
              <MaterialIcons name="logout" size={24} color="#bdbdbd" />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <SimpleLineIcons name="grid" size={24} color="#bdbdbd" />
          ),
          tabBarShowLabel: false,
        }}
        name="Home"
        component={Home}
      />
      <Tabs.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 24, marginLeft: 10 }}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <AntDesign name="arrowleft" size={24} color="#bdbdbd" />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
              }}
            >
              <Fontisto name="plus-a" size={24} color="#fff" />
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Create a publication"
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color="#bdbdbd" />,
          tabBarShowLabel: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};
