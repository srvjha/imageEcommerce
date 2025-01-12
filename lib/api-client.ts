import { OrderInterface } from "@/models/Order.model";
import { ProductInterface } from "@/models/Product.model";
import { Types } from "mongoose";
import { ImageVariant } from "@/models/Product.model";
export type ProductFormData = Omit<ProductInterface, "_id">;

export interface CreateOrderData {
  productId: Types.ObjectId | string;
  variant: ImageVariant;
}

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE";
    body? : any;
    headers? : Record<string,string>;
};

class ApiClient {
    private async fetch<T>(
        endpoint :string,
        options:FetchOptions = {}
    ): Promise<T>{
        const {method = "GET" , body, headers={}} =  options 
        const defaultHeaders = {
            "Content-Type" : "application/json",
            ...headers
        }

        const response = await fetch(endpoint, {
            method,
            body: JSON.stringify(body),
            headers: defaultHeaders
        });

        if(!response.ok){
            throw new Error(response.statusText)
        }

        return response.json()
    }

    async getProducts(){
        return this.fetch<ProductInterface[]>("/api/products");
    }

    async getProduct(id:string){
        return this.fetch<ProductInterface>(`/api/products/${id}`)
    }

    async createProduct(productData: ProductFormData) {
        return this.fetch<ProductInterface>("/products", {
          method: "POST",
          body: productData,
        });
      }
    
      async getUserOrders() {
        return this.fetch<OrderInterface[]>("/orders/user");
      }
    
      async createOrder(orderData: CreateOrderData) {
        const sanitizedOrderData = {
          ...orderData,
          productId: orderData.productId.toString(),
        };
    
        return this.fetch<{ orderId: string; amount: number }>("/orders", {
          method: "POST",
          body: sanitizedOrderData,
        });
      }
}

export const apiClient = new ApiClient();