import { Button, Card, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../helpers/axiosInstance";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const profileRedux = useSelector((state) => state.profileReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await serverInstance.put(
      "/profile",
      {
        fullName,
        profilePicture,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  useEffect(() => {
    setFullName(profileRedux.fullName);
    setProfilePicture(profileRedux.profilePicture);
  }, [profileRedux]);
  return (
    <div className="flex max-h-screen h-screen justify-center items-center">
      <div></div>
      <div style={{ width: "50%" }} className="max-w-lg">
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <img
              className="w-20 h-20 rounded-full self-center"
              src={profilePicture}
              alt="profile picture"
            />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fullName" value="Full Name" />
              </div>
              <TextInput
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="profilePicture" value="Profile Picture" />
              </div>
              <TextInput
                value={profilePicture}
                onChange={(event) => setProfilePicture(event.target.value)}
              />
              <q>please input your new profile picture url</q>
            </div>
            <div className="flex w-full justify-center gap-2">
              <div>
                <Button type="submit">Edit Profile</Button>
              </div>
              <div>
                <Link to="/">
                  <Button className="bg-red-600 hover:bg-red-900">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
