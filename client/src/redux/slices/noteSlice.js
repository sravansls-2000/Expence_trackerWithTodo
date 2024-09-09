import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { baseURL } from '../../Constants/baseURl';
import axios from 'axios';

export const resetnoteCreated = createAction('note/created/reset');
export const resetNoteDelete = createAction('note/delete/reset');

//creating notes
export const createNotes = createAsyncThunk(
  'posts/Notes',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = axios.post(`${baseURL}/posts/Notes`, payload, config);
      dispatch(resetnoteCreated());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// updating the Single Note
export const updateNote = createAsyncThunk('updateNotes', async (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(payload);
  try {
    const { data } = await axios.patch(
      `${baseURL}/posts/update/:${payload.id}`,
      payload,
      config
    );

    return data;
  } catch (error) {}
});
//fetching  notes

export const fetchNotes = createAsyncThunk('fetchNotes', async (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(payload);
  try {
    const { data } = await axios.get(`${baseURL}/posts/:${payload}`, config);

    return data;
  } catch (error) {}
});

export const deleteSingleNote = createAsyncThunk(
  'deleteSingleNote',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(payload);
    try {
      const { data } = await axios.delete(
        `${baseURL}/posts/:${payload}`,
        config
      );
      dispatch(resetNoteDelete());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const noteSlice = createSlice({
  name: 'Notes',
  initialState: {},
  extraReducers(builder) {
    // creating notes
    builder
      .addCase(createNotes.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(resetnoteCreated, (state, action) => {
        state.isnoteCreated = true;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.loading = true;
        state.noteCreated = action?.payload;
        state.isnoteCreated = true;
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

    //fetching the notes for a particulaer user

    builder.addCase(fetchNotes.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = true;
      state.noteList = action?.payload;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
    //deleting note
    builder.addCase(deleteSingleNote.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetNoteDelete, (state, action) => {
      state.isIncDeleted = true;
    });
    builder.addCase(deleteSingleNote.fulfilled, (state, action) => {
      state.loading = true;
      state.noteDeleted = action.payload;
      state.isnoteDeleted = true;
    });
    builder.addCase(deleteSingleNote.rejected, (state, action) => {
      state.loading = false;
    });

    //updating the notes for a partuculer user
    builder
      .addCase(updateNote.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = true;
        state.Updated = action?.payload;
        state.isnoteUpdated = true;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default noteSlice.reducer;
