import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Import RootStackParamList

type JobDetailsRouteProp = RouteProp<RootStackParamList, 'JobDetails'>;

type JobDetailsProps = {
  navigation: any;
};

const JobDetails = ({ navigation }: JobDetailsProps) => {
  const route = useRoute<JobDetailsRouteProp>();
  const { id, title, place, salary, phone, whatsapp_link, company } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

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
