import {useState, useEffect} from "react";
import {updateProfile, uploadProfilePicture} from "../services/user/user.service.tsx";
import ShowRequestStatus from "../components/ShowRequestStatus/ShowRequestStatus.tsx";


const categoriesList = [
  "PLUMBER",
  "ELECTRICIAN",
  "LANGUAGE_TUTOR",
  "MECHANIC",
  "CARPENTER",
  "HUSBAND_FOR_AN_HOUR",
  "HOUSEHOLD_APPLIANCES_INSTALLER",
  "OTHER",
];

const citiesList = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"]; // Example cities

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "testUser", // Replace with actual username
    profilePictureUrl: "/default-avatar.png",
    description: "",
    categories: [] as string[],
    location: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    // Fetch user data from backend when page loads
    fetch(`/users/${user.username}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user", err));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const url = await uploadProfilePicture(user.username, selectedFile);
        setUser((prev) => ({...prev, profilePictureUrl: url}));
      } catch (error) {
        console.error(error);
        alert("Upload failed!");
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user.username, {
        description: user.description,
        category: newCategory ? newCategory : undefined,
        location: user.location,
      });
      setError(null);
      setSuccess(true);
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

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile Page</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.profilePictureUrl}
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
          className="w-full p-2 border rounded-md"
          value={user.description}
          onChange={(e) => setUser((prev) => ({...prev, description: e.target.value}))}
        />
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Service Categories:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categoriesList.map((category) => (
            <option key={category} value={category}>
              {category.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <button
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md"
          onClick={() => {
            if (newCategory && !user.categories.includes(newCategory)) {
              setUser((prev) => ({
                ...prev,
                categories: [...prev.categories, newCategory],
              }));
            }
          }}
        >
          Add Category
        </button>

        <div className="mt-2 flex flex-wrap gap-2">
          {user.categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer"
              onClick={() =>
                setUser((prev) => ({
                  ...prev,
                  categories: prev.categories.filter((c) => c !== category),
                }))
              }
            >
                            {category.replace(/_/g, " ")} ❌
                        </span>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">City of Service:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={user.location}
          onChange={(e) => setUser((prev) => ({...prev, location: e.target.value}))}
        >
          <option value="">Select City</option>
          {citiesList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        {/* Save Button */}
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
