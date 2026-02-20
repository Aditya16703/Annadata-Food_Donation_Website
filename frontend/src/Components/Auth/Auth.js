import React, { useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";
import data from "../../assets/data.json";

const Auth = () => {
  const { type, handle } = useParams(); // type: 'login' or 'register', handle: 'donor', 'receiver', 'bank'
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  // Common fields
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  
  // Registration-only fields (all users)
  const [name, setName] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  
  // User-specific fields (donor/receiver)
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [foodGroup, setFoodGroup] = useState("Non-Perishable Food");
  
  // Bank-specific fields
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = type === "login";
  const isBank = handle === "bank";
  const isDonor = handle === "donor";
  const isReceiver = handle === "receiver";

  // Food groups for user registration
  const foodGroups = [
    "Non-Perishable Food",
    "Perishable Food",
    "Prepared Food",
    "Baby Food and Formula",
    "Snacks and Beverages",
  ];

  // Get title based on type and handle
  const getTitle = () => {
    if (isBank) return isLogin ? "Food Bank Login" : "Register Food Bank";
    if (isDonor) return isLogin ? "Donor Login" : "Register as Donor";
    if (isReceiver) return isLogin ? "Receiver Login" : "Register as Receiver";
    return "Authentication";
  };

  // Get icon based on handle
  const getIcon = () => {
    if (isBank) return "fa-building";
    if (isDonor) return "fa-hand-holding-heart";
    if (isReceiver) return "fa-users";
    return "fa-user";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = {
        phone,
        password,
        ...((!isLogin) && {
          name,
          state: data.states[state].state,
          district: data.states[state].districts[district],
          address,
        }),
        ...((!isLogin && !isBank) && {
          // User-specific fields (donor/receiver)
          age: parseInt(age),
          gender,
          foodGroup,
        }),
        ...((!isLogin && isBank) && {
          // Bank-specific fields
          email,
          hospital,
          category,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      };

      const endpoint = isLogin ? `/auth/login/${handle}` : `/auth/${handle}`;
      await axios.post(endpoint, formData);
      
      await getLoggedIn();
      navigate(isBank ? "/bank/profile" : "/user/profile");
    } catch (err) {
      setError(err.response?.data?.errorMessage || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 dark:bg-black flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-[2rem] bg-gradient-to-br from-primary-500 to-primary-700 text-white-900 text-4xl shadow-premium mb-6">
            <i className={`fa-solid ${getIcon()}`}></i>
          </div>
          <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-3">
            {getTitle()}
          </h1>
          <p className="text-secondary-500 dark:text-white-400">
            {isLogin ? "Welcome back! Sign in to continue." : "Join our community and make a difference."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-[3rem] p-10 shadow-premium border border-white-900/20">
          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-error/10 border border-error text-error px-6 py-4 rounded-2xl text-sm font-medium">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            {/* Registration Fields */}
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                    {isBank ? "Food Bank Name" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={isBank ? "Enter food bank name" : "Enter your full name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {isBank && (
                  <div className="space-y-2">
                    <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                      Hospital/Organization Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter hospital or organization name"
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* User-specific fields (donors and receivers only) */}
                {!isBank && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                          Age
                        </label>
                        <input
                          type="number"
                          className="input-field"
                          placeholder="Enter your age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          min="1"
                          max="120"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                          Gender
                        </label>
                        <div className="relative">
                          <select
                            className="input-field appearance-none pr-10"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                            <i className="fa-solid fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                          Food Group
                        </label>
                        <div className="relative">
                          <select
                            className="input-field appearance-none pr-10"
                            value={foodGroup}
                            onChange={(e) => setFoodGroup(e.target.value)}
                            required
                          >
                            {foodGroups.map((group, i) => (
                              <option key={i} value={group}>{group}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                            <i className="fa-solid fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Bank-specific fields */}
                {isBank && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="Enter official email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                        Category
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Community Food Bank, Hospital, NGO"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                      State
                    </label>
                    <div className="relative">
                      <select
                        className="input-field appearance-none pr-10"
                        value={state}
                        onChange={(e) => {
                          setState(Number(e.target.value));
                          setDistrict(0);
                        }}
                        required
                      >
                        {data.states.map((s, i) => (
                          <option key={i} value={i}>{s.state}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                      District
                    </label>
                    <div className="relative">
                      <select
                        className="input-field appearance-none pr-10"
                        value={district}
                        onChange={(e) => setDistrict(Number(e.target.value))}
                        required
                      >
                        {data.states[state].districts.map((d, i) => (
                          <option key={i} value={i}>{d}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                    Address
                  </label>
                  <textarea
                    className="input-field min-h-[100px]"
                    placeholder="Enter complete address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                {isBank && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="input-field"
                        placeholder="e.g., 28.7041"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="input-field"
                        placeholder="e.g., 77.1025"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black text-secondary-400 dark:text-secondary-300 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-bold mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </>
              )}
            </button>

            {/* Toggle Link */}
            <div className="text-center pt-6 border-t border-secondary-100 dark:border-secondary-800">
              <p className="text-secondary-600 dark:text-white-400 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {" "}
                <Link
                  to={isLogin ? `/register/${handle}` : `/login/${handle}`}
                  className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
                >
                  {isLogin ? "Register here" : "Login here"}
                </Link>
              </p>
            </div>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-secondary-500 dark:text-white-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
