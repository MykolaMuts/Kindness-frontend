import {useState, useEffect, FC} from "react";

import defaultProfilePic from '@/assets/Default-avatar.png'
import {useAuth} from "../../hooks/useAuth.tsx";
import {downloadProfilePicture} from "../../services/picture.service.tsx";

interface ProfilePictureProps {
  profilePicUrl?: string; // User's profile picture URL
}

const ProfilePicture: FC<ProfilePictureProps> = ( ) => {

  const {user} = useAuth();

  const [profilePic, setProfilePic] = useState<string>(defaultProfilePic);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const storedPic = localStorage.getItem("profilePicUrl");

        if (storedPic) {
          setProfilePic(storedPic);
        } else if (user?.profilePicUrl) {
          const response = await downloadProfilePicture(user.profilePicUrl)
          if (response) {
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setProfilePic(objectUrl);
            localStorage.setItem("profilePicUrl", objectUrl);
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
  }, [user?.profilePicUrl]);

  return (
    <img
      src={profilePic}
      alt="Profile"
      className="w-32 h-32 rounded-full border mb-2 object-cover"
    />
  );
};

export default ProfilePicture;
