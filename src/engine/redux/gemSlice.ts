import {createSlice} from '@reduxjs/toolkit';

const gemSlice = createSlice({
  name: 'gem',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});

export default gemSlice;
