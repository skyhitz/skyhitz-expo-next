import React from 'react';

function Icon({
  size = 24,
  fill = false,
  color,
}: {
  size: number;
  fill?: boolean;
  color: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ? (color ? color : 'currentColor') : 'none'}
      stroke={fill ? 'none' : color ? color : 'currentColor'}
      className="h-6 w-6"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      ></path>
    </svg>
  );
}

export default Icon;
