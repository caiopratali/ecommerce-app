import { Text } from "react-native";

interface FormLabelProps {
    children: string;
}

export function FormLabel({ children }: FormLabelProps) {
    return <Text>{children}</Text>
}

