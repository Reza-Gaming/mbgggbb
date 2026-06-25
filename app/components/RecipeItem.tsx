import { Link } from "expo-router"
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../constants/Colors"

interface Props {
    id: number
    name: string
    cookTimeMinutes: number
    image: string
}

const { width } = Dimensions.get('window')
const cardWidth = (width - 48) / 2

const RecipeItem = ({ id, name, cookTimeMinutes, image }: Props) => {
    return (
        <Link href={`/recipe/${id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.name} numberOfLines={2}>{name}</Text>
                    <Text style={styles.time}>{cookTimeMinutes} Minutes</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default RecipeItem

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        height: 140,
    },
    container: {
        width: cardWidth,
        backgroundColor: Colors.gradientEnd,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 4,
        overflow: "hidden",
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 6,
        lineHeight: 20,
    },
    time: {
        color: Colors.primary,
        fontSize: 12,
    },
})
