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
      className="feather feather-shuffle"
      viewBox="0 0 24 24"
    >
      <path d="M16 3L21 3 21 8"></path>
      <path d="M4 20L21 3"></path>
      <path d="M21 16L21 21 16 21"></path>
      <path d="M15 15L21 21"></path>
      <path d="M4 4L9 9"></path>
    </svg>
  );
}

export default Icon;
