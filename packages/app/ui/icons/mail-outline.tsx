import React from 'react';

function Icon({ size = 24, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={color ? color : 'currentColor'}
        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
      />
    </svg>
  );
}

export default Icon;
