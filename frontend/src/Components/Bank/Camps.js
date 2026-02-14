import React, { useState, useEffect } from "react";
import axios from "../Api";
import CampEdit from "./CampEdit";

const Camps = () => {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(-1);

  useEffect(() => {
    axios
      .get("/camps")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Something went wrong in Bank camps.js");
      });
  }, []);

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-secondary-900 dark:text-white">Active Services & Camps</h2>
          <p className="text-secondary-500 font-medium mt-1">Monitor and manage institutional food distribution events.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-secondary-100 dark:bg-secondary-800 px-4 py-2 rounded-2xl border border-white/20">
            <i className="fa-solid fa-calendar-check text-primary-500"></i>
            <span className="text-xs font-bold text-secondary-700 dark:text-white-300 uppercase tracking-widest">{data.length} Scheduled Events</span>
        </div>
      </div>

      <div className="glass dark:glass-dark rounded-[2.5rem] border border-white/20 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-secondary-100 dark:border-secondary-800 bg-secondary-50/30 dark:bg-white/5">
                <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Event Timeline</th>
                <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Facility & Name</th>
                <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Location Info</th>
                <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Organizer Details</th>
                <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800">
              {data.length > 0 ? (
                data.map((e, i) => (
                  <tr key={i} className="group hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                    <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                            <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-secondary-200 dark:border-secondary-700">
                                <span className="text-[10px] font-black uppercase leading-none mb-0.5">{new Date(e.date).toLocaleDateString(undefined, { month: 'short' })}</span>
                                <span className="text-lg font-black leading-none">{new Date(e.date).getDate()}</span>
                            </div>
                            <div className="text-xs font-mono font-bold text-primary-600 bg-primary-100/50 dark:bg-primary-900/20 px-2 py-1 rounded-lg">
                                {e.startTime} - {e.endTime}
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <div className="font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            {e.name}
                        </div>
                        <div className="text-xs text-secondary-400 mt-1 flex items-center">
                            <i className="fa-solid fa-map-pin mr-1.5 opacity-50"></i>
                            {e.address}
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <div className="text-xs font-bold text-secondary-700 dark:text-white-300">
                             {e.district}
                        </div>
                        <div className="text-[10px] text-secondary-400 font-black uppercase tracking-widest mt-0.5">
                             {e.state}
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                             <div className="h-8 w-8 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center text-xs text-secondary-500">
                                <i className="fa-solid fa-user-tie"></i>
                             </div>
                             <div>
                                <div className="text-xs font-bold text-secondary-900 dark:text-white">{e.organizer}</div>
                                <div className="text-[10px] text-secondary-400">{e.contact}</div>
                             </div>
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => setPopup(i)}
                          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-white font-bold text-xs hover:bg-primary-500 hover:text-white transition-all active:scale-95 shadow-sm"
                        >
                          <i className="fa-solid fa-id-card-clip"></i>
                          <span>Manage Donors</span>
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                         <div className="flex flex-col items-center space-y-4">
                            <div className="h-20 w-20 bg-secondary-50 dark:bg-secondary-800 rounded-3xl flex items-center justify-center text-3xl text-secondary-300">
                                <i className="fa-solid fa-calendar-xmark"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-secondary-900 dark:text-white">No active events</h3>
                                <p className="text-secondary-500 text-sm">You haven't scheduled any distribution camps yet.</p>
                            </div>
                         </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {popup !== -1 && <CampEdit popup={popup} setPopup={setPopup} data={data[popup]} />}
    </div>
  );
};

export default Camps;
