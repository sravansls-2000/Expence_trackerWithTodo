import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Posts from './Posts';
import Loder from '../ReUseComponents/Loder';
import { fetchNotes } from '../../redux/slices/noteSlice';
import Success from '../ReUseComponents/Success';
import Error from '../ReUseComponents/Error';
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.theme.mode);
  const loder = useSelector((state) => state.Note.loading);
  const Notes = useSelector((state) => state.Note.noteList);
  const { isnoteCreated, isnoteDeleted, isnoteUpdated } = useSelector(
    (state) => state.Note
  );
  const user = useSelector((state) => state.Rigister.userAuth);

  useEffect(() => {
    dispatch(fetchNotes(user._id));
  }, [isnoteCreated, isnoteDeleted, isnoteUpdated, dispatch]);

  let content;
  if (!loder) {
    content = <Loder />;
  } else if (loder) {
    content = Notes.map((post, index) => <Posts key={index} post={post} />);
  }

  return (
    <>
      <Navbar />

      {Notes ? (
        <div
          className={`${
            !loder
              ? 'flex items-center justify-center h-screen'
              : 'grid grid-cols-2 gap-4 mt-4'
          } `}
        >
          {content}
        </div>
      ) : (
        <div
          className={`${
            toggle ? 'text-[white]' : 'text-[black]'
          } flex flex-col justify-center items-center`}
        >
          {' '}
          Add Notes
        </div>
      )}
    </>
  );
}

export default Home;
