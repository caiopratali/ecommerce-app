import { api } from "../api";
import { ProductDTO } from "./fetchProducts";

export type CreateProductData = Omit<ProductDTO, "id">;

export const createProduct = async (data: CreateProductData) => {
    const response = await api.post("/products", data);

    return response.data;
}