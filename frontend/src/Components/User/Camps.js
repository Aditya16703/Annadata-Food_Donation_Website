import React, { useState, useEffect } from "react";
import data from "../../assets/data.json";
import axios from "../Api";

const Camps = () => {
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetchCamps(data.states[state].state, data.states[state].districts[district]);
  }, [state, district]);

  const fetchCamps = async (s, d) => {
    try {
      const res = await axios.get(`/camps/${s}/${d}`);
      setCamps(res.data);
    } catch (err) {
      alert("Something went wrong while fetching camps!");
    }
  };

  const register = async (i) => {
    try {
      await axios.put(`/camps/${i}`);
      alert("Registered successfully for this food camp!");
    } catch (e) {
      alert("Something went wrong while registering!");
    }
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-2">Food Camps</h1>
        <p className="text-secondary-500 font-medium">Browse and register for upcoming food distribution camps in your area.</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="state" className="block text-sm font-bold text-secondary-600 dark:text-secondary-400 mb-2 uppercase tracking-wider">
            State <span className="text-error">*</span>
          </label>
          <select
            name="state"
            id="state"
            value={state}
            onChange={(e) => {
              setState(Number(e.target.value));
              setDistrict(0);
            }}
            className="w-full p-4 rounded-2xl border border-secondary-200 dark:border-secondary-700 bg-white-100/60 dark:bg-secondary-900/40 text-secondary-900 dark:text-white-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all backdrop-blur-sm"
          >
            {data.states.map((e, i) => (
              <option key={i} value={i}>
                {e.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="district" className="block text-sm font-bold text-secondary-600 dark:text-secondary-400 mb-2 uppercase tracking-wider">
            District <span className="text-error">*</span>
          </label>
          <select
            name="district"
            id="district"
            value={district}
            onChange={(e) => setDistrict(Number(e.target.value))}
            className="w-full p-4 rounded-2xl border border-secondary-200 dark:border-secondary-700 bg-white-100/60 dark:bg-secondary-900/40 text-secondary-900 dark:text-white-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all backdrop-blur-sm"
          >
            {data.states[state].districts.map((e, i) => (
              <option key={i} value={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Camps Grid */}
      {camps.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {camps.map((e) => (
            <div key={e._id} className="group glass dark:glass-dark rounded-[2.5rem] p-8 border border-white-900/20 shadow-premium hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-secondary-900 dark:text-white-900 group-hover:text-primary-600 transition-colors">{e.name}</h3>
                  <p className="text-sm text-secondary-500 font-medium mt-1">{new Date(e.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                  <i className="fa-solid fa-campground text-lg"></i>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <i className="fa-solid fa-location-dot w-5 mr-3 text-primary-500"></i>
                  <span className="font-medium">{e.address}, {e.district}, {e.state}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <i className="fa-solid fa-user-tie w-5 mr-3 text-primary-500"></i>
                  <span className="font-medium">{e.organizer}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <i className="fa-solid fa-phone w-5 mr-3 text-primary-500"></i>
                  <span className="font-medium">{e.contact}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <i className="fa-solid fa-clock w-5 mr-3 text-primary-500"></i>
                  <span className="font-medium">{e.startTime} — {e.endTime}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-secondary-100 dark:border-secondary-800">
                <button
                  onClick={() => register(e._id)}
                  className="w-full py-3.5 rounded-2xl bg-primary-600 text-white-900 font-bold uppercase tracking-wider text-sm shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Register for Camp
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 glass dark:glass-dark rounded-[3rem] border-2 border-dashed border-secondary-200 dark:border-secondary-800">
          <div className="h-24 w-24 bg-secondary-50 dark:bg-secondary-800 rounded-full flex items-center justify-center text-4xl text-secondary-300">
            <i className="fa-solid fa-campground"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary-500">No Camps Found</h3>
            <p className="text-secondary-400 max-w-xs mx-auto mt-2">There are no upcoming food camps in the selected area. Try a different location.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camps;

