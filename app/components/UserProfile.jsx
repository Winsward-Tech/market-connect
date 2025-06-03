"use client";

import { useState, useEffect } from "react";
import { getUserById } from "../services/auth";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(userId);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No user found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Name</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3 className="font-medium">Phone Number</h3>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <h3 className="font-medium">Role</h3>
            <p>{user.role}</p>
          </div>
          {user.location && (
            <div>
              <h3 className="font-medium">Location</h3>
              <p>{user.location}</p>
            </div>
          )}
          {user.preferredLanguage && (
            <div>
              <h3 className="font-medium">Preferred Language</h3>
              <p>{user.preferredLanguage}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
