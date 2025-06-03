import { apiClient } from "./config";

export const apiAddAdvert = async (payload) =>
  apiClient.post("/adverts", payload);

export const apiGetAllAdverts = async () => apiClient.get("/adverts");

export const apiGetVendorAdverts = async (vendorId) =>
  apiClient.get(`/adverts?vendorId=${vendorId}`);

export const apiUpdateAdvert = async (id, payload) =>
  apiClient.patch(`/adverts/${id}`, payload);

export const apiDeleteVendorAdvertById = async (id) =>
  apiClient.delete(`/adverts/${id}`);

export const apiGetSingleAdvert = async (id) => apiClient.get(`/adverts/${id}`);

export const apiGetDeletedAdverts = async () =>
  apiClient.get("/adverts-deleted");

export const apiRestoreAdvert = async (id) =>
  apiClient.put(`/adverts-restore/${id}`);

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post("/api/products", productData);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.put(
      `/api/products/${productId}`,
      productData
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/api/products/${productId}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
