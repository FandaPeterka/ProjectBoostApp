import React from 'react';

const RoundIconButton = ({ Icon, onClick, tooltip }) => {
  return (
    <button onClick={onClick} className="icon-button mt-[40px] flex items-center justify-center w-12 h-12 rounded-full bg-black bg-opacity-50 text-white border-2 border-white border-opacity-50 cursor-pointer hover:bg-opacity-70 hover:border-opacity-70 transform hover:scale-110 transition-all duration-300 ease-in-out" title={tooltip}>
      <Icon className="text-xl" />
    </button>
  );
};

export default RoundIconButton;