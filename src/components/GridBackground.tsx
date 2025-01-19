import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div
      className={`absolute inset-0 bg-[url('../assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]`}
    />
  );
}

export default GridBackground;
