import {createSelector} from '@reduxjs/toolkit';
import {IRootState} from '../redux/store';

export const getVerbMenuData = createSelector(
  [(state: IRootState) => state.verbMenu.verbMenuData],
  verbMenuData => verbMenuData
);
