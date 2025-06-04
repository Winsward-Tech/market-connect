// Mock data for testing
const mockNotifications = [
  {
    id: "1",
    title: "New Comment",
    message: "Someone commented on your forum post",
    type: "comment",
    read: false,
    date: "2 minutes ago",
  },
  {
    id: "2",
    title: "Forum Update",
    message: "Your forum post got 5 new likes",
    type: "like",
    read: false,
    date: "1 hour ago",
  },
  {
    id: "3",
    title: "Market Alert",
    message: "New market prices available in your area",
    type: "market",
    read: true,
    date: "3 hours ago",
  },
];

// Flag to control whether to use mock data or real API
const USE_MOCK_DATA = true;

export const getNotifications = async (token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockNotifications]);
      }, 500);
    });
  }

  try {
    const response = await fetch("/api/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async (token) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockNotifications.forEach((notification) => {
          notification.read = true;
        });
        resolve({ success: true });
      }, 500);
    });
  }

  try {
    const response = await fetch("/api/notifications/read-all", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to mark notifications as read");
    }

    return await response.json();
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    throw error;
  }
};
