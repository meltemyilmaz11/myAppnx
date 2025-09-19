import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function GroupInfoScreen() {
    const router = useRouter();
    const { friends } = useLocalSearchParams();
    const selectedFriends = friends
        ? JSON.parse(decodeURIComponent(friends as string))
        : [];

    const [groupImage, setGroupImage] = useState<string | null>(null);
    const [groupName, setGroupName] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(24);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setGroupImage(result.assets[0].uri);
        }
    };

    const createGroup = () => {
        console.log("Grup oluşturuldu!", { groupName, selectedFriends, groupImage, startTime, endTime });
        Alert.alert("Başarılı", "Grubunuz Oluşturuldu!");
        router.push("/"); // İlk ekrana dön
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {groupImage ? (
                        <Image source={{ uri: groupImage }} style={styles.groupImage} />
                    ) : (
                        <Text>Fotoğraf</Text>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={styles.groupNameInput}
                    placeholder="Grup Adı"
                    value={groupName}
                    onChangeText={setGroupName}
                />
            </View>

            <Text style={styles.title}>Seçilen Arkadaşlar</Text>
            <ScrollView style={styles.list}>
                {selectedFriends.map((friend: any) => (
                    <View key={friend.id} style={styles.friendItem}>
                        <Image source={{ uri: friend.avatar }} style={styles.avatar} />
                        <Text style={styles.name}>{friend.name}</Text>
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.timeTitle}>24 Saatlik Zaman Aralığı Seç:</Text>

            <View style={styles.sliderWrapper}>
                <View style={styles.sliderWithMarks}>
                    {Array.from({ length: 25 }).map((_, i) => {
                        const showLabel = i === startTime || i === endTime;
                        return (
                            <View key={i} style={[styles.markWrapper, { left: (i / 24) * 300 }]}>
                                <View style={styles.mark} />
                                {showLabel && <Text style={styles.markLabel}>{i}</Text>}
                            </View>
                        );
                    })}

                    <MultiSlider
                        values={[startTime, endTime]}
                        min={0}
                        max={24}
                        step={1}
                        onValuesChange={(vals) => {
                            setStartTime(vals[0]);
                            setEndTime(vals[1]);
                        }}
                        sliderLength={300}
                        allowOverlap={false}
                        snapped
                        selectedStyle={{ backgroundColor: "#934790" }}
                        unselectedStyle={{ backgroundColor: "#ccc" }}
                        markerStyle={{
                            backgroundColor: "#934790",
                            height: 24,
                            width: 24,
                            borderRadius: 12
                        }}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={createGroup}>
                <Text style={styles.createButtonText}>Grup Oluştur</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    imagePicker: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    groupImage: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    groupNameInput: {
        flex: 1,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        fontSize: 18,
        paddingVertical: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#934790",
    },
    list: {
        flex: 1,
        marginBottom: 20,
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
    timeTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    sliderWrapper: {
        marginBottom: 20,
        alignItems: "center",
    },
    sliderWithMarks: {
        width: 300,
        position: "relative",
        justifyContent: "center",
    },
    markWrapper: {
        position: "absolute",
        top: 20,
        alignItems: "center",
    },
    mark: {
        width: 2,
        height: 10,
        backgroundColor: "#ccc",
    },
    markLabel: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 7,
    },
    createButton: {
        backgroundColor: "#934790",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    createButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
