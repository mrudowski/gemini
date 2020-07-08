// import {createAction, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {TVerbMenu} from '../Poi';
// import {IRootState} from './store';
//
// export const incrementBy = createAction<number>('incrementBy');
// export const poiClicked = createAction<{x: number, y: number, verbs: TVerbMenu}>('poiClicked');
//
// interface IVerbMenuData {
//   active: boolean,
//   x: number,
//   y: number,
//   VerbMenu: TVerbMenu
// }
//
// interface IActionState {
//   VerbMenu: IVerbMenuData
// }
//
// const initialState: IActionState = {
//   VerbMenu: {
//     active: false,
//     x: 0,
//     y: 0,
//     VerbMenu: []
//   }
// };
//
// const actionSlice = createSlice({
//   name: 'action',
//   initialState,
//   reducers: {
//     showMenu: (state: IActionState, action: PayloadAction<{}>) => {
//
//     },
//     closeVerbMenu: (state: IActionState) => {
//       console.log('%c [mr] closeVerbMenu', 'background-color:Gold; color: black');
//
//       state.VerbMenu = initialState.VerbMenu;
//     },
//     // increment: state => state + 1,
//     // decrement: state => state - 1,
//     // addTodo(state, action) {
//     //   const { id, text } = action.payload
//     //   state.push({ id, text, completed: false })
//     // },
//     // toggleTodo(state, action) {
//     //   const todo = state.find(todo => todo.id === action.payload)
//     //   if (todo) {
//     //     todo.completed = !todo.completed
//     //   }
//     // }
//     // increment: (state, action: PayloadAction<number>) =>
//     //   state + action.payload
//   },
//   // "builder callback API", recommended for TypeScript users
//   extraReducers: builder => {
//     // builder.addCase(incrementBy, (state, action) => {
//     //   console.log('%c addCase wow', 'background-color:Gold; color: black', action, state);
//     //   return state + action.payload
//     // });
//     // TODO move to new reducer
//     builder.addCase(poiClicked, (state: IActionState, action) => {
//       const {
//         x,
//         y,
//         VerbMenu
//       } = action.payload
//       state.VerbMenu = {
//         active: true,
//         x,
//         y,
//         VerbMenu
//       }
//     });
//   }
// });
//
// export default actionSlice;
//
// export const getVerbMenu = createSelector(
//   [(state: IRootState) => state.action.VerbMenu],
//   VerbMenu => VerbMenu
// );
//
// // export const getVerbMenu2 = (state: IRootState) => state.action.VerbMenu;

export default {}
