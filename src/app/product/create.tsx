import { z } from "zod";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ProductDTO } from "../../services/products/fetchProducts";
import { createProduct, CreateProductData } from "../../services/products/createProduct";

const productSchema = z.object({
    name: z.string().min(1, { message: 'Campo obrigatório' }),
    price: z.string().min(1, { message: 'Campo obrigatório' }),
    description: z.string().min(1, { message: 'Campo obrigatório' }),
});

type ProductSchema = z.infer<typeof productSchema>;

export default function CreateProductScreenRoute() {

    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: "",
            description: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: createProduct,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ['products'] })

            const optimisticProduct = { id: new Date().getTime(), ...variables }

            queryClient.setQueryData(['products'], (old: ProductDTO[]) => [...old, optimisticProduct])

            router.back();

            return { optimisticProduct }
        },
        onSuccess: (result, variables, context) => {
            queryClient.setQueryData(['products'], (old: ProductDTO[]) =>
                old.map((product) =>
                    product.id === context.optimisticProduct.id ? result : product,
                ),
            )
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(['products'], (old: ProductDTO[]) =>
                old.filter((product) => product.id !== context?.optimisticProduct.id),
            )
        },
        retry: 3,
    });

    const onSubmit = (data: ProductSchema) => {
        const product: CreateProductData = {
            ...data,
            title: data.name,
            image: "https://i.pravatar.cc",
            category: "electronic"
        }

        mutate(product);
    };

    return (
        <View style={styles.container}>
            <Form>
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Form.Field>
                            <Form.Label>Nome</Form.Label>
                            <Input
                                value={value}
                                onChangeText={onChange}
                                error={!!errors.name?.message}
                            />
                        </Form.Field>
                    )}
                />

                <Controller
                    name="price"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Form.Field>
                            <Form.Label>Preço</Form.Label>
                            <Input
                                value={value}
                                keyboardType="numeric"
                                onChangeText={onChange}
                                error={!!errors.price?.message}
                            />
                        </Form.Field>
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Form.Field>
                            <Form.Label>Descrição</Form.Label>
                            <Input
                                multiline
                                value={value}
                                onChangeText={onChange}
                                error={!!errors.description?.message}
                            />
                        </Form.Field>
                    )}
                />
            </Form>

            <Button text="Salvar" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
});