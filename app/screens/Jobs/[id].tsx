import { useLocalSearchParams } from "expo-router";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function JobDetails() {
  const {
    title,
    company,
    place,
    salary,
    phone,
    whatsapp_link,
    job_type,
    experience,
    job_category,
    openings_count,
    job_role,
    other_details,
  } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {/* Job Title */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.company}>🏢 {company}</Text>

      {/* Job Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}><FontAwesome name="map-marker" size={16} color="#FF5733" /> {place?place:"Not available"}</Text>
        <Text style={styles.detail}><FontAwesome name="money" size={16} color="#28A745" /> {salary?salary:"Not available"}</Text>
        <Text style={styles.detail}><MaterialIcons name="work" size={16} color="#007BFF" /> {job_type?job_type:"Not available"}</Text>
        <Text style={styles.detail}><MaterialIcons name="person" size={16} color="#6C757D" /> {experience?experience:"Not available"}</Text>
        <Text style={styles.detail}><MaterialIcons name="category" size={16} color="#E67E22" /> {job_category?job_category:"Not available"}</Text>
        <Text style={styles.detail}><FontAwesome name="users" size={16} color="#17A2B8" /> {openings_count?openings_count:"Not available"} Openings</Text>
        <Text style={styles.detail}><FontAwesome name="briefcase" size={16} color="#C71585" /> {job_role?job_role:"Not available"}</Text>
      </View>

      {/* Job Description */}
      <View style={styles.descriptionBox}>
        <Text style={styles.sectionTitle}>📄 Job Description</Text>
        <Text style={styles.description}>{other_details?other_details:"Not available"}</Text>
      </View>

      {/* Contact Section */}
      <View style={styles.contactContainer}>
        {/* <Text style={styles.sectionTitle}>📞 Contact HR</Text> */}
        

        <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${phone}`)}>
          <FontAwesome name="phone" size={20} color="white" />
          <Text style={styles.callButtonText}> Call HR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343A40",
    marginBottom: 6,
  },
  company: {
    fontSize: 16,
    color: "#6C757D",
    marginBottom: 12,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    color: "#495057",
    marginVertical: 4,
  },
  descriptionBox: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343A40",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#495057",
  },
  contactContainer: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    alignItems: "center",
  },
  whatsappButton: {
    flexDirection: "row",
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  whatsappButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  callButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  callButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
