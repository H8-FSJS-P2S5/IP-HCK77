import { Button, Card, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../helpers/axiosInstance";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import Swal from "sweetalert2";

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
    try {
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
      Swal.fire({
        icon: "success",
        title: "Success update profile",
        timer: 1500,
      });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message || error?.response?.data?.message,
      });
    }
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

            <div>
              <div className="mb-2 block">
                <Label htmlFor="profilePicture" value="Cauldron Name" />
              </div>
              <TextInput
                value={cauldronName}
                onChange={(event) => setCauldronName(event.target.value)}
              />
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
