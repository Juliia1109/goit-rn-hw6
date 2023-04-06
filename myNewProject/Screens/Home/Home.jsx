import React from "react";
import PostsScreen from "../PostsScreen/PostsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";

const NestedStack = createNativeStackNavigator();

export default function Home() {
  return (
    <NestedStack.Navigator screenOptions={{ headerShown: false }}>
      <NestedStack.Screen name="Posts" component={PostsScreen} />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
}
