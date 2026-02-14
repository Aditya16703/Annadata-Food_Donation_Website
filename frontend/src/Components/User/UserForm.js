import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; //  merged both imports in one line
import data from "../../assets/data.json";
import axios from "../Api";
import BanksSearch from "./BanksSearch";
import AuthContext from "../context/AuthContext";

const UserForm = () => {
  const { handle } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // initialized correct state types
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [desc, setDesc] = useState("");
  const [bank, setBank] = useState("");
  const [food, setFood] = useState(0);
  const [state, setState] = useState(0);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [district, setDistrict] = useState(0);
  const [me, setMe] = useState(false);

  const foodGroups = [
    "Non-Perishable Food",
    "Perishable Food",
    "Prepared Food",
    "Baby Food and Formula",
    "Snacks and Beverages",
  ];

  //  Added handle in dependency array to ensure recheck when it changes
  useEffect(() => {
    if (handle === "donate") {
      setMe(true);
    }
  }, [handle]);

  //  Safely populate fields when "me" becomes true
  useEffect(() => {
    if (me && user) {
      setName(user.name || "");
      setFood(foodGroups.indexOf(user.foodGroup) || 0);
      setAge(user.age || "");
      setGender(user.gender || "male");
    }
  }, [me, user]);

  //  Donate function
  const donate = () => {
    const formData = {
      bankId: bank,
      units,
      disease: desc,
    };

    axios
      .post("/user/donate", formData, { withCredentials: true })
      .then(() => {
        alert("Donation request sent successfully");
        navigate("/user/donations");
      })
      .catch(() => alert("Something went wrong"));
  };

  //  Request function
  const request = () => {
    const formData = {
      bankId: bank,
      name,
      foodGroup: foodGroups[food],
      age,
      gender,
      units,
      reason: desc,
    };
    axios
      .post("/user/request", formData, { withCredentials: true })
      .then(() => {
        alert("Food request sent successfully");
        navigate("/user/requests");
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-2">
            {handle === "donate" ? "Donate Food" : "Request Support"}
        </h1>
        <p className="text-secondary-500 font-medium">
            {handle === "donate" 
                ? "Your contribution helps fight hunger. Fill in the details to schedule a donation." 
                : "We are here to help. Provide your details and we'll connect you with a food bank."}
        </p>
      </div>

      <form
        className="space-y-10 animate-fade-in"
        onSubmit={(e) => {
          e.preventDefault();
          if (bank === "") {
            alert("Please select a Food Bank to continue.");
            return;
          }
          handle === "donate" ? donate() : request();
        }}
      >
        <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 border border-white-900/20 shadow-premium">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex items-center space-x-4">
                <div className="h-10 w-1 bg-primary-600 rounded-full"></div>
                <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">
                    {handle === "donate" ? "Donation" : "Beneficiary"} Information
                </h3>
            </div>

            {handle === "request" && (
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={me}
                        onChange={() => setMe(!me)}
                    />
                    <div className="w-11 h-6 bg-secondary-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white-100 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </div>
                <span className="text-sm font-bold text-secondary-600 dark:text-white-400 group-hover:text-primary-600 transition-colors">Apply for myself</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`space-y-2 ${handle === "request" ? "lg:col-span-2" : "lg:col-span-3"}`}>
              <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">
                {handle === "request" ? "Beneficiary Full Name" : "Donor Full Name"} <span className="text-error font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                    <i className="fa-solid fa-user"></i>
                </div>
                <input
                  className="input-field dark:bg-secondary-900/50 pl-11"
                  type="text"
                  placeholder="Enter full name"
                  required
                  value={name}
                  disabled={me || handle === "donate"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">
                Food Category <span className="text-error font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  value={food}
                  onChange={(e) => setFood(Number(e.target.value))}
                  disabled={me || handle === "donate"}
                  className="input-field appearance-none dark:bg-secondary-900/50 pr-10"
                >
                  {foodGroups.map((item, i) => (
                    <option key={i} value={i}>{item}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            {handle === "request" && (
                <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">Age <span className="text-error font-bold">*</span></label>
                      <input
                        className="input-field dark:bg-secondary-900/50"
                        type="number"
                        placeholder="Years"
                        required
                        value={age}
                        min={1}
                        disabled={me}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">Gender <span className="text-error font-bold">*</span></label>
                      <div className="relative">
                        <select
                          value={gender}
                          disabled={me}
                          onChange={(e) => setGender(e.target.value)}
                          className="input-field appearance-none dark:bg-secondary-900/50 pr-10"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                      </div>
                    </div>
                </>
            )}

            <div className="space-y-2">
                <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">Quantity (Approx. kg) <span className="text-error font-bold">*</span></label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                        <i className="fa-solid fa-weight-hanging"></i>
                    </div>
                    <input
                        className="input-field dark:bg-secondary-900/50 pl-11"
                        type="number"
                        min={1}
                        max={1000}
                        required
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        placeholder="e.g. 10"
                    />
                </div>
            </div>

            <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">
                    {handle === "donate" ? "Health/Safety Notes (e.g. Allergens)" : "Reason for Request"}
                </label>
                <input
                    className="input-field dark:bg-secondary-900/50"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder={handle === "donate" ? "Any specific instructions for storage or handling..." : "Briefly describe the need..."}
                />
            </div>
          </div>
        </div>

        {/* Location & Bank Selection */}
        <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 border border-white-900/20 shadow-premium">
            <div className="flex items-center space-x-4 mb-10">
                <div className="h-10 w-1 bg-success rounded-full"></div>
                <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">Select Target Food Bank</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">State <span className="text-error font-bold">*</span></label>
                    <div className="relative">
                        <select
                            value={state}
                            onChange={(e) => {
                                setState(Number(e.target.value));
                                setDistrict(0);
                            }}
                            className="input-field appearance-none dark:bg-secondary-900/50 pr-10"
                        >
                            {data.states.map((s, i) => (
                                <option key={i} value={i}>{s.state}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary-700 dark:text-white-300 ml-1">District <span className="text-error font-bold">*</span></label>
                    <div className="relative">
                        <select
                            value={district}
                            onChange={(e) => setDistrict(Number(e.target.value))}
                            className="input-field appearance-none dark:bg-secondary-900/50 pr-10"
                        >
                            {data.states[state].districts.map((d, i) => (
                                <option key={i} value={i}>{d}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white-100/50 dark:bg-black/50 rounded-3xl p-6 border border-white-900/10">
                <BanksSearch
                    state={data.states[state].state}
                    district={data.states[state].districts[district]}
                    setBank={setBank}
                />
            </div>
        </div>

        <div className="flex flex-col items-center pt-4">
          <button
            type="submit"
            className="btn-primary px-16 py-4 text-lg font-bold shadow-premium transition-all active:scale-95 group flex items-center space-x-3"
          >
            <span>Confirm {handle === "donate" ? "Donation" : "Request"}</span>
            <i className="fa-solid fa-circle-check transition-transform group-hover:scale-125"></i>
          </button>
          <p className="mt-4 text-xs text-secondary-500 font-medium">By submitting, you agree to our community standards and privacy policy.</p>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
