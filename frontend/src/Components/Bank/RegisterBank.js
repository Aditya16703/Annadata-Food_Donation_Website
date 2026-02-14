import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../assets/data.json";
import axios from "../Api";

const RegisterBank = (props) => {
  const [name, setName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [contact, setContact] = useState(0);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const s1 =
    "mx-2 px-9 py-2 w-4/12 font-semibold rounded-full shadow-sm text-white-900 bg-blood hover:drop-shadow-md hover:opacity-80 cursor-pointer";
  const submit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      organizer: organizer,
      contact: contact,
      date: date,
      startTime: start,
      endTime: end,
      state: data.states[state].state,
      district: data.states[state].districts[district],
      address: address,
    };
    if (props.todo === "register") {
      //Register a New Camp: If props.todo is "register", it sends a POST request to the server to create a new food donation camp.
      await axios
        .post("/camps", formData, { withCredentials: true })
        .then((r) => {
          alert("Registered New Food Donation Camp ✅");
          navigate("/bank/camps");
        })
        .catch((e) => {
          alert("Something went wrong in RegissterBank.js in Bank");
        });
    } else {
      //Edit an Existing Camp: If props.todo is not "register", it performs some actions (though here it simply alerts "Edited").
      alert("Edited");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="flex items-center space-x-5">
                <div className="h-16 w-16 rounded-[2rem] bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white text-3xl shadow-xl">
                    <i className="fa-solid fa-tent"></i>
                </div>
                <div>
                  <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white mb-2">Initialize New Camp</h1>
                  <p className="text-secondary-500 font-medium">Schedule a food distribution or donation event at a new venue.</p>
                </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate("/bank/camps")}
                className="px-8 py-3 rounded-2xl font-bold bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-white transition-all active:scale-95 shadow-lg flex items-center space-x-2"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Events</span>
              </button>
            </div>
        </div>

        <form onSubmit={submit} className="space-y-10">
            {/* Camp Details Section */}
            <div className="glass dark:glass-dark rounded-[3rem] p-10 border border-white/20 shadow-premium">
                <div className="flex items-center space-x-4 mb-10">
                    <div className="h-10 w-1 bg-primary-600 rounded-full"></div>
                    <h3 className="text-xl font-display font-bold text-secondary-900 dark:text-white uppercase tracking-wider">Event Core Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Event Reference Name</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="text"
                            placeholder="e.g. Community Weekend Drive"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Conducting Authority</label>
                        <input
                            className="input-field dark:bg-secondary-900/50 font-bold opacity-80"
                            type="text"
                            required
                            disabled
                            value={props.bank.name}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">On-Site Organizer</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="text"
                            placeholder="Full name of representative"
                            required
                            value={organizer}
                            onChange={(e) => setOrganizer(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Operational Contact</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="tel"
                            placeholder="10-digit mobile number"
                            required
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 border-t border-secondary-100 dark:border-secondary-800 pt-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Scheduled Date</label>
                            <input
                                className="input-field dark:bg-secondary-900/50"
                                type="date"
                                required
                                value={date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Shift Start</label>
                            <input
                                className="input-field dark:bg-secondary-900/50"
                                type="time"
                                required
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Shift End</label>
                            <input
                                className="input-field dark:bg-secondary-900/50"
                                type="time"
                                required
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div className="glass dark:glass-dark rounded-[3rem] p-10 border border-white/20 shadow-premium">
                 <div className="flex items-center space-x-4 mb-10">
                    <div className="h-10 w-1 bg-success rounded-full"></div>
                    <h3 className="text-xl font-display font-bold text-secondary-900 dark:text-white uppercase tracking-wider">Venue Logistics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">State Jurisdiction</label>
                        <div className="relative">
                            <select
                                className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value);
                                    setDistrict(0);
                                }}
                            >
                                {data.states.map((e, i) => (
                                    <option key={i} value={i}>{e.state}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Target District</label>
                         <div className="relative">
                            <select
                                className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            >
                                {data.states[state].districts.map((e, i) => (
                                    <option key={i} value={i}>{e}</option>
                                ))}
                            </select>
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Venue Landmarks & Address</label>
                        <textarea
                            className="input-field dark:bg-secondary-900/50 min-h-[120px] pt-4"
                            placeholder="Provide full location details for donors to easily locate the camp."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-6">
                <button
                    type="submit"
                    className="group relative px-12 py-5 rounded-[2rem] bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 font-display font-black text-xl uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10 flex items-center space-x-3 group-hover:text-white">
                        <span>Deploy Camp</span>
                        <i className="fa-solid fa-rocket group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    </span>
                </button>
                <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-[0.3em] mt-8">Secure Institutional Access Protocol</p>
            </div>
        </form>
    </div>
  );
};

export default RegisterBank;
