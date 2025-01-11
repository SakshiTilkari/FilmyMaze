import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieList, setMovieList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  // Handle search on button press or when input changes
  const handleSearch = async () => {
    if (searchTerm.trim() === "") return; // Prevent empty searches

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchTerm}`
      );
      console.log("response", response);

      const movies = response.data.map((item: any) => ({
        id: item.show.id,
        name: item.show.name,
        summary: item.show.summary,
        image: item.show.image,
        originalImage: item.show.image?.original,
        language: item.show.language,
        rating: item.show.rating?.average,
        status: item.show.status,
        country: item.show.network?.country?.name,
        genres: item.show.genres,
      }));

      setMovieList(movies);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {movieList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.movieContainer}
              onPress={() => navigation.navigate("Details", { movie: item })}
            >
              <Image
                source={{ uri: item.image?.medium }}
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{item.name}</Text>
              <Text style={styles.movieSummary}>
                {item.summary.replace(/<[^>]+>/g, "")}{" "}
                {/* Removing HTML tags */}
              </Text>
              <Text style={styles.movieDetails}>
                Rating: {item.rating} | Genre: {item.genres.join(", ")} |
                Language: {item.language} | Status: {item.status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
    paddingTop: "10%",
    paddingHorizontal: "5%",
  },
  scrollContainer: {
    paddingBottom: 20, 
  },
  searchBar: {
    height: '6%',
    fontSize: 23, 
    fontWeight: 'bold',
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '4%',
    paddingTop: '1%',
    paddingBottom: '1%',
    marginBottom: '3%',
    backgroundColor: "#fffdfd",
  },
  movieContainer: {
    marginBottom: '5%',
    padding: 15,
    backgroundColor: "#217ea9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff0f1",
    marginTop: 10,
  },
  movieSummary: {
    fontSize: 14,
    color: "#fff0f1",
    marginTop: 5,
  },
  movieDetails: {
    fontSize: 12,
    color: "#fff0f1",
    marginTop: 10,
  },
});

export default Search;
