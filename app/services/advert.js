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



