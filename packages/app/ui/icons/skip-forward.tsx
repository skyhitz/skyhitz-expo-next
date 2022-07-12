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
      className="feather feather-skip-forward"
      viewBox="0 0 24 24"
    >
      <path d="M5 4L15 12 5 20 5 4z"></path>
      <path d="M19 5L19 19"></path>
    </svg>
  );
}

export default Icon;
