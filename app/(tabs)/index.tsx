import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Define the type for a job
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

const API_URL = "https://testapi.getlokalapp.com/common/jobs";

export default function Index() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Load bookmarks from AsyncStorage
  useEffect(() => {
    const loadBookmarks = async () => {
      const savedBookmarks = await AsyncStorage.getItem("bookmarkedJobs");
      if (savedBookmarks) setBookmarkedJobs(JSON.parse(savedBookmarks));
    };
    loadBookmarks();
  }, []);

  // Fetch jobs from API
  const fetchJobs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}?page=1`);
      const newJobs = response.data.results;

      if (newJobs && newJobs.length > 0) {
        setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Toggle Bookmark
  const toggleBookmark = async (job: Job) => {
    let updatedBookmarks;
    if (bookmarkedJobs.some((bookmarkedJob) => bookmarkedJob.id === job.id)) {
      updatedBookmarks = bookmarkedJobs.filter(
        (bookmarkedJob) => bookmarkedJob.id !== job.id
      );
    } else {
      updatedBookmarks = [...bookmarkedJobs, job];
    }
    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem(
      "bookmarkedJobs",
      JSON.stringify(updatedBookmarks)
    );
  };

  // Render a single job card
  const renderJobCard = useCallback(
    ({ item }: { item: Job }) => {
      const isBookmarked = bookmarkedJobs.some((job) => job.id === item.id);
      const place = item.primary_details?.Place ?? "Location not available";
      const salary = item.primary_details?.Salary ?? "Salary not specified";

      return (
        <View style={styles.card}>
          {/* Bookmark Button on the top-right */}
          <View style={{ zIndex: 100 }}>
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={() => toggleBookmark(item)}
            >
              <FontAwesome
                name={isBookmarked ? "bookmark" : "bookmark-o"}
                size={30}
                color={isBookmarked ? "gold" : "gray"}
              />
            </TouchableOpacity>
          </View>

          {/* Job Card */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/screens/Jobs/[id]`, // Use dynamic segment
                params: {
                  id: item.id.toString(), // Ensure id is a string
                  title: item.title,
                  place,
                  salary,
                  phone: item.whatsapp_no,
                  whatsapp_link: item.contact_preference?.whatsapp_link ?? "",
                  company: item.company_name,
                },
              })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>📍 {place}</Text>
            <Text style={styles.salary}>💰 {salary}</Text>
            <Text style={styles.phone}>📞 {item.whatsapp_no}</Text>
          </TouchableOpacity>

          {/* WhatsApp Button */}
          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={() => {
              const whatsappLink = item.contact_preference?.whatsapp_link;
              if (whatsappLink) {
                Linking.openURL(whatsappLink);
              }
            }}
          >
            <Text style={styles.whatsappButtonText}>WhatsApp HR</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [bookmarkedJobs]
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item, index) => `job_${item.id}_${index}`}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  listContainer: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    position: "relative",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  location: { fontSize: 14, color: "#666", marginBottom: 4 },
  salary: { fontSize: 14, color: "#666", marginBottom: 4 },
  phone: { fontSize: 14, color: "#666", marginBottom: 8 },
  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  whatsappButtonText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", fontSize: 16, textAlign: "center", marginTop: 20 },
  bookmarkButton: { position: "absolute", top: 10, right: 10 },
});
