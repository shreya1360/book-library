import React from "react";
import { useAuth } from "../context/AuthProvider";
import Appbar from "./Admin/Appbar";

function Profile() {
  const [authUser] = useAuth();

  return (
    <div>
      {" "}
      <Appbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-gray-600 text-sm">
            View your account details below:
          </p>

          <div className="mt-6 space-y-4 text-left">
            <div>
              <span className="font-semibold">Name:</span>{" "}
              <span>
                {authUser?.firstName + " " + authUser.lastName || "N/A"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <span>{authUser?.email || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
