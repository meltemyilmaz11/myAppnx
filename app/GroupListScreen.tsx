import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGroup } from "../context/GroupContext";

export default function GroupListScreen() {
    const router = useRouter();
    const { groups } = useGroup(); // context'ten grupları alıyoruz
    const [search, setSearch] = useState("");

    const filteredGroups = groups.filter((group) =>
        group.name.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"))
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfcff" }}>
            <View style={styles.container}>
                {/* Başlık ve + butonu */}
                <View style={styles.header}>
                    <Text style={styles.title}>Sahip Olduğunuz Gruplar</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push("/SelectFriendsScreen")}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Arama Çubuğu */}
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
                            Yalnızsınız, arkadaş edinin ve bir gruba sahip olun!
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredGroups}
                        keyExtractor={(item) => item.name}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.groupItem}>
                                {/* Grup Avatar */}
                                <View style={styles.groupAvatar}>
                                    {item.image ? (
                                        <Image source={{ uri: item.image }} style={styles.avatarImage} />
                                    ) : (
                                        <Text style={styles.avatarText}>{item.name[0]}</Text>
                                    )}
                                </View>
                                {/* Grup ismi */}
                                <Text style={styles.groupText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#603290ff",
    },
    addButton: {
        backgroundColor: "#603290ff",
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
        paddingHorizontal: 20,
    },
    groupItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
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
        overflow: "hidden",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
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
