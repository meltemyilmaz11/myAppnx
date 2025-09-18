import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function GroupInfoScreen() {
    const { friends } = useLocalSearchParams();
    const selectedFriends = friends
        ? JSON.parse(decodeURIComponent(friends as string))
        : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Se�ilen Arkada�lar</Text>
            <ScrollView style={styles.list}>
                {selectedFriends.map((friend: any) => (
                    <View key={friend.id} style={styles.friendItem}>
                        <Image source={{ uri: friend.avatar }} style={styles.avatar} />
                        <Text style={styles.name}>{friend.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#934790",
    },
    list: {
        flex: 1,
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
    },
});
