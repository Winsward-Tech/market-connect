const API_URL = "http://localhost:4800/api";

// Mock data for testing
const mockForums = [
  {
    id: "1",
    title: "How do I keep my yams fresh when it rains?",
    content:
      "My yams always go bad when the rain comes. I don't have money for expensive storage. What simple ways work for you?",
    category: "farming",
    author: "Kofi Mensah",
    authorRole: "Farmer",
    location: "Eastern Region",
    date: "2 days ago",
    replies: 12,
    likes: 24,
    hasAudio: true,
  },
  {
    id: "2",
    title: "How to get better prices from buyers?",
    content:
      "The buyers always give me small money for my vegetables. How do you other market women get good prices?",
    category: "market",
    author: "Ama Owusu",
    authorRole: "Market Seller",
    location: "Kumasi",
    date: "1 week ago",
    replies: 18,
    likes: 32,
    hasAudio: false,
  },
  {
    id: "3",
    title: "Should I use mobile money or cash?",
    content:
      "Some buyers want to pay with mobile money for my crops. Is this safe? What are the good and bad things?",
    category: "market",
    author: "Kwame Asante",
    authorRole: "Farmer",
    location: "Volta",
    date: "3 days ago",
    replies: 15,
    likes: 27,
    hasAudio: true,
  },
  {
    id: "4",
    title: "Best time to plant cassava?",
    content:
      "When is the best time to plant cassava in the northern region? Any tips for better yield?",
    category: "farming",
    author: "Fatima Ibrahim",
    authorRole: "Farmer",
    location: "Northern Region",
    date: "5 days ago",
    replies: 8,
    likes: 15,
    hasAudio: false,
  },
  {
    id: "5",
    title: "Community market day schedule",
    content:
      "Does anyone know the schedule for the community market days this month?",
    category: "general",
    author: "Sarah Johnson",
    authorRole: "Market Seller",
    location: "Accra",
    date: "1 day ago",
    replies: 5,
    likes: 10,
    hasAudio: false,
  },
];

// Flag to control whether to use mock data or real API
const USE_MOCK_DATA = true;

export const createForum = async (forumData, token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newForum = {
          id: Date.now().toString(),
          ...forumData,
          author: "Current User",
          authorRole: "Farmer",
          location: "Your Location",
          date: "Just now",
          replies: 0,
          likes: 0,
          hasAudio: false,
        };
        mockForums.unshift(newForum);
        resolve(newForum);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/forums`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumData),
    });

    if (!response.ok) {
      throw new Error("Failed to create forum post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating forum:", error);
    throw error;
  }
};

export const getForumById = async (id, token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const forum = mockForums.find((f) => f.id === id);
        if (forum) {
          resolve(forum);
        } else {
          reject(new Error("Forum not found"));
        }
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/forums/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch forum post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching forum:", error);
    throw error;
  }
};

export const getAllForums = async (token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockForums]);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/forums`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch forum posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching forums:", error);
    throw error;
  }
};

export const getForumsByCategory = async (category, token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredForums = mockForums.filter(
          (forum) => forum.category === category
        );
        resolve(filteredForums);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/forums/category/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch forum posts by category");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching forums by category:", error);
    throw error;
  }
};

export const addComment = async (forumId, commentData, token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          id: Date.now().toString(),
          ...commentData,
          author: "Current User",
          authorRole: "Farmer",
          date: "Just now",
          likes: 0,
        };
        resolve(newComment);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/comments/forum/${forumId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getComments = async (forumId, token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            content: "Try storing them in a dry, elevated place",
            author: "Kwame Mensah",
            authorRole: "Farmer",
            date: "1 day ago",
            likes: 5,
          },
          {
            id: "2",
            content: "I use banana leaves to wrap them",
            author: "Ama Kufuor",
            authorRole: "Farmer",
            date: "2 days ago",
            likes: 3,
          },
        ]);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/comments/forum/${forumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
