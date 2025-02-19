import React, { useState } from 'react';
import {useAuth} from "../hooks/useAuth.tsx";
import {addEvent} from "../services/event.service.tsx";
import ShowRequestStatus from "../components/ShowRequestStatus.tsx";

interface EventFormData {
  title: string;
  description: string;
  city: string;
  date: string;
}

const AddEventPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    city: '',
    date: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to create an event.');
      return;
    }

    const eventData = {
      authorId: user.id,
      ...formData,
    };

    setLoading(true);
    setError(null);

    try {
      await addEvent(eventData);
      setFormData({
        title: '',
        description: '',
        city: '',
        date: '',
      });
      alert('Event created successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>

      {/* Display error message */}
      {error && <ShowRequestStatus type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/*<div className="mb-4">*/}
        {/*  <label htmlFor="date" className="block text-sm font-medium text-gray-700">*/}
        {/*    Date*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    type="date"*/}
        {/*    id="date"*/}
        {/*    name="date"*/}
        {/*    value={formData.date}*/}
        {/*    onChange={handleChange}*/}
        {/*    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"*/}
        {/*    required*/}
        {/*  />*/}
        {/*</div>*/}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Adding Event...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;