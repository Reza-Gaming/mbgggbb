import { Link } from "expo-router";
import { Colors } from "../constants/Colors"
import { Dimensions, Text, View, Image, FlatList } from "react-native";
import Header from "../../components/Header";
import GradientBackground from "../components/GradientBackground";
import GradientButton from "../components/GradientButton";
import { indexStyles as styles } from "../constants/Colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStateForPath } from "@react-navigation/native";
import RecipeItem from "../components/RecipeItem";

export interface recipeData{
  id: number,
  name: string,
  cookTimeMinutes: number,
  image: string,
}

const HomeScreen = () => {
  const random = Math.floor(Math.random() * 30) + 1;

  const [randomRecipe, setRandomRecipe] = useState<recipeData[]>([])
  const [recipes, setRecipes] = useState<Record<string, any>>({})
  const getRecipe = async () => {
    const recipe = await axios.get(`https://dummyjson.com/recipes/${random}`)
    setRecipes(recipe.data)
  }

  const getRandomRecipe = async() => {
    const {data} = await axios.get(`https://dummyjson.com/recipes?limit=10&skip=${random}`)
    setRandomRecipe(data.recipes)
  }

  useEffect(() => {
    getRecipe();
    getRandomRecipe();
  }, [])


  return (
    <GradientBackground style={styles.container}>
      <Header/>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image 
            source={{uri: recipes.image}}
            style={styles.imageFull} 
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>{recipes.name}</Text>
            <Text style={styles.minutes }>{recipes.cookTimeMinutes} Minutes</Text>
          </View>
        </View>
        <Text style={styles.randomText}>Random Recipe</Text>
        <FlatList
          data={randomRecipe}
          renderItem={({ item }) => (
            <RecipeItem id={item.id} name={item.name} cookTimeMinutes={item.cookTimeMinutes} image={item.image} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={{gap: 8}}
          style={{marginTop: 5}}
        />
      </View>
    </GradientBackground>
  );
};

export default HomeScreen;