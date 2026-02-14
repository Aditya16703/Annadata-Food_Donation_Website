import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserNav from "../User/UserNav";
import EditProfile from "./EditProfile";
import History from "../Util/History";
import RegisterBank from "./RegisterBank";
import Camps from "./Camps";
import Stock from "./Stock";

// Defines a functional component named Bank.
const Bank = (props) => {
  //Imports React and the useContext hook for accessing context.
  //Retrieves the user object from the AuthContext. This contains information about the logged-in user.
  const { user } = useContext(AuthContext);
  //Imports the useParams hook to access URL parameters.
  //Retrieves the handle parameter from the URL. This is used to determine which section of the bank's interface to display.The Bank component shows different parts of a food bank's interface based on the URL.
  //It uses the URL parameter handle to decide which section (profile, stock, donations, requests, camps, or register) to display.
  const { handle } = useParams();
  //here handles are profilr,stock,donations,etc
  //if title "Bank profile " selecyed go to /bank/profile
  const nav = [
    { to: "/bank/profile", icon: "fa-user", title: "Bank Profile" },
    { to: "/bank/stock", icon: "fa-layer-group", title: "Food Stock" },
    {
      to: "/bank/donations",
      icon: "fa-hand-holding-medical",
      title: "Donations",
    },
    { to: "/bank/requests", icon: "fa-clock-rotate-left", title: "Requests" },
    {
      to: "/bank/camps",
      icon: "fa-clock-rotate-left",
      title: "Food Donation Camps",
    },
    { to: "/bank/registerBank", icon: "fa-rotate", title: "Register new Camp" },
  ];
  return (
    <div className="flex min-h-screen bg-white-100 dark:bg-black text-secondary-900 dark:text-white-900 font-sans">
      {/* Sidebar */}
      <aside className="w-72 fixed h-screen z-40 hidden lg:block">
        <UserNav data={nav} />
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-72 min-h-screen overflow-x-hidden">
        <div className="p-6 md:p-12 max-w-6xl mx-auto animate-fade-in">
          {handle === "profile" && <EditProfile />}
          {handle === "stock" && <Stock />}
          {handle === "donations" && <History user="bank" handle={handle} />}
          {handle === "requests" && <History user="bank" handle={handle} />}
          {handle === "camps" && <Camps />}
          {handle === "registerBank" && (
            <RegisterBank todo="register" bank={user} />
          )}

          {!handle && (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 bg-primary-100 text-primary-600 rounded-3xl flex items-center justify-center text-3xl">
                    <i className="fa-solid fa-building-columns"></i>
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold">Food Bank Dashboard</h2>
                    <p className="text-secondary-500">Manage your stock, donations, and camp registrations from the side menu.</p>
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Bank;
