import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {IUserData} from "../App.constants.tsx";
import {fetchUserData} from "../services/user.service.tsx";

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchUserData(Number(userId));
        setUser(response);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUser();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <p className="text-gray-700">{user.description}</p>
      <p className="text-sm text-gray-500">City: {user.city}</p>
      <p className="text-sm text-gray-500">
        Categories: {user.serviceCategory.join(", ")}
      </p>
    </div>
  );
};

export default UserPage;