import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotes } from '../../redux/slices/noteSlice';

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

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState(0);
  const [expence, setExpence] = useState(0);
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state?.theme?.mode);
  const user = useSelector((state) => state.Rigister.userAuth._id);

  const onSaveClick = () => {
    dispatch(createNotes({ income, expence, date, note, user }));
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ color: `${toggle ? '#B0B8C4' : 'text-blue-600'}` }}
      >
        Add Note
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="grid grid-cols-1 gap-4">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className=""
          >
            Add Note
          </Typography>
          <input
            placeholder="income"
            type="number"
            onChange={(e) => {
              setIncome(parseInt(e.target.value));
            }}
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
          />
          <input
            placeholder="expence"
            type="number"
            onChange={(e) => {
              setExpence(parseInt(e.target.value));
            }}
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
          />
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
          />
          <input
            placeholder="Note"
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className=" w-[300px] h-[40px] rounded-md border-solid border-2 border-indigo-500"
          />
          <div>
            <button
              onClick={handleClose}
              className="w-[100px] h-[40px] inline-flex justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-black shadow-sm"
            >
              cancel
            </button>
            <button
              onClick={onSaveClick}
              className="w-[100px] ml-3 h-[40px] inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>{' '}
        </Box>
      </Modal>
    </div>
  );
}
