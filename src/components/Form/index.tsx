import { StyleSheet, View } from "react-native";

import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";

interface FormProps {
    children: React.ReactNode;
}

function Form({ children }: FormProps) {
    return <View style={styles.container}>{children}</View>;
}

Form.Field = FormField;
Form.Label = FormLabel;

export { Form };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
    },
});