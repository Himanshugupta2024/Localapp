import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Job } from "../types";

const API_URL = "https://testapi.getlokalapp.com/common/jobs";

export default function Index() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  // Load bookmarks from AsyncStorage
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem("bookmarkedJobs");
      if (savedBookmarks) setBookmarkedJobs(JSON.parse(savedBookmarks));
    } catch (err) {
      console.error("Error loading bookmarks:", err);
    }
  };

  // Fetch jobs from API
  const fetchJobs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      const newJobs = response.data.results;

      if (newJobs && newJobs.length > 0) {
        setJobs((prevJobs) => [...prevJobs, ...newJobs]);
        setPage(page + 1);
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
    try {
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
    } catch (err) {
      console.error("Error saving bookmark:", err);
    }
  };

  // Render footer for loading state
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
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
            onPress={() => {
              navigation.navigate("JobDetails", {
                id: item.id.toString(),
                title: item.title,
                place: place,
                salary: salary,
                phone: item.whatsapp_no,
                whatsapp_link: item.contact_preference?.whatsapp_link ?? "",
                company: item.company_name,
              });
            }}
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
    [bookmarkedJobs, navigation]
  );

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchJobs}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : jobs.length === 0 && !loading ? (
        <View style={styles.centerContent}>
          <Text>No jobs found</Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJobCard}
          keyExtractor={(item, index) => `job_${item.id}_${index}`}
          onEndReached={fetchJobs}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

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
  loadingFooter: {
    padding: 10,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
