import {createAction, createSlice} from '@reduxjs/toolkit';

export const incrementBy = createAction<number>('incrementBy');

const actionSlice = createSlice({
  name: 'action',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    // addTodo(state, action) {
    //   const { id, text } = action.payload
    //   state.push({ id, text, completed: false })
    // },
    // toggleTodo(state, action) {
    //   const todo = state.find(todo => todo.id === action.payload)
    //   if (todo) {
    //     todo.completed = !todo.completed
    //   }
    // }
    // increment: (state, action: PayloadAction<number>) =>
    //   state + action.payload
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: builder => {
    builder.addCase(incrementBy, (state, action) => {
      console.log('%c addCase wow', 'background-color:Gold; color: black', action, state);
      return state + action.payload
    })
  }
});

export default actionSlice;
