import React, { useState, useContext } from "react";
import RegisterBank from "./RegisterBank";
import AuthContext from "../context/AuthContext";
import Popup from "../Util/Popup";
import CampsCheck from "./CampsCheck";

const CampEdit = (props) => {
  const { user } = useContext(AuthContext);
  const [flag, setFlag] = useState(true);
  const [popup, setPopup] = useState(-1);
  const [sent, setSent] = useState([]);

  const s1 =
    "mx-2 px-9 py-2 w-max font-semibold rounded-full shadow-sm text-white-900 bg-blood hover:drop-shadow-md hover:opacity-80 cursor-pointer";

  return (
    <div>
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 md:p-8 animate-fade-in">
        <div 
          className="absolute inset-0 bg-secondary-900/60 backdrop-blur-md"
          onClick={() => props.setPopup(-1)}
        ></div>
        
        <div className="relative w-full max-w-5xl glass dark:glass-dark rounded-[3rem] shadow-premium border border-white-900/20 overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-8 border-b border-secondary-100 dark:border-secondary-800 bg-white-100/50 dark:bg-secondary-900/50 backdrop-blur-sm z-10">
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-1 bg-primary-600 rounded-full"></div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white-900">Camp Management</h1>
                        <p className="text-xs font-bold text-secondary-400 uppercase tracking-widest mt-0.5">Verified Donor Participation</p>
                    </div>
                </div>
                <button
                    onClick={() => props.setPopup(-1)}
                    className="h-12 w-12 rounded-2xl bg-secondary-100 dark:bg-secondary-800 text-secondary-500 hover:text-error hover:bg-error/10 transition-all active:scale-95 flex items-center justify-center font-black"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                <div className="mb-8 p-6 bg-primary-50 dark:bg-primary-900/10 rounded-3xl border border-primary-100 dark:border-primary-900/30 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-primary-900 dark:text-primary-100">
                        <div className="h-12 w-12 rounded-xl bg-primary-500 text-white-900 flex items-center justify-center text-xl shadow-lg shadow-primary-500/20">
                            <i className="fa-solid fa-users-viewfinder"></i>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-60">Event Audience</p>
                            <h3 className="text-xl font-bold">{props.data.name}</h3>
                        </div>
                    </div>
                    <div className="text-right">
                         <span className="text-3xl font-black text-primary-600">{props.data.donors.length}</span>
                         <span className="text-[10px] font-black text-secondary-400 uppercase tracking-widest block">Registered</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                    {props.data.donors.map((k, j) => (
                        <CampsCheck
                            setSent={setSent}
                            popup={popup}
                            setPopup={setPopup}
                            data={k}
                            camp={props.data._id}
                            key={j}
                        />
                    ))}
                    {props.data.donors.length === 0 && (
                        <div className="col-span-full py-16 text-center border-2 border-dashed border-secondary-100 dark:border-secondary-800 rounded-[2.5rem]">
                             <i className="fa-solid fa-user-slash text-4xl text-secondary-200 mb-4 block"></i>
                             <p className="text-secondary-400 font-bold uppercase tracking-widest text-xs">No donors joined this camp yet.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 bg-secondary-50/50 dark:bg-white-100/5 border-t border-secondary-100 dark:border-secondary-800 text-center">
                <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-[0.2em]">Annadata Event Surveillance System • Real-Time Update Activated</p>
            </div>
        </div>
    </div>
      <Popup
        popup={popup}
        setPopup={setPopup}
        data={sent}
        handle="User"
      />
    </div>
  );
};

export default CampEdit;
