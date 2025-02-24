import {useState, useEffect, FC} from "react";
import defaultProfilePic from "@/assets/images.png";
import {downloadProfilePicture} from "../services/picture.service.tsx";

interface ProfilePictureProps {
  username: string;
  size: number;
}

const ProfilePicture: FC<ProfilePictureProps> = ({ username, size = 32 }) => {
  const [profilePic, setProfilePic] = useState<string>(defaultProfilePic);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!username) return;

      try {
        const cachedPic = localStorage.getItem(`profilePic-${username}`);
        if (cachedPic !== null) {
          setProfilePic(cachedPic);
          return;
        }

        const blobUrl = await downloadProfilePicture(username);
        if (blobUrl !== null) {
          setProfilePic(blobUrl);
          localStorage.setItem(`profilePic-${username}`, blobUrl);

          window.dispatchEvent(new Event("profilePicUpdated"));
        }
      } catch (error) {
        console.error("Error fetching profile picture", error);
      }
    };

    fetchProfilePic();

    // Listen for changes in localStorage
    const handleProfilePicUpdate = () => {
      const updatedPic = localStorage.getItem(`profilePic-${username}`);
      if (updatedPic) {
        console.log("Profile picture updated from event.");
        setProfilePic(updatedPic);
      }
    };

    window.addEventListener("profilePicUpdated", handleProfilePicUpdate);

    return () => {
      window.removeEventListener("profilePicUpdated", handleProfilePicUpdate);
    };
  }, [username]); // Only re-run when username changes

  return (
    <img
      src={profilePic}
      alt="Profile"
      className={`w-${size} h-${size} rounded-full border mb-2 object-cover`}
      style={{width: `${size}px`, height: `${size}px`}}
    />
  );
};

export default ProfilePicture;
