import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({ title, items = [], links = [] }) => {
  const buttonClass =
    "px-6 py-2 font-semibold text-base rounded-full shadow-sm bg-primary-600 text-white-900 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]";

  const itemClass =
    "block py-2 px-4 text-sm text-secondary-700 dark:text-white-200 hover:bg-primary-600 hover:text-white-900 dark:hover:bg-primary-500 transition-colors rounded-md";

  return (
    <div className="group inline-block relative">
      <button className="flex items-center space-x-1 outline-none">
        <span className={buttonClass}>
          {title}
          <i className="fa-solid fa-chevron-down ml-2 text-xs"></i>
        </span>
      </button>

      <ul className="ml-6 px-2 py-2 absolute hidden text-gray-700 pt-1 z-10 group-hover:block w-max bg-white-100 dark:bg-secondary-900 rounded-tl-lg rounded-b-lg shadow-lg border border-secondary-100 dark:border-secondary-800">
        {items.map((item, i) => (
          <li key={i}>
            <Link to={links[i]} className={itemClass}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
