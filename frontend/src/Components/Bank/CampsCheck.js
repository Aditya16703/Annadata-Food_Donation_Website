import React, { useState } from "react";
import axios from "../Api";

const CampsCheck = (props) => {
  const [edit, setEdit] = useState(true);
  const [units, setUnits] = useState(props.data.units);
  const [status, setStatus] = useState(props.data.status);

  (() => {
    props.data._id.units = props.data.units;
    props.data._id.status = props.data.status === 0 ? "Pending" : "Donated";
  })();

  return (
    <div className="group/donor glass dark:glass-dark rounded-[2rem] p-6 border border-white-900/20 shadow-premium hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden">
      {/* Status Badge */}
      <div className={`absolute top-4 right-4 h-2 w-2 rounded-full ${status === 1 ? 'bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-warning animate-pulse'}`}></div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white-900 text-xl shadow-lg">
            {props.data._id.name.charAt(0)}
        </div>
        <div>
            <h4 className="text-sm font-black text-secondary-900 dark:text-white-900 uppercase tracking-tight">{props.data._id.name}</h4>
            <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-[10px] font-bold text-primary-600 bg-primary-100/50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {props.data._id.age} Yrs
                </span>
                <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest leading-none">
                    {props.data._id.gender}
                </span>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end p-4 bg-secondary-50/50 dark:bg-white-100/5 rounded-2xl border border-secondary-100 dark:border-secondary-800">
            <div>
                <span className="text-[9px] font-black text-secondary-400 uppercase tracking-widest block mb-1">Stock Contribution</span>
                <div className="flex items-baseline space-x-1">
                    {edit ? (
                        <span className="text-xl font-black text-secondary-900 dark:text-white-900">{props.data.units}</span>
                    ) : (
                        <input
                            type="number"
                            min={1}
                            max={250}
                            autoFocus
                            className="w-16 text-xl font-black text-primary-600 bg-transparent border-b-2 border-primary-500 focus:ring-0 px-0 py-0"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                        />
                    )}
                    <span className="text-xs font-bold text-secondary-500 uppercase">kg</span>
                </div>
            </div>
            
            <div className="flex space-x-2 mb-1">
                {edit ? (
                    <>
                        <button 
                            onClick={() => {
                                props.setPopup(props.popup === -1 ? 1 : -1);
                                props.setSent(props.data._id);
                            }}
                            className="h-8 w-8 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-500 hover:text-primary-600 transition-colors flex items-center justify-center"
                        >
                            <i className="fa-solid fa-circle-info text-sm"></i>
                        </button>
                        {status === 0 && (
                            <button 
                                onClick={() => setEdit(false)}
                                className="h-8 w-8 rounded-lg bg-primary-100/50 dark:bg-primary-900/20 text-primary-600 hover:bg-primary-500 hover:text-white-900 transition-all flex items-center justify-center"
                            >
                                <i className="fa-solid fa-pen-to-square text-sm"></i>
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <button 
                            onClick={async () => {
                                await axios
                                    .put(
                                        `/camps/${props.camp}/${props.data._id._id}`,
                                        { units: units },
                                        { withCredentials: true }
                                    )
                                    .then((r) => {
                                        alert("Donor metrics updated successfully");
                                        props.data.units = units;
                                        props.data.status = 1;
                                        setUnits(units);
                                        setStatus(1);
                                        setEdit(true);
                                    })
                                    .catch((e) => {
                                        alert("Logistics failure while updating donor metrics");
                                    });
                            }}
                            className="h-8 w-8 rounded-lg bg-success text-white-900 hover:bg-success/80 transition-all shadow-lg shadow-success/20 flex items-center justify-center"
                        >
                            <i className="fa-solid fa-check text-sm"></i>
                        </button>
                        <button 
                            onClick={() => setEdit(true)}
                            className="h-8 w-8 rounded-lg bg-error/10 text-error hover:bg-error hover:text-white-900 transition-all flex items-center justify-center"
                        >
                            <i className="fa-solid fa-xmark text-sm"></i>
                        </button>
                    </>
                )}
            </div>
        </div>

        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
                <i className="fa-solid fa-seedling text-success text-xs"></i>
                <span className="text-[10px] font-black text-secondary-500 uppercase tracking-widest">{props.data._id.foodGroup || "Perishable Supply"}</span>
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${status === 1 ? 'text-success' : 'text-warning'}`}>
                {status === 1 ? 'Verified' : 'Logistics Pending'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default CampsCheck;
