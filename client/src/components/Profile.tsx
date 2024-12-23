import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Profile: FC = () => {
  const loading = false;

  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfileImage(result);
        setProfileData((prevData) => ({ ...prevData, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //update profile API implementation
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative w-20 h-20 md:w-28 md:h-28">
            <AvatarImage src={selectedProfileImage} />
            <AvatarFallback>CN</AvatarFallback>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
              onClick={() => imageRef.current?.click()}
            >
              <Plus className="text-white h-8 w-8" />
            </div>
          </Avatar>
          <Input
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="ml-2 text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="ml-2 text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={handleChange}
              className="ml-2 text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={handleChange}
              className="ml-2 text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        {loading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className=" bg-orange hover:bg-hoverOrange">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
