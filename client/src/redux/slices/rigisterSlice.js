import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { baseURL } from '../../Constants/baseURl';
import axios from 'axios';

export const registerUserAction = createAsyncThunk(
  'user/register',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `${baseURL}/users/rigister`,
        payload,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login action
export const loginUserAction = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        payload,
        config
      );
      console.log(data);
      //Save user into localstorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //Save user into localstorage
      localStorage.removeItem('userInfo');
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : undefined;

export const rigisterSlice = createSlice({
  name: 'users',
  initialState: {
    userAuth: userLoginFromStorage,
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle success state
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.requestStatus;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.userAuth = undefined;
      state.userLoading = false;
      state.success = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.userLoading = false;
      state.success = true;
    });
  },
});

export default rigisterSlice.reducer;
