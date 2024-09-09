import React from 'react';

function Success({ isVisible }) {
  return (
    <div
      className={`w-full fade ${
        isVisible ? 'visible' : ''
      } h-[50px] flex justify-center col-span-3 items-center bg-[#4caf50] border-solid border-1 border-[white] rounded-xl text-[black]`}
    >
      Successfully register you can login Now
    </div>
  );
}

export default Success;
