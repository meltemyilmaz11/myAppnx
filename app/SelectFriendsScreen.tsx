import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Friend {
    id: string;
    name: string;
    avatar: string;
}

const allFriends: Friend[] = [
    { id: "1", name: "Ali", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: "2", name: "Ayşe", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: "3", name: "Mert", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: "4", name: "Elif", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: "5", name: "Fatma", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: "6", name: "Ahmet", avatar: "https://i.pravatar.cc/150?img=6" },
    { id: "7", name: "Mehmet", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: "8", name: "Zeynep", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: "9", name: "Can", avatar: "https://i.pravatar.cc/150?img=9" },
    { id: "10", name: "Cem", avatar: "https://i.pravatar.cc/150?img=10" },
];

export default function SelectFriendsScreen() {
    const router = useRouter();
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
    const [search, setSearch] = useState("");

    const filteredFriends = allFriends.filter((friend) =>
        friend.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleFriend = (friend: Friend) => {
        if (selectedFriends.find((f) => f.id === friend.id)) {
            setSelectedFriends((prev) => prev.filter((f) => f.id !== friend.id));
        } else {
            setSelectedFriends((prev) => [...prev, friend]);
        }
    };

    const goNext = () => {
        if (selectedFriends.length === 0) {
            Alert.alert("Uyarı", "Lütfen en az bir kişi seçin");
            return;
        }

        router.push({
            pathname: "/GroupInfoScreen",
            params: { friends: JSON.stringify(selectedFriends) },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                {/* Header (top area) */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.headerButton}>Geri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goNext}>
                        <Text style={styles.headerButton}>İleri</Text>
                    </TouchableOpacity>
                </View>

                {/* Arkadaşlar başlığı */}
                <Text style={styles.friendsTitle}>Arkadaşlar</Text>

                {/* Seçilen arkadaşlar, varsa göster */}
                {selectedFriends.length > 0 && (
                    <ScrollView horizontal style={styles.selectedContainer}>
                        {selectedFriends.map((friend) => (
                            <View key={friend.id} style={styles.selectedFriend}>
                                <Image source={{ uri: friend.avatar }} style={styles.avatarSmall} />
                                <Text style={styles.selectedName}>{friend.name}</Text>
                                <TouchableOpacity onPress={() => toggleFriend(friend)}>
                                    <Text style={styles.removeFriend}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}

                {/* Arama çubuğu */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Arkadaş ara..."
                    value={search}
                    onChangeText={setSearch}
                />

                {/* Arkadaş Ekle Butonu */}
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => router.push("/AddFriend")}
                >
                    <View style={styles.addFriendContent}>
                        <View style={styles.plusCircle}>
                            <Text style={styles.plusText}>+</Text>
                        </View>
                        <Text style={styles.addFriendText}>Arkadaş Ekle</Text>
                    </View>
                </TouchableOpacity>

                {/* Arkadaş listesi */}
                <ScrollView style={styles.friendList}>
                    {filteredFriends.map((friend) => (
                        <TouchableOpacity
                            key={friend.id}
                            style={styles.friendItem}
                            onPress={() => toggleFriend(friend)}
                        >
                            <Image source={{ uri: friend.avatar }} style={styles.avatar} />
                            <Text style={styles.friendName}>{friend.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    header: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10
    },
    headerButton: { fontSize: 16, fontWeight: "bold", color: "#934790" },
    selectedContainer: { flexDirection: "row", marginBottom: 20, maxHeight: 50 },
    selectedFriend: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    friendsTitle: { fontSize: 30, fontWeight: "bold", color: "#934790", marginBottom: 20 },
    avatarSmall: { width: 30, height: 30, borderRadius: 15, marginRight: 5 },
    selectedName: { fontSize: 18, color: "#000" },
    searchInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 10 },
    removeFriend: { marginLeft: 5, fontSize: 20, color: "#934790", fontWeight: "bold" },
    addFriendButton: { marginBottom: 10 },
    addFriendContent: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#934790",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    plusCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    plusText: { color: "#934790", fontWeight: "bold", fontSize: 20, lineHeight: 20 },
    addFriendText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    friendList: { flex: 1 },
    friendItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    friendName: { fontSize: 16, color: "#000" },
});
