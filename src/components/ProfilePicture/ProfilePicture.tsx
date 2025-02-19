import {useState, useEffect, FC} from "react";
import defaultProfilePic from '@/assets/images.png'
import {downloadProfilePicture} from "../../services/picture.service.tsx";

interface ProfilePictureProps {
  profilePicUrl?: string;
}

const ProfilePicture: FC<ProfilePictureProps> = ({ profilePicUrl }) => {

  const [profilePic, setProfilePic] = useState<string>(defaultProfilePic);

  useEffect(() => {

    //todo fix later
    const fetchProfilePic = async () => {
      try {
        // Check if we have a cached image
        const storedPic = localStorage.getItem("profilePic");
        if (storedPic) {
          setProfilePic(storedPic);
          return;
        }

        // If the user has uploaded a picture, download it
        if (!storedPic && profilePicUrl) {
          const imageUrl = await downloadProfilePicture(profilePicUrl);
          if (imageUrl) {
            setProfilePic(imageUrl);
            localStorage.setItem("profilePic", imageUrl); // Cache for later use
          } else {
            setProfilePic(defaultProfilePic);
          }
        }
      } catch (error) {
        console.error("Error fetching profile picture", error);
        setProfilePic(defaultProfilePic);
      }
    };

    fetchProfilePic();
  }, [profilePicUrl]);

  return (
    <img
      src={profilePic}
      alt="Profile"
      className="w-32 h-32 rounded-full border mb-2 object-cover"
    />
  );
};

export default ProfilePicture;
