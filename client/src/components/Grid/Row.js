import React from "react";
import './grid.css';

export function Row({ id, className, children }) {
   return (
      <div
         id={id}
         className={className || "row"}
      >
         {children}
      </div>
   );
}