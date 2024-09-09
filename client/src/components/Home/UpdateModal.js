import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../redux/slices/noteSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '#4b0082',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({ post }) {
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState(post.income);
  const [id, setID] = useState(post._id);

  const [expence, setExpence] = useState(post.expence);
  const [date, setDate] = useState(post.date);
  const [note, setNote] = useState(post.note);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateNotes = () => {
    dispatch(updateNote({ income, expence, date, note, id }));
  };
  return (
    <div>
      <button
        className="flex justify-end mt-1 mr-2 text-green-800"
        title="Edit"
        onClick={handleOpen}
      >
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="grid gap-2 grid-flow-row">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="flex justify-center"
          >
            Update Note
          </Typography>
          <input
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
            type="number"
            value={income}
            onChange={(e) => {
              setIncome(Number(e.target.value));
            }}
          />
          <input
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
            type="number"
            value={expence}
            onChange={(e) => {
              setExpence(e.target.value);
            }}
          />

          <input
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <input
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <div className="flex flex-row justify-end gap-4">
            <button
              onClick={handleClose}
              className="w-[100px] h-[40px] inline-flex justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-black shadow-sm"
            >
              cancel
            </button>
            <button
              className="w-[100px] ml-3 h-[40px] inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={updateNotes}
            >
              submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
