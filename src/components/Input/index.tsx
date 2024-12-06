import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
    error?: boolean;
}

export function Input({ error, multiline, ...rest }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = error ? 'red' : isFocused ? 'black' : '#eee';

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={[styles.container, { borderColor }]}>
            <TextInput
                {...rest}
                multiline={multiline}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                style={[styles.input, multiline && { height: 120 }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
    },
    input: {
        padding: 16,
    }
});