import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const Details = ({ route }: any) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.name}</Text>
      <ScrollView>
      <Image source={{ uri: movie.originalImage }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.label}>Language: </Text>
          {movie.language || "N/A"}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Genres: </Text>
          {movie.genres && movie.genres.length > 0
            ? movie.genres.join(", ")
            : "N/A"}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Status: </Text>
          {movie.status || "N/A"}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Rating: </Text>
          {movie.rating ? `${movie.rating}/10` : "Not Rated"}
        </Text>
      </View>
      <View style={styles.detailsContainer1}>
        <Text style={styles.subtitle}>Summary</Text>
        <Text style={styles.summary}>
          {movie.summary
            ? movie.summary.replace(/<[^>]+>/g, "")
            : "No summary available"}
        </Text>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
    padding: "5%",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#217ea9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer1: {
    backgroundColor: "#217ea9",
    padding: 16,
    borderRadius: 8,
    marginBottom: '10%',
  },
  detail: {
    fontSize: 16,
    color: "#fff0f1",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
    marginBottom: 16,
  },
});

export default Details;
