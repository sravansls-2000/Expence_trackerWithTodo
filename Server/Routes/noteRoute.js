import express from 'express';
import {
  createNoteCtrl,
  deleteSingleNote,
  fetchNotes,
  updateNotes,
} from '../controllers/noteController.js';

const noteRoute = express.Router();

noteRoute.post('/Notes', createNoteCtrl);
noteRoute.get('/:id', fetchNotes);
noteRoute.delete('/:id', deleteSingleNote);
noteRoute.patch('/update/:id', updateNotes);
export default noteRoute;
