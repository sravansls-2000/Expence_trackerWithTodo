import React from 'react';
import { useSelector } from 'react-redux';

const PostAuther = ({ userId }) => {
  const toggle = useSelector((state) => state.theme.mode);

  return (
    <span className={`${toggle ? 'text-white' : 'text-black'} font-bold`}>
      -- by auther name
    </span>
  );
};

export default PostAuther;
