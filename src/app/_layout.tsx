import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="product/[id]"
                    options={{
                        title: 'Detalhes do Produto',
                        headerBackButtonDisplayMode: 'minimal',
                    }}
                />
            </Stack>
            <StatusBar style="dark" />
        </QueryClientProvider>
    )
}