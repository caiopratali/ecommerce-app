import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    text: string;
}

export function Button({ text, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest} >
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#000',
    },
    text: {
        fontSize: 16,
        color: '#fff',
    }
});