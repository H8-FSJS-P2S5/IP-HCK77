import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("EKO");
  const [profilePicture, setProfilePicture] = useState("EKO");
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col max-h-screen h-screen justify-center items-center">
      <div>
        <h1 className="font-bold underline">Your Profile</h1>
      </div>
      <div style={{ width: "50%" }} className="max-w-lg">
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
