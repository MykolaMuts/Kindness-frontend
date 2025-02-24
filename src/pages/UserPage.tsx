import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IEventData, IUserData} from "../App.constants.tsx";
import {formatDistanceToNow} from "date-fns";
import {fetchUserData} from "../services/user.service.tsx";
import ProfilePicture from "../components/ProfilePicture.tsx";


const EventCard: React.FC<{ event: IEventData }> = ({event}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-500">{event.city}</p>
      <p className="text-xs text-gray-400">
        {formatDistanceToNow(new Date(event.date), {addSuffix: true})}
      </p>
    </div>
  );
};

const UserPage: React.FC = () => {
  const {userId} = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchUserData(Number(userId));
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found.</p>;

  return (
    <div className="p-4">
      <ProfilePicture username={userData.username} size={100} />
      <h1 className="text-2xl font-bold">{userData.username}</h1>
      <p className="text-gray-700">{userData.description}</p>
      <p className="text-sm text-gray-500">City: {userData.city}</p>
      <p className="text-sm text-gray-500">
        Categories: {userData.serviceCategory.join(", ")}
      </p>
      <h2 className="text-xl font-bold mt-4">User Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {userData.eventList.map((event) => (
          <EventCard key={event.id} event={event}/>
        ))}
      </div>
    </div>
  );
};

export default UserPage;