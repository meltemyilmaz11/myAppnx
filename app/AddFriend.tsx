import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Dummy veri (örnek olarak 4 kişi)
const dummyFriends = [
  { id: "1", username: "Ebu" },
  { id: "2", username: "Meltem" },
  { id: "3", username: "Eylül" },
  { id: "4", username: "Yeto" },
];

export default function AddFriend() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState(dummyFriends);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Backend hazır olduğunda fetch yapılacak
        setFriends(dummyFriends);
      } catch (error) {
        console.log("Arkadaş verisi alınamadı, dummy veriler kullanılıyor", error);
        setFriends(dummyFriends);
      }
    };
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const inviteLink = "https://myapp.com/invite?ref=12345";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Bana katıl! ${inviteLink}`,
      });
    } catch (error) {
      Alert.alert("Paylaşım hatası", "Link paylaşılamadı.");
    }
  };

  const handleCopy = () => {
    Clipboard.setString(inviteLink);
    Alert.alert("Kopyalandı!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Arkadaş Ekle</Text>
      </View>

      {/* Arama çubuğu */}
      <TextInput
        style={styles.searchInput}
        placeholder="Arkadaş ara..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Arkadaş listesi */}
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item.username}</Text>
          </View>
        )}
        style={styles.friendList}
      />

      {/* Davet linki */}
      <View style={styles.inviteContainer}>
        <Text style={styles.inviteText}>Kişisel davet linkin:</Text>
        <View style={styles.inviteCard}>
          <Text selectable style={styles.inviteLink}>{inviteLink}</Text>
          <View style={styles.shareButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleCopy}>
              <Text style={styles.shareText}>Kopyala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareText}>Paylaş</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backButton: { padding: 8 },
  backText: { color: "#007bff", fontSize: 16 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "bold", marginRight: 32 },
  searchInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 10, marginBottom: 16, backgroundColor: "#fff" },
  friendList: { flex: 1 },
  friendItem: { padding: 12, backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 2 },
  friendName: { fontSize: 16 },
  inviteContainer: { paddingVertical: 20 },
  inviteText: { fontWeight: "bold", marginBottom: 8 },
  inviteCard: { padding: 12, backgroundColor: "#fff", borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 2 },
  inviteLink: { color: "#007bff", marginBottom: 10 },
  shareButtons: { flexDirection: "row", justifyContent: "space-between" },
  shareButton: { flex: 1, padding: 10, backgroundColor: "#007bff", borderRadius: 8, marginRight: 8, alignItems: "center" },
  shareText: { color: "#fff", fontWeight: "bold" }
});
