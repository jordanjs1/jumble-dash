import React from "react";
import './grid.css';

export function Col({ padding, id, className, children }) {
   return (
      <div
         id={id}
         className={className}
         style={{
            padding: `${padding || "0"}`
         }}
      >
         {children}
      </div>
   );
}
