import React, { useState, useEffect } from "react";
import data from "../../assets/data.json";
import axios from "../Api";

const Banks = () => {
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        `/bank/allBanks/${data.states[state].state}/${data.states[state].districts[district]}`
      )
      .then((res) => {
        setFiltered(res.data);
        setError("");
      })
      .catch(() => {
        setError("⚠️ Failed to fetch bank data. Please try again later.");
      });
  }, [state, district]);

  return (
    <div className="min-h-screen bg-transparent dark:bg-transparent py-16 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-4">
            Food Bank <span className="text-primary-600">Directory</span>
          </h1>
          <p className="text-secondary-500 dark:text-white-400">Discover and connect with local food banks in your region.</p>
        </div>

        {/* Filter Section */}
        <div className="glass dark:glass-dark rounded-3xl p-8 mb-12 shadow-premium border border-white-900/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="input-field appearance-none pr-10 cursor-pointer dark:bg-secondary-900 dark:text-white-900 dark:border-secondary-700 font-sans"
                >
                  {data.states.map((s, i) => (
                    <option key={i} value={i}>
                      {s.state}
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
                  className="input-field appearance-none pr-10 cursor-pointer dark:bg-secondary-900 dark:text-white-900 dark:border-secondary-700 font-sans"
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
          </div>
        </div>

        {/* Data Table */}
        <div className="glass dark:glass-dark rounded-[2rem] overflow-hidden shadow-premium border border-white-900/10">
          {error ? (
            <div className="p-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error mb-4">
                <i className="fa-solid fa-circle-exclamation text-2xl"></i>
              </div>
              <p className="text-secondary-900 dark:text-white-900 font-bold">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-400 mb-4">
                <i className="fa-solid fa-box-open text-2xl"></i>
              </div>
              <p className="text-secondary-500 dark:text-white-400 italic font-medium">No food banks found in this region.</p>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-secondary-50 dark:bg-secondary-800">
                    {[
                      "Food Bank Name",
                      "Organisation",
                      "Category",
                      "Location",
                      "Contact Info",
                      "Action",
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
                        <p className="font-bold text-secondary-900 dark:text-white-900 group-hover:text-primary-600 transition-colors">{e.name}</p>
                        <p className="text-xs text-secondary-400 mt-1">{e.organisation}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-block px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {e.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-secondary-700 dark:text-white-300">{e.district}, {e.state}</p>
                        <p className="text-xs text-secondary-400 mt-0.5 truncate max-w-[200px]">{e.address}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                            <i className="fa-solid fa-phone text-xs mr-2 text-primary-500"></i> {e.phone}
                          </p>
                          <p className="text-sm text-secondary-500 dark:text-secondary-400">
                            <i className="fa-solid fa-envelope text-xs mr-2 text-primary-500"></i> {e.email || '—'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5 last:pr-8">
                        {e.website ? (
                          <a
                            href={e.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold text-sm bg-primary-50 px-4 py-2 rounded-xl transition-all hover:shadow-md"
                          >
                            Website <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-xs"></i>
                          </a>
                        ) : (
                          <span className="text-secondary-300 text-xs italic">Not Available</span>
                        )}
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

export default Banks;
