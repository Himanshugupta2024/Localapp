import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Job } from "../types";

export default function Bookmarks() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem("bookmarkedJobs");
      if (savedBookmarks) {
        setBookmarkedJobs(JSON.parse(savedBookmarks));
      }
    } catch (err) {
      console.error("Error loading bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (bookmarkedJobs.length === 0) {
    return (
      <View style={styles.centerContent}>
        <Text>No bookmarked jobs</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedJobs}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("JobDetails", {
                id: item.id.toString(),
                title: item.title,
                place: item.primary_details?.Place ?? "Location not available",
                salary: item.primary_details?.Salary ?? "Salary not specified",
                phone: item.whatsapp_no,
                whatsapp_link: item.contact_preference?.whatsapp_link ?? "",
                company: item.company_name,
              });
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.detail}>
              📍 {item.primary_details?.Place ?? "Location not available"}
            </Text>
            <Text style={styles.detail}>
              💰 {item.primary_details?.Salary ?? "Salary not specified"}
            </Text>
            <Text style={styles.detail}>📞 {item.whatsapp_no}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `bookmark_${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
