import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupListScreen from "./screens/GroupListScreen";
import CreateGroupScreen from "./screens/CreateGroupScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="GroupList">
                <Stack.Screen
                    name="GroupList"
                    component={GroupListScreen}
                    options={{ title: "Groups" }}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ title: "Chat" }}
                />
                <Stack.Screen name="SelectFriends" component={SelectFriendsScreen} />
                <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


