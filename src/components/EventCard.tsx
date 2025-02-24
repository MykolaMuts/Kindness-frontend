import React, {useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import useMediaQuery from "../hooks/useMediaQuery";
import {fetchEvents} from "../services/event.service.tsx";
import {IEventData} from "../App.constants.tsx";
import {Link} from "react-router-dom";
import ProfilePicture from "./ProfilePicture.tsx";

const EventCard: React.FC<{ event: IEventData }> = ({event}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-500">{event.city}</p>
      <p className="text-xs text-gray-400">
        {formatDistanceToNow(new Date(event.date), {addSuffix: true})}
      </p>
      <p className="text-sm text-blue-500">
        Author:{" "}
        <Link to={`/user/${event.authorId}`} className="hover:underline">
          {event.authorUsername}
        </Link>
        <ProfilePicture username={event.authorUsername} size={25} />
      </p>
    </div>
  );
};

const EventList: React.FC = () => {
  const [events, setEvents] = useState<IEventData[]>([]);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const visibleEventsCount = isLargeScreen ? 6 : isMediumScreen ? 4 : 2;

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.slice(0, visibleEventsCount).map((event) => (
        <EventCard key={event.id} event={event}/>
      ))}
    </div>
  );
};

export default EventList;