// app/actions/product-actions.ts
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token;
}

// Helper function for API calls
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = (await getAuthToken()) || "";

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  return response.json();
}

// Create Product Action
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProduct(data: any) {
  const result = await apiRequest("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidateTag("products");
  return result;
}

// Edit Product Action
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editProduct(id: string | number, data: any) {
  const result = await apiRequest(`/products/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  revalidateTag("products");
  return result;
}

// Delete Product Action
export async function deleteProduct(id: string | number) {
  return await apiRequest(`/products/${id}/`, {
    method: "DELETE",
  });

  revalidateTag("products");
}
