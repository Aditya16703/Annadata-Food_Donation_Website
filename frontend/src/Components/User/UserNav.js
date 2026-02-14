import React from "react";
import { NavLink } from "react-router-dom";

// Main UserNav component
const UserNav = ({ data }) => {
  return (
    <nav className="h-full flex flex-col py-8 px-4 space-y-2 glass dark:glass-dark border-r border-white-900/10 shadow-premium">
      <div className="px-4 mb-10">
        <h2 className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em]">Dashboard</h2>
      </div>
      
      <div className="flex-1 space-y-1">
        {data.map((e) => (
          <NavLink
            key={e.to}
            to={e.to}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-primary-600 text-white-900 shadow-lg shadow-primary-500/30 translate-x-1"
                  : "text-secondary-600 dark:text-white-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:text-primary-600"
              }`
            }
          >
            <div className="w-6 flex justify-center">
                <i className={`fa-solid ${e.icon} text-lg transition-transform group-hover:scale-110`}></i>
            </div>
            <span className="font-bold text-sm tracking-tight">{e.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-secondary-100 dark:border-secondary-800 px-4">
        <p className="text-[10px] text-secondary-400 font-bold uppercase tracking-widest text-center">Annadata v2.0</p>
      </div>
    </nav>
  );
};

export default UserNav;
