import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface MovieInfo {
  id: number;
  name: string;
  summary: string;
  image: { medium: string; original: string };
}

const Home = () => {
  const [movieList, setMovieList] = useState<MovieInfo[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=all`
        );
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
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.movieTitleContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.title}>FilmyMaze</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Ionicons name="search-outline" size={25} color={"#fff0f1"} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {movieList.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => navigation.navigate("Details", { movie: movie })}
            style={styles.movieContainer}
          >
            <Image
              source={{ uri: movie.image?.medium }}
              style={styles.movieImage}
            />
            <Text style={styles.movieTitle}>{movie.name}</Text>
            <Text style={styles.movieSummary}>
              {movie.summary.replace(/<[^>]+>/g, "")}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
    padding: 10,
  },
  movieTitleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6%",
    flexDirection: "row",
  },
  logo: {
    width: "20%",
    height: "130%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff0f1",
  },
  movieContainer: {
    marginBottom: 20,
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
});

export default Home;
