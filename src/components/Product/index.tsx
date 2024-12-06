import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { ProductDTO } from "../../services/products/fetchProducts";

export function Product(props: ProductDTO) {
    return (
        <Link href={`/product/${props.id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: props.image }}
                />

                <Text
                    numberOfLines={1}
                    style={styles.title}
                >
                    {props.title}
                </Text>

                <Text>{props.price}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
    },
    title: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
    },
    image: {
        height: 200,
        resizeMode: 'contain',
    }
});