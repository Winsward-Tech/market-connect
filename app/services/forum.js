const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  try {
    const response = await fetch(`${API_URL}/api/forums`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create forum post");
    }

    return data;
  } catch (error) {
    console.error("Error creating forum:", error);
    throw error;
  }
};

export const getForumById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/forums/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch forum post");
    }

    return data.data.forum;
  } catch (error) {
    console.error("Error fetching forum:", error);
    throw error;
  }
};

export const getAllForums = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/forums`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch forum posts");
    }

    return data;
  } catch (error) {
    console.error("Error fetching forums:", error);
    throw error;
  }
};

export const getForumsByCategory = async (category, token) => {
  try {
    const response = await fetch(`${API_URL}/api/forums/category/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch forums by category");
    }

    return data;
  } catch (error) {
    console.error("Error fetching forums by category:", error);
    throw error;
  }
};

export const addComment = async (forumId, commentData, token) => {
  try {
    console.log('Adding comment with data:', {
      forumId,
      commentData,
      token: token ? 'present' : 'missing'
    });

    const response = await fetch(`${API_URL}/api/comments/forum/${forumId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: commentData.content
      }),
    });

    console.log('Comment API Response:', {
      status: response.status,
      statusText: response.statusText
    });

    const data = await response.json();
    console.log('Comment API Response Data:', data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to add comment");
    }

    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getComments = async (forumId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/comments/forum/${forumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch comments");
    }

    return data.data.comments || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
