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
      className="feather feather-circle"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
}

export default Icon;
