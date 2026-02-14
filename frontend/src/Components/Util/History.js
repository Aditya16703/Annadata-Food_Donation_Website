import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import axios from "../Api";
import Status from "./Status";

const History = (props) => {
  const [popup, setPopup] = useState(-1);
  const s1 =
    "bg-white-900 mx-3 mt-5 text-center h-max rounded-md text-base font-medium";
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("All");
  const choices = [
    "All",
    "Pending",
    "Approved",
    "Denied",
    props.handle === "donations" ? "Donated" : "Completed",
  ];
  const [id, setId] = useState(-1);
  const [newStat, setnewStat] = useState("");

  useEffect(() => {
    axios
      .get(`/${props.user}/${props.handle}`, { withCredentials: true })
      .then((r) => {
        setData(r.data);
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  }, []);

  useEffect(() => {
    if (id !== -1 && newStat) {
      const updatedData = data.map((item, index) =>
        index === id ? { ...item, status: newStat } : item
      );
      setData(updatedData);
      setId(-1); // Reset id
      setnewStat(""); // Reset newStat
    }
  }, [id, newStat, data]);

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-secondary-900 dark:text-white-900">
            {props.handle === "donations" ? "Donation History" : "Request History"}
          </h2>
          <p className="text-secondary-500 font-medium mt-1">
            Track and manage your {props.handle === "donations" ? "donations" : "food requests"} in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-4 glass dark:glass-dark px-4 py-2 rounded-2xl border border-white-900/20 shadow-sm">
          <span className="text-xs font-bold text-secondary-400 uppercase tracking-widest">Filter:</span>
          <div className="relative">
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-secondary-700 dark:text-white-900 focus:ring-0 cursor-pointer pr-8 appearance-none"
            >
              {choices.map((e) => (
                <option key={e} value={e} className="dark:bg-secondary-900">{e}</option>
              ))}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="glass dark:glass-dark rounded-[2.5rem] border border-white-900/20 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-secondary-100 dark:border-secondary-800 bg-secondary-50/30 dark:bg-white-100/5">
                {props.user === "bank" ? (
                  <>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Beneficiary</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest text-center">Age / Sex</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest text-center">Units</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Disease / Reason</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest text-right whitespace-nowrap">Current Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest text-center">Units</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Reason / Notes</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Date Logged</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest">Target Facility</th>
                    <th className="px-6 py-5 text-xs font-bold text-secondary-400 uppercase tracking-widest text-right">Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800">
              {data.filter(e => status === "All" || e.status === status).length > 0 ? (
                data.filter(e => status === "All" || e.status === status).map((e, i) =>
                    props.user === "bank" ? (
                      <tr key={i} className="group hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                        <td className="px-6 py-5">
                            <button 
                                onClick={() => setPopup(i)}
                                className="flex items-center space-x-3 text-secondary-900 dark:text-white-900 hover:text-primary-600 transition-colors"
                            >
                                <div className="h-10 w-10 rounded-xl bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center font-bold text-sm">
                                    {(props.handle === "donations" ? e.userId.name : e.name).charAt(0)}
                                </div>
                                <span className="font-bold underline decoration-secondary-200 decoration-1 underline-offset-4 group-hover:decoration-primary-300">
                                    {props.handle === "donations" ? e.userId.name : e.name}
                                </span>
                            </button>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className="text-sm font-medium text-secondary-600 dark:text-white-400">
                                {props.handle === "donations" ? e.userId.age : e.age}y / {props.handle === "donations" ? e.userId.gender[0].toUpperCase() : e.gender[0].toUpperCase()}
                            </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-white-900 font-bold text-xs">
                                {e.units}kg
                            </span>
                        </td>
                        <td className="px-6 py-5">
                            <span className="text-xs font-bold text-secondary-500 bg-secondary-50 dark:bg-secondary-800/50 px-3 py-1.5 rounded-full border border-secondary-100 dark:border-secondary-700">
                                {props.handle === "donations" ? e.userId.foodGroup : e.foodGroup}
                            </span>
                        </td>
                        <td className="px-6 py-5">
                            <p className="text-sm text-secondary-600 dark:text-white-400 max-w-xs truncate">
                                {props.handle === "donations" ? (e.disease || "---") : (e.reason || "---")}
                            </p>
                        </td>
                        <td className="px-6 py-5">
                            <div className="text-xs font-bold text-secondary-900 dark:text-white-900">
                                {e.date.split(" ")[2]}
                            </div>
                            <div className="text-[10px] text-secondary-400 font-mono mt-0.5">
                                {e.date.split(" ")[0]} {e.date.split(" ")[1]}
                            </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end">
                            <Status
                                status={e.status}
                                id={e._id}
                                i={i}
                                setId={setId}
                                units={e.units}
                                foodGroup={props.handle === "donations" ? e.userId.foodGroup : e.foodGroup}
                                setStatus={setnewStat}
                                handle={props.handle}
                            />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={i} className="group hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                        <td className="px-6 py-5 text-center">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-primary-100/50 dark:bg-primary-900/20 text-primary-600 font-black text-xs">
                                {e.units} kg
                            </span>
                        </td>
                        <td className="px-6 py-5">
                            <p className="text-sm text-secondary-600 dark:text-white-400 line-clamp-1 italic">
                                "{props.handle === "donations" ? (e.disease || "No notes") : (e.reason || "No reason given")}"
                            </p>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center space-x-2">
                                <i className="fa-regular fa-calendar text-primary-500"></i>
                                <div className="text-xs font-bold text-secondary-900 dark:text-white-900">
                                    {e.date.split(" ")[2]} <span className="text-secondary-400 font-normal ml-1 text-[10px]">{e.date.split(" ")[0]} {e.date.split(" ")[1]}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <button 
                                onClick={() => setPopup(i)}
                                className="flex items-center space-x-2 text-secondary-900 dark:text-white-900 hover:text-primary-600 transition-colors group/bank"
                            >
                                <div className="h-8 w-8 rounded-lg bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-xs group-hover/bank:bg-primary-100 group-hover/bank:text-primary-600 transition-colors">
                                    <i className="fa-solid fa-building-columns"></i>
                                </div>
                                <span className="font-bold underline decoration-secondary-200 decoration-1 underline-offset-4 group-hover/bank:decoration-primary-300">
                                    {e.bankId.name}
                                </span>
                            </button>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span
                            className={`inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter border-2 shadow-sm ${
                              (e.status === "Pending"
                                ? "bg-secondary-50 border-secondary-200 text-secondary-500"
                                : e.status === "Approved"
                                ? "bg-warning/10 border-warning/20 text-warning"
                                : e.status === "Denied"
                                ? "bg-error/10 border-error/20 text-error"
                                : "bg-success/10 border-success/20 text-success")
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr>
                    <td colSpan={props.user === "bank" ? 7 : 5} className="px-6 py-20">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="h-20 w-20 bg-secondary-100 dark:bg-secondary-800 rounded-3xl flex items-center justify-center text-3xl text-secondary-400">
                                <i className="fa-solid fa-hourglass-empty"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-secondary-900 dark:text-white-900">No entries found</h3>
                                <p className="text-secondary-500 text-sm">There are no {props.handle} matching the "{status}" status.</p>
                            </div>
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Popup
        popup={popup}
        setPopup={setPopup}
        data={
          popup === -1
            ? []
            : props.user === "bank"
            ? data[popup].userId
            : data[popup].bankId
        }
        handle={props.user === "bank" ? "User" : "Food Bank"}
      />
    </div>
  );
};

export default History;
