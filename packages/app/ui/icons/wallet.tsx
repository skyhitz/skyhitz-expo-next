import React from 'react';

function Icon({ size = 24, color }) {
  return (
    <svg
      aria-hidden="true"
      className="MuiSvgIcon-root jss179"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color ? color : 'currentColor'}
    >
      <path d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
    </svg>
  );
}

export default Icon;
