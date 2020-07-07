import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TActionMenu} from '../Poi';

export const incrementBy = createAction<number>('incrementBy');
export const poiClicked = createAction<{x: number, y: number, actionMenu: TActionMenu}>('poiClicked');

interface IActionState {
  actionMenu: {}
}

const initialState: IActionState = {
  actionMenu: {}
};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    showMenu: (state: IActionState, action: PayloadAction<{}>) => {

    },
    // increment: state => state + 1,
    // decrement: state => state - 1,
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
    // builder.addCase(incrementBy, (state, action) => {
    //   console.log('%c addCase wow', 'background-color:Gold; color: black', action, state);
    //   return state + action.payload
    // });
    // TODO move to new reducer
    builder.addCase(poiClicked, (state: IActionState, action) => {
      const {
        x,
        y,
        actionMenu
      } = action.payload
      state.actionMenu = {
        active: true,
        x,
        y,
        actionMenu
      }
    });
  }
});

export default actionSlice;
