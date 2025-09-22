import Link from "next/link";
import React from "react";

const AddBirthDayInput = () => {
  return (
    <Link href={"/profile"}>
    <div className="relative inline-flex justify-center items-center px-2 py-2 rounded-xl bg-background max-w-[350px] text-primary font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-4 h-4 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
        </div>
        <span>Complete Your Profile</span>
      </div>
      <div className="ml-2 mt-0.5 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
        Birth date missing
      </div>
    </div>
    </Link>
  );
};

export default AddBirthDayInput;
