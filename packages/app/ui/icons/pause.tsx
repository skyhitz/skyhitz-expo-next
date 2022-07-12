import React from 'react';

function Icon({ size = 24, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color ? color : 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-pause"
      viewBox="0 0 24 24"
    >
      <path d="M6 4H10V20H6z"></path>
      <path d="M14 4H18V20H14z"></path>
    </svg>
  );
}

export default Icon;
