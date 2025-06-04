import axios from "axios";

const API_URL = "https://market-connect-api-1.onrender.com";

// Test function to verify API endpoints
export const testApiEndpoints = async () => {
  try {
    console.log("Testing API endpoints...");

    // Test 1: Get all products
    console.log("\n1. Testing GET /api/products");
    const allProducts = await getAllProducts();
    console.log(
      "Success! Products found:",
      allProducts.data.data.products.length
    );

    // Test 2: Get single product (using first product's ID)
    if (allProducts.data.data.products.length > 0) {
      const firstProductId = allProducts.data.data.products[0].id;
      console.log("\n2. Testing GET /api/products/:id");
      const singleProduct = await getProductById(firstProductId);
      console.log(
        "Success! Product found:",
        singleProduct.data.data.product.title
      );

      // Test 3: Get products by user (using the product's seller ID)
      const sellerId = singleProduct.data.data.product.seller;
      console.log("\n3. Testing GET /api/products/user/:userId");
      const userProducts = await getProductsByUser(sellerId);
      console.log(
        "Success! User products found:",
        userProducts.data.data.products.length
      );
    }

    console.log("\nAll tests completed successfully!");
    return true;
  } catch (error) {
    console.error("\nAPI Test Failed:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
    return false;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Create new product - Updated to handle FormData
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Ensure we're working with FormData
    const formData = productData instanceof FormData ? productData : new FormData();
    
    if (!(productData instanceof FormData)) {
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    // Log the data being sent
    console.log("Sending FormData to API:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      // Add these options to ensure proper FormData handling
      transformRequest: [(data) => data],
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    };

    const response = await axios.post(`${API_URL}/api/products`, formData, config);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      
      // Log validation errors if present
      if (error.response.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

// Get products by user ID
export const getProductsByUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/products/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error fetching products for user ${userId}:`, error);
    throw error;
  }
};