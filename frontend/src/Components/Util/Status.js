import React, { useState } from "react";
import axios from "../Api";

const Status = (props) => {
  const [status, setStatus] = useState(props.status);

  const choices = [
    "Pending",
    "Approved",
    "Denied",
    props.handle === "donations" ? "Donated" : "Completed",
  ];

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    try {
      if (newStatus === "Donated") {
        await axios.put("/bank/updateStock", {
          foodGroup: props.foodGroup,
          units: props.units,
        });
        alert("Stock Updated");
      } else if (newStatus === "Completed") {
        await axios.put("/bank/deleteStock", {
          foodGroup: props.foodGroup,
          units: props.units,
        });
        alert("Stock Updated");
      }

      await axios.put(`/bank/${props.handle}`, {
        id: props.id,
        status: newStatus,
      });

      setStatus(newStatus);
      props.setId(props.i);
      props.setStatus(newStatus);
    } catch (error) {
      alert(
        error.response?.status === 404
          ? "Not Enough Food"
          : "Something went wrong"
      );
    }
  };

  // Tailwind classes for each status, including dark mode support
  const statusClass =
    status === "Pending"
      ? "border-metal text-metal dark:border-gray-400 dark:text-gray-300"
      : status === "Approved"
      ? "border-yellowX text-yellowX dark:border-yellow-400 dark:text-yellow-300"
      : status === "Denied"
      ? "border-red text-red dark:border-red-600 dark:text-red-400"
      : "border-green text-green dark:border-green-500 dark:text-green-300";

  return (
    <div className="relative group/status min-w-[120px]">
      <select
        value={status}
        onChange={handleChange}
        disabled={["Denied", "Donated", "Completed"].includes(status)}
        className={`w-full appearance-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border-2 transition-all duration-300 cursor-pointer shadow-sm ${
          status === "Pending"
            ? "bg-secondary-50 border-secondary-200 text-secondary-500 hover:border-secondary-300"
            : status === "Approved"
            ? "bg-warning/10 border-warning/20 text-warning hover:border-warning/40 shadow-warning/5"
            : status === "Denied"
            ? "bg-error/10 border-error/20 text-error disabled:opacity-80 disabled:cursor-not-allowed"
            : "bg-success/10 border-success/20 text-success disabled:opacity-80 disabled:cursor-not-allowed"
        }`}
      >
        {choices.map((e) => (
          <option key={e} value={e} className="dark:bg-secondary-900 text-sm font-sans uppercase font-bold">
            {e}
          </option>
        ))}
      </select>
      
      {!["Denied", "Donated", "Completed"].includes(status) && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] opacity-60 group-hover/status:opacity-100 transition-opacity">
            <i className="fa-solid fa-chevron-down"></i>
        </div>
      )}
    </div>
  );
};

export default Status;
