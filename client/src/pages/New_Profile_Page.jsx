import { Button, Card, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../helpers/axiosInstance";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [cauldronName, setCauldronName] = useState("");
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value
  );
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
    await serverInstance.put(
      `/cauldrons/${myCauldronsRedux[0]?.id}`,
      {
        name: cauldronName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    navigate("/user/my-cauldron");
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyCauldron());
  }, []);

  useEffect(() => {
    setFullName(profileRedux.fullName);
    setProfilePicture(profileRedux.profilePicture);
    setCauldronName(myCauldronsRedux[0]?.name);
  }, [profileRedux]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="max-w-lg w-full">
        <Card className="bg-gray-800 text-white shadow-lg border border-gray-600">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex justify-center">
              <img
                className="rounded-full border-4 border-yellow-500 w-24 h-24"
                width={"200px"}
                height={"200px"}
                src={profilePicture}
                alt="Profile"
              />
            </div>

            <div>
              <Label htmlFor="fullName" className="text-yellow-500">
                Full Name
              </Label>
              <TextInput
                id="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="profilePicture" className="text-yellow-500">
                Profile Picture URL
              </Label>
              <TextInput
                id="profilePicture"
                value={profilePicture}
                onChange={(event) => setProfilePicture(event.target.value)}
                className="mt-2"
                placeholder="Enter your profile picture URL"
              />
              <small className="text-gray-400">
                Please input your new profile picture URL.
              </small>
            </div>

            <div>
              <Label htmlFor="cauldronName" className="text-yellow-500">
                Cauldron Name
              </Label>
              <TextInput
                id="cauldronName"
                value={cauldronName}
                onChange={(event) => setCauldronName(event.target.value)}
                className="mt-2"
                placeholder="Enter your cauldron's name"
              />
            </div>

            <div className="flex justify-center gap-4 mt-2">
              <Button
                type="submit"
                style={{ backgroundColor: "#FFA400" }}
                className="bg-yellow-500 hover:bg-yellow-400 text-white"
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#FB8C00")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#FFA726")}
              >
                Edit Profile
              </Button>
              <Link to="/">
                <Button className="bg-red-600 hover:bg-red-500 text-white">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
