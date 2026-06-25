import Header from "../../components/Header"
import axios from "axios"
import { useEffect, useState } from "react"
import { View, FlatList } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import TagItem from "../components/TagItem"
import RecipeItem from "../components/RecipeItem"
import { COLOR } from "../constants/Colors"

const RecipeScreen = () => {
    const [recipes, setRecipes] = useState<any[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    const getRecipes = async () => {
        const { data } = await axios.get('https://dummyjson.com/recipes?limit=20')
        setRecipes(data.recipes)
    }

    const getTags = async () => {
        const { data } = await axios.get('https://dummyjson.com/recipes/tags')
        setTags(data)
    }

    useEffect(() => {
        getRecipes()
        getTags()
    }, [])

    const filteredRecipes = selectedTag
        ? recipes.filter((r) => r.tags?.includes(selectedTag))
        : recipes

    return (
        <LinearGradient colors={[COLOR.gradientStart, COLOR.gradientEnd]} style={{ flex: 1 }}>
            <View>
                <Header />
                {/* List Tags */}
                <FlatList
                    data={tags}
                    renderItem={({ item }) => (
                        <TagItem
                            name={item}
                            isSelected={selectedTag === item}
                            onPress={() => setSelectedTag(selectedTag === item ? null : item)}
                        />
                    )}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingHorizontal: 10, paddingBottom: 12 }}
                />
            </View>

            {/* List Recipe */}
            <View style={{ flex: 1, margin: 10 }}>
                <FlatList
                    data={filteredRecipes}
                    renderItem={({ item }) => (
                        <RecipeItem
                            id={item.id}
                            name={item.name}
                            cookTimeMinutes={item.cookTimeMinutes}
                            image={item.image}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between", gap: 16 }}
                    contentContainerStyle={{ gap: 16 }}
                />
            </View>
        </LinearGradient>
    )
}

export default RecipeScreen
