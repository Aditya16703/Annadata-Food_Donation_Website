import React, { useState, useEffect } from "react";
import data from "../../assets/data.json";
import axios from "../Api";

const Camps = () => {
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        `/camps/allCamps/${data.states[state].state}/${data.states[state].districts[district]}/${date}`
      )
      .then((res) => {
        setFiltered(res.data);
        setError("");
      })
      .catch(() => setError("⚠️ Failed to fetch camp data."));
  }, [state, district, date]);

  return (
    <div className="min-h-screen bg-transparent dark:bg-transparent py-16 px-6 animate-fade-in text-secondary-900 dark:text-white-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-4">
            Donation <span className="text-primary-600">Camps</span>
          </h1>
          <p className="text-secondary-500 dark:text-white-400 font-medium">Find upcoming food donation drives and camps in your neighborhood.</p>
        </div>

        {/* Filter Section */}
        <div className="glass dark:glass-dark rounded-3xl p-8 mb-12 shadow-premium border border-white-900/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-bold text-secondary-700 dark:text-white-300 uppercase tracking-wider ml-1">
                Select State
              </label>
              <div className="relative">
                <select
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(Number(e.target.value));
                    setDistrict(0);
                  }}
                  className="input-field appearance-none pr-10 cursor-pointer dark:bg-secondary-900 dark:text-white-900 font-sans"
                >
                  {data.states.map((e, i) => (
                    <option key={i} value={i}>
                      {e.state}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="district" className="text-sm font-bold text-secondary-700 dark:text-white-300 uppercase tracking-wider ml-1">
                Select District
              </label>
              <div className="relative">
                <select
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(Number(e.target.value))}
                  className="input-field appearance-none pr-10 cursor-pointer dark:bg-secondary-900 dark:text-white-900 font-sans"
                >
                  {data.states[state].districts.map((d, i) => (
                    <option key={i} value={i}>
                      {d}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-bold text-secondary-700 dark:text-white-300 uppercase tracking-wider ml-1">
                Choose Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="input-field dark:bg-secondary-900 dark:text-white-900 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="glass dark:glass-dark rounded-[2rem] overflow-hidden shadow-premium border border-white-900/10">
          {error ? (
            <div className="p-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error mb-4">
                <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
              </div>
              <p className="text-secondary-900 dark:text-white-900 font-bold">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-400 mb-4">
                <i className="fa-solid fa-calendar-xmark text-2xl"></i>
              </div>
              <p className="text-secondary-500 dark:text-white-400 italic font-medium">No donation camps scheduled for this date and region.</p>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-secondary-50 dark:bg-secondary-800">
                    {[
                      "Camp & Organizer",
                      "Location Details",
                      "Contact Info",
                      "Schedule",
                    ].map((head, i) => (
                      <th key={head} className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest border-b border-secondary-100 dark:border-secondary-700 first:pl-8 last:pr-8">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800 bg-white-100 dark:bg-secondary-900">
                  {filtered.map((e, i) => (
                    <tr key={i} className="hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors group">
                      <td className="px-6 py-5 first:pl-8">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                            {e.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-secondary-900 dark:text-white-900 group-hover:text-primary-600 transition-colors">{e.name}</p>
                            <p className="text-xs text-secondary-400 mt-1">By: {e.organizer || e.bankId?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-secondary-700 dark:text-white-300">{e.address}</p>
                        <p className="text-xs text-secondary-400 mt-0.5">{e.district}, {e.state}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          <i className="fa-solid fa-phone text-xs mr-2 text-primary-500"></i> {e.contact}
                        </p>
                      </td>
                      <td className="px-6 py-5 last:pr-8">
                        <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-1.5 rounded-full text-sm font-bold">
                          <i className="fa-regular fa-clock text-xs"></i>
                          <span>{e.startTime} - {e.endTime}</span>
                        </div>
                        <p className="text-[10px] text-secondary-400 mt-2 font-bold uppercase tracking-tighter">
                          {new Date(e.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Camps;
