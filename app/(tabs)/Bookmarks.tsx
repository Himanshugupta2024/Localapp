import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

type Job = {
  id: number;
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Job_Type: string;
    Experience: string;
    Fees_Charged: string;
    Qualification: string;
  };
  company_name: string;
  whatsapp_no: string;
  contact_preference: {
    whatsapp_link: string;
  };
};

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadBookmarks = async () => {
        const savedBookmarks = await AsyncStorage.getItem("bookmarkedJobs");
        if (savedBookmarks) setBookmarkedJobs(JSON.parse(savedBookmarks));
      };
      loadBookmarks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarked Jobs</Text>

      {bookmarkedJobs.length === 0 ? (
        <Text style={styles.emptyMessage}>No bookmarks yet</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => `bookmark_${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.company}>{item.company_name}</Text>
              <Text style={styles.detail}>📍 {item.primary_details?.Place}</Text>
              <Text style={styles.detail}>💰 {item.primary_details?.Salary}</Text>
              <Text style={styles.detail}>🛠 {item.primary_details?.Job_Type}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const whatsappLink = item.contact_preference?.whatsapp_link;
                  if (whatsappLink) {
                    Linking.openURL(whatsappLink);
                  }
                }}
              >
                <Text style={styles.buttonText}>Contact via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Bookmarks;
