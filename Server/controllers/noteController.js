import Note from '../models/note.js';

const createNoteCtrl = async (req, res) => {
  const { income, expence, note, date, user } = req.body;

  try {
    const newNote = await Note.create({
      income,
      expence,
      note,
      date,
      user,
    });
    res.json(newNote);
  } catch (error) {
    res.json(error);
  }
};

const fetchNotes = async (req, res) => {
  const userid = req.params.id.slice(1);

  try {
    const fetchNoteDetails = await Note.find({
      user: userid,
    });

    res.json(fetchNoteDetails);
  } catch (error) {
    res.json(error);
  }
};

const updateNotes = async (req, res) => {
  const userid = req.params.id.slice(1);
  console.log(userid, req.body);

  try {
    const updateNoteDetails = await Note.findOneAndUpdate(
      {
        _id: userid,
      },
      req.body
    );

    res.json(updateNoteDetails);
  } catch (error) {
    res.json(error);
  }
};

const deleteSingleNote = async (req, res) => {
  const noteId = req.params.id.slice(1);

  try {
    const deleteOne = await Note.deleteOne({
      _id: noteId,
    });
    res.json(deleteOne);
  } catch (error) {
    res.json(error);
  }
};
export { createNoteCtrl, fetchNotes, deleteSingleNote, updateNotes };
