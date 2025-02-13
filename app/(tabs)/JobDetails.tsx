import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

type JobDetailsProps = {
  route: {
    params: {
      id: string;
      title: string;
      place: string;
      salary: string;
      phone: string;
      whatsapp_link: string;
      company: string;
    };
  };
};

const JobDetails = ({ route }: JobDetailsProps) => {
  const { id, title, place, salary, phone, whatsapp_link, company } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>📍 {place}</Text>
      <Text style={styles.detail}>💰 {salary}</Text>
      <Text style={styles.detail}>📞 {phone}</Text>
      <Text style={styles.detail}>🏢 {company}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (whatsapp_link) {
            Linking.openURL(whatsapp_link);
          }
        }}
      >
        <Text style={styles.buttonText}>Contact via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
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

export default JobDetails;
