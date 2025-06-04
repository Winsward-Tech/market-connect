const API_URL = "https://market-connect-api-1.onrender.com";

// Mock data for testing
const mockDashboardData = {
  totalUsers: 150,
  totalPosts: 45,
  totalComments: 230,
  reportedContent: 5,
  recentActivity: [
    {
      id: 1,
      type: "new_user",
      message: "New user registered",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      type: "reported_post",
      message: "Post reported for inappropriate content",
      timestamp: "1 hour ago",
    },
  ],
};

const mockReportedContent = [
  {
    id: "1",
    type: "post",
    content: "Inappropriate post content",
    reportedBy: "User123",
    reportedAt: "2024-03-20T10:00:00Z",
    status: "pending",
  },
  {
    id: "2",
    type: "comment",
    content: "Offensive comment",
    reportedBy: "User456",
    reportedAt: "2024-03-20T09:30:00Z",
    status: "pending",
  },
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-03-01T10:00:00Z",
    lastActive: "2024-03-20T15:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-02-15T09:00:00Z",
    lastActive: "2024-03-20T16:45:00Z",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "user",
    status: "suspended",
    joinedAt: "2024-03-10T14:20:00Z",
    lastActive: "2024-03-19T11:15:00Z",
  },
];

// Flag to control whether to use mock data or real API
const USE_MOCK_DATA = true;

export const getDashboardOverview = async (token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardData);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getReportedContent = async (token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReportedContent);
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_URL}/admin/reported-content`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reported content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reported content:", error);
    throw error;
  }
};

export const handleReportedContent = async (reportId, action, token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Content ${action} successfully` });
      }, 500);
    });
  }

  try {
    const response = await fetch(
      `${API_URL}/admin/reported-content/${reportId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to ${action} reported content`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error handling reported content:`, error);
    throw error;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data.data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
