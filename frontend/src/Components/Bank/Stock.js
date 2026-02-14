import React, { useState, useEffect } from "react";
import axios from "../Api";

const Stock = () => {
  const [data, setData] = useState([]);
  //useEffect hook is used to fetch stock data from a server when the component mounts.
  //Component Mounts: When the component is first rendered, the useEffect hook runs.
  //Data Fetch: It sends a GET request to /bank/getStock to fetch the stock data.
  //
  useEffect(() => {
    axios
      .get("/bank/getStock")
      .then((r) => {
        setData(r.data.stock); //Update State: If the request is successful, it updates the state with the retrieved stock data.
      })
      .catch((err) => {
        alert("Something went wrong in Bank Stock.js"); //Error Handling: If there is an error, it alerts the user
      });
  }, []);
  return (
    <div className="w-full space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-secondary-900 dark:text-white">Inventory Management</h2>
          <p className="text-secondary-500 font-medium mt-1">Real-time stock levels of verified food categories.</p>
        </div>
        <div className="flex items-center space-x-3 bg-success/10 text-success px-6 py-2.5 rounded-2xl border border-success/20 font-bold text-sm">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            <span>Live System Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data && Object.keys(data).length > 0 ? (
          Object.keys(data).map((e, i) => {
            const colors = [
                "from-blue-500 to-indigo-600",
                "from-emerald-500 to-teal-600",
                "from-amber-500 to-orange-600",
                "from-rose-500 to-pink-600",
                "from-violet-500 to-purple-600",
                "from-primary-500 to-secondary-600"
            ];
            const colorClass = colors[i % colors.length];

            return (
              <div 
                key={e} 
                className="group glass dark:glass-dark rounded-[2.5rem] p-8 border border-white/20 shadow-premium hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 overflow-hidden relative"
              >
                {/* Background Accent */}
                <div className={`absolute -right-10 -top-10 h-32 w-32 bg-gradient-to-br ${colorClass} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity`}></div>
                
                <div className="relative flex flex-col items-center text-center">
                    <div className={`h-20 w-20 rounded-[1.8rem] bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6`}>
                         <i className={`fa-solid ${
                             e.toLowerCase().includes('grain') ? 'fa-wheat-awn' : 
                             e.toLowerCase().includes('veg') ? 'fa-leaf' :
                             e.toLowerCase().includes('fruit') ? 'fa-lemon' :
                             e.toLowerCase().includes('milk') || e.toLowerCase().includes('dairy') ? 'fa-cow' :
                             e.toLowerCase().includes('cooked') ? 'fa-bowl-food' : 'fa-box'
                         }`}></i>
                    </div>

                    <div className="space-y-1">
                        <code className="text-[10px] font-black tracking-[0.2em] text-secondary-400 uppercase">{e}</code>
                        <h3 className="text-4xl font-display font-black text-secondary-900 dark:text-white">
                            {data[e]}<span className="text-lg font-medium ml-1">kg</span>
                        </h3>
                    </div>

                    <div className="w-full mt-8 pt-6 border-t border-secondary-100 dark:border-secondary-800 flex justify-between items-center px-2">
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[9px] font-bold text-secondary-400 uppercase tracking-wider mb-1">Status</span>
                            <span className="text-xs font-black text-success uppercase">Optimal</span>
                        </div>
                        <div className="h-8 w-8 rounded-xl bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-secondary-400 hover:text-primary-600 transition-colors cursor-pointer">
                            <i className="fa-solid fa-arrow-right-long text-xs"></i>
                        </div>
                    </div>
                </div>
              </div>
            );
          })
        ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center space-y-6 glass dark:glass-dark rounded-[3rem] border-2 border-dashed border-secondary-200 dark:border-secondary-800">
                <div className="h-24 w-24 bg-secondary-50 dark:bg-secondary-800 rounded-full flex items-center justify-center text-4xl text-secondary-200">
                    <i className="fa-solid fa-cubes-stacked"></i>
                </div>
                <div>
                     <h3 className="text-2xl font-bold text-secondary-500">Inventory is Empty</h3>
                     <p className="text-secondary-400 max-w-xs mx-auto">Verified stock entries will appear here once donations are processed.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
