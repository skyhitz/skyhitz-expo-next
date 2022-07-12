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
      className="feather feather-skip-back"
      viewBox="0 0 24 24"
    >
      <path d="M19 20L9 12 19 4 19 20z"></path>
      <path d="M5 19L5 5"></path>
    </svg>
  );
}

export default Icon;
