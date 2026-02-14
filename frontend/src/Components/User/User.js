import React from "react";
import UserNav from "./UserNav"; // Sidebar navigation
import { useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import UserForm from "./UserForm";
import History from "../Util/History";
import Camps from "./Camps";

const User = () => {
  const { handle } = useParams();

  const nav = [
    { to: "/user/profile", icon: "fa-user", title: "My Profile" },
    { to: "/user/donate", icon: "fa-hand-holding-medical", title: "Donate Food" },
    { to: "/user/donations", icon: "fa-clock-rotate-left", title: "Donation History" },
    { to: "/user/camps", icon: "fa-location-dot", title: "Food Donation Camps" },
    { to: "/user/request", icon: "fa-rotate", title: "Food Request" },
    { to: "/user/requests", icon: "fa-clock-rotate-left", title: "Request History" },
  ];

  // Map handle to component
  const componentMap = {
    profile: <EditProfile />,
    donate: <UserForm />,
    request: <UserForm />,
    donations: <History user="user" handle="donations" />,
    requests: <History user="user" handle="requests" />,
    camps: <Camps />,
  };

  return (
    <div className="flex min-h-screen bg-white-100 dark:bg-black text-secondary-900 dark:text-white-900 font-sans">
      {/* Sidebar - Now handled as a flexible column */}
      <aside className="w-72 fixed h-screen z-40 hidden lg:block">
        <UserNav data={nav} />
      </aside>

      {/* Main content - Adjusted margin for fixed sidebar */}
      <main className="flex-1 lg:ml-72 min-h-screen overflow-x-hidden">
        <div className="p-6 md:p-12 max-w-6xl mx-auto animate-fade-in">
          {componentMap[handle] || (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 bg-primary-100 text-primary-600 rounded-3xl flex items-center justify-center text-3xl">
                    <i className="fa-solid fa-hand-pointer"></i>
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold">Select a Dashboard View</h2>
                    <p className="text-secondary-500">Choose an option from the sidebar to manage your donations.</p>
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default User;
