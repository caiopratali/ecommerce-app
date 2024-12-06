import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProductScreenRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View style={styles.container}>
            <Text>Product {id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
});