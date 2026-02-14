
import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.jpg";
import { Outlet, Link } from "react-router-dom";
import DropDown from "../Util/DropDown";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
  const s1 =
    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 font-sans";

  const [theme, setTheme] = useState(0);
  const { getLoggedIn } = useContext(AuthContext);
  const doc = document.documentElement.classList;

  // ✅ Load theme on mount
  useEffect(() => {
    let t = localStorage.getItem("theme");
    if (!t) {
      localStorage.setItem("theme", "0");
      t = "0";
    }
    setTheme(Number(t));
    if (t === "1") doc.add("dark");
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Toggle theme between dark and light
  const toggleTheme = () => {
    const newTheme = theme === 0 ? 1 : 0;
    localStorage.setItem("theme", String(newTheme));
    setTheme(newTheme);
    if (newTheme === 1) doc.add("dark");
    else doc.remove("dark");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 p-4 transition-all duration-500 glass dark:glass-dark">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* ✅ Logo Section */}
          <Link to="/" className="group transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-12 w-12 rounded-full border-2 border-primary-500 p-0.5 transition-all group-hover:rotate-12"
                  src={logo}
                  draggable={false}
                  alt="Annadata Logo"
                />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-white"></div>
              </div>
              <div className="text-2xl font-display font-bold ml-3 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Annadata
              </div>
            </div>
          </Link>

          {/* ✅ Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <DropDown
              title="About Us"
              items={["Home", "About Annadata", "Contact Us"]}
              links={["/", "/about", "/contactUs"]}
            />

            {props.logIn ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-secondary-200 dark:border-secondary-700">
                <Link to={`/${props.user}/profile`} className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <i className="fa-solid fa-user"></i>
                </Link>

                <Link
                  to="/"
                  onClick={async () => {
                    try {
                      await axios.get("/auth/logout", { withCredentials: true });
                      await getLoggedIn();
                    } catch {
                      alert("Logout failed, please try again");
                    }
                  }}
                  className="btn-primary py-2 text-sm"
                >
                  Log Out
                </Link>
              </div>
            ) : (
              <>
                <DropDown
                  title="Looking For Food"
                  items={["User Login/Register", "Food Bank Directory"]}
                  links={["/register/receiver", "/food-banks"]}
                />

                <DropDown
                  title="Want To Donate"
                  items={[
                    "Food Donor Login/Register",
                    "Food Donation Camps",
                    "About Food Donation",
                  ]}
                  links={[
                    "/register/donor",
                    "/food-camps",
                    "/about-food-donation",
                  ]}
                />

                <div className="ml-4 pl-4 border-l border-secondary-200 dark:border-secondary-700">
                  <Link to="/login/bank" className="btn-primary py-2 text-sm">
                    Food Bank Login
                  </Link>
                </div>
              </>
            )}

            {/* ✅ Theme toggle button (Desktop) */}
            <button
              className="ml-4 p-2.5 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 hover:text-primary-600 transition-all active:scale-95 shadow-sm"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <i
                className={`fa-solid fa-lg fa-${
                  theme === 0 ? "sun" : "moon"
                }`}
              ></i>
            </button>
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
             <button
              className="p-2.5 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 transition-all active:scale-95 shadow-sm"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <i
                className={`fa-solid fa-lg fa-${
                  theme === 0 ? "sun" : "moon"
                }`}
              ></i>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-secondary-900 dark:text-white focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              <i className={`fa-solid fa-${isMobileMenuOpen ? 'xmark' : 'bars'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
          }`}
          style={{ top: '80px' }} 
        >
          <div className="flex flex-col p-6 space-y-6 overflow-y-auto h-full pb-24">
            {/* Mobile Navigation Links */}
            
            {/* About Section */}
            <div className="space-y-3">
              <h3 className="text-secondary-400 text-xs font-bold uppercase tracking-widest">About Us</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/about" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>About Annadata</Link>
                <Link to="/contactUs" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              </div>
            </div>

            <div className="h-px bg-secondary-100 dark:bg-secondary-800"></div>

            {!props.logIn ? (
              <>
                 {/* Looking For Food */}
                <div className="space-y-3">
                  <h3 className="text-secondary-400 text-xs font-bold uppercase tracking-widest">Looking For Food</h3>
                  <div className="flex flex-col space-y-2">
                    <Link to="/register/receiver" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>User Login/Register</Link>
                    <Link to="/food-banks" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Food Bank Directory</Link>
                  </div>
                </div>

                <div className="h-px bg-secondary-100 dark:bg-secondary-800"></div>

                {/* Want To Donate */}
                <div className="space-y-3">
                  <h3 className="text-secondary-400 text-xs font-bold uppercase tracking-widest">Want To Donate</h3>
                  <div className="flex flex-col space-y-2">
                    <Link to="/register/donor" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Food Donor Login/Register</Link>
                    <Link to="/food-camps" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Food Donation Camps</Link>
                    <Link to="/about-food-donation" className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>About Food Donation</Link>
                  </div>
                </div>

                <div className="h-px bg-secondary-100 dark:bg-secondary-800"></div>

                <Link to="/login/bank" className="btn-primary text-center py-3 w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Food Bank Login
                </Link>
              </>
            ) : (
              <div className="space-y-4">
                 <Link to={`/${props.user}/profile`} className="flex items-center space-x-3 text-lg font-medium text-secondary-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <span>My Profile</span>
                </Link>
                
                <button 
                  onClick={async () => {
                    try {
                      await axios.get("/auth/logout", { withCredentials: true });
                      await getLoggedIn();
                      setIsMobileMenuOpen(false);
                    } catch {
                      alert("Logout failed, please try again");
                    }
                  }}
                  className="btn-primary w-full py-3"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* ✅ Outlet renders nested routes */}
      <Outlet />
    </>
  );
};

export default Navbar;
