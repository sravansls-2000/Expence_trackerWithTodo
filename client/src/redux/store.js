import { configureStore } from '@reduxjs/toolkit';
import modeSlice from './slices/darkmodeSlice';
import rigisterReducer from './slices/rigisterSlice';
import LoaderReducer from './slices/LoaderSlice';
import noteReducer from './slices/noteSlice';

export const store = configureStore({
  reducer: {
    theme: modeSlice,
    Rigister: rigisterReducer,
    Loader: LoaderReducer,
    Note: noteReducer,
  },
});
