import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductScreenRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text>Product Screen {id}</Text>
        </View>
    )
}