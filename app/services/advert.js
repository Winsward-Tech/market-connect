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
        if (key === 'images' && Array.isArray(value)) {
          // Handle multiple images
          value.forEach((image, index) => {
            formData.append(`images`, image);
          });
        } else {
          formData.append(key, value);
        }
      });
    }

    // Debug: Log the complete FormData
    console.log("=== FormData Contents ===");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    console.log("=======================");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      // Add these options to ensure proper FormData handling
      transformRequest: [(data) => data],
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    };

    // Debug: Log the complete request configuration
    console.log("=== Request Configuration ===");
    console.log("URL:", `${API_URL}/api/products`);
    console.log("Headers:", config.headers);
    console.log("=======================");

    const response = await axios.post(`${API_URL}/api/products`, formData, config);
    return response;
  } catch (error) {
    console.error("=== Error Details ===");
    console.error("Error message:", error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);
      
      if (error.response.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received. Request details:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
    }
    console.error("=======================");
    
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