import React, { useEffect, useState } from 'react';
import PostAuther from './PostAuther';
import TimeAgo from './TimeAgo';
import PieComponent from './PieComponent';
import { useDispatch, useSelector } from 'react-redux';
import UpdateModal from './UpdateModal';
import { deleteSingleNote } from '../../redux/slices/noteSlice';

const Posts = ({ post }) => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.theme.mode);
  const text = toggle ? 'text-white' : 'text-black';

  const deletePost = (e) => {
    dispatch(deleteSingleNote(post._id));
  };

  return (
    <div
      className={`rounded-lg  m-[20px]  ${
        toggle ? 'bg-[#1f262e] postBorder' : null
      } border-red-200 shadow-lg shadow-indigo-500/50`}
    >
      <div
        className={`grid grid-cols-2  ${
          toggle ? 'text-[#B0B8C4]' : 'text-green-600'
        }`}
      >
        <div className="mt-1 ml-2">
          <i className="fa-regular fa-clock mr-2"></i>
          <span>created at {post.date}</span>
        </div>
        <button
          className="flex justify-end mt-1 mr-2 text-red-800"
          title="delete"
          value={post.id}
          onClick={deletePost}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <UpdateModal post={post} />
      </div>
      <div className="flex justify-center items-center">
        <PieComponent post={post} text={toggle} />
      </div>
      <div className="grid grid-cols-2 mt-3 mb-4">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="income" className={`text-lg font-bold ${text}`}>
            Income
          </label>
          <span id="income" className="text-green-400 ml-[2px] font-medium">
            Rs.{post.income}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <label className={`text-lg font-bold ${text}`}>Expense</label>
          <span className="text-red-600 ml-[2px] font-medium">
            Rs.{post.expence}
          </span>
        </div>
      </div>

      <div className="flex">
        <label className={`${text} font-bold`}>Note : </label>
        <span
          className={`${
            toggle ? 'text-[#B0B8C4] ' : 'text-black '
          } font-semibold`}
        >
          {post.note}
        </span>
      </div>
      <div className="flex flex-row-reverse">
        <PostAuther userId={Number(post.userId)} />
      </div>
    </div>
  );
};

export default Posts;
