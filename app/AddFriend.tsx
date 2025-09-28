import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 👈 ekledik

// Dummy veri
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
        setFriends(dummyFriends);
      } catch (error) {
        console.log("Arkadaş verisi alınamadı, dummy veriler kullanılıyor", error);
        setFriends(dummyFriends);
      }
    };
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter((friend) =>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfcff" }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Arkadaş Ekle</Text>
        </View>

        {/* Arama Çubuğu */}
        <TextInput
          style={styles.searchInput}
          placeholder="Arkadaş ara..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Arkadaş Listesi */}
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

        {/* Davet Linki */}
        <View style={styles.inviteContainer}>
          <Text style={styles.inviteText}>Kişisel davet linkin:</Text>
          <View style={styles.inviteCard}>
            <Text selectable style={styles.inviteLink}>
              {inviteLink}
            </Text>
            <View style={styles.shareButtons}>
              <TouchableOpacity style={styles.shareButton} onPress={handleCopy}>
                <Text style={styles.shareText}>Kopyala</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.shareButton, { backgroundColor: "#6b3d8c" }]}
                onPress={handleShare}
              >
                <Text style={styles.shareText}>Paylaş</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY_COLOR = "#603290ff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fdfcff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  backText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginRight: 40,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  friendList: {
    flex: 1,
  },
  friendItem: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  inviteContainer: {
    paddingVertical: 20,
  },
  inviteText: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inviteCard: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  inviteLink: {
    color: PRIMARY_COLOR,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  shareButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    flex: 1,
    padding: 12,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  shareText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
