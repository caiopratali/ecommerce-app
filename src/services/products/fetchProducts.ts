import { api } from "../api"

export interface ProductDTO {
   id: number;
   title: string;
   price: string;
   category: string;
   description: string;
   image: string;
}

export const fetchProducts = async (): Promise<ProductDTO[]> => {
   const response = await api.get("/products");

   return response.data;
}