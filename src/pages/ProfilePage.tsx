import React, {useState, ChangeEvent} from "react";
import {updateUserServiceData,} from "../services/user.service.tsx";
import ShowRequestStatus from "../components/ShowRequestStatus/ShowRequestStatus.tsx";
import {useAuth} from "../hooks/useAuth.tsx";
import {categoriesList, citiesList, IUserServiceData} from "../App.constants.tsx";
import {uploadProfilePicture} from "../services/picture.service.tsx";

export default function ProfilePage() {


  const { user } = useAuth(); // Get logged-in user

  const [formData, setFormData] = useState<IUserServiceData>({
    description: user?.serviceData?.description || "",
    serviceCategory: user?.serviceData?.serviceCategory || [],
    city: user?.serviceData?.city || "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadProfilePicture(selectedFile);
      } catch (error) {
        console.error(error);
        alert("Upload failed!");
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      setError("User not found!");
      return;
    }

    try {
      await updateUserServiceData(formData);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      if (err.response) {
        setSuccess(false);
        if (err.response.status === 401) {
          setError(err.response.data || 'Invalid user data');
        } else if (err.response.status === 500) {
          setError('An internal server error occurred. Please try again later.');
        } else {
          setError(err.response.data || 'An error occurred. Please try again.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  const addCategory = () => {
    if (newCategory && !formData.serviceCategory.includes(newCategory)) {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: [...prev.serviceCategory, newCategory],
      }));
      setNewCategory(""); // Reset dropdown
    }
  };

  // Remove category
  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceCategory: prev.serviceCategory.filter((c) => c !== category),
    }));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile Page</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.profilePicUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border mb-2"
        />
        <input type="file" onChange={handleFileChange} className="mb-2"/>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload
        </button>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Service Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Write about your services..."
        />
      </div>

      {/* Categories */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 font-medium">Service Categories:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categoriesList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md"
          onClick={addCategory}
        >
          Add Category
        </button>

        {/* Show selected categories */}
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.serviceCategory.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer"
              onClick={() => removeCategory(category)}
            >
                            {category} ❌
                        </span>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">City of Service:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        >
          <option value="">Select City</option>
          {citiesList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Save Button */}
      <div className="mb-4">
        <button
          onClick={handleUpdateProfile}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>

        {error && <ShowRequestStatus type="error" message={error}/>}

        {success && <ShowRequestStatus type="success" message="Profile updated successfully!"/>}
      </div>
    </div>
  );
}
