import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function GroupListScreen() {
    const router = useRouter();
    const [groups, setGroups] = useState<string[]>(["Aile", "Arkada�lar", "�� Grubu", "Oyun"]);
    const [search, setSearch] = useState("");

    // Arama filtresi
    const filteredGroups = groups.filter((group) =>
        group.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"))
    );

    return (
        <View style={styles.container}>
            {/* Ba�l�k ve + butonu */}
            <View style={styles.header}>
                <Text style={styles.title}>Sahip Oldu�unuz Gruplar</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push("/SelectFriendsScreen")}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Arama �ubu�u */}
            <TextInput
                style={styles.searchInput}
                placeholder="Grup Ara..."
                value={search}
                onChangeText={setSearch}
            />

            {/* Grup yoksa */}
            {filteredGroups.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Yaln�zs�n�z, arkada� edinin ve bir gruba sahip olun!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredGroups}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.groupItem}>
                            {/* Grup Avatar */}
                            <View style={styles.groupAvatar}>
                                <Text style={styles.avatarText}>{item[0]}</Text>
                            </View>
                            {/* Grup ismi */}
                            <Text style={styles.groupText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#934790",
    },
    addButton: {
        backgroundColor: "#934790",
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 40,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 18,
        color: "#000",
        textAlign: "center",
    },
    groupItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    groupAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    avatarText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    groupText: {
        fontSize: 18,
        color: "#000",
    },
});
