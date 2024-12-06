import { StyleSheet, View } from "react-native";

interface FormFieldProps {
    children: React.ReactNode;
}

export function FormField({ children }: FormFieldProps) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
});