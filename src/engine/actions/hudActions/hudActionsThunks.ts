import {batch} from 'react-redux';
import {IThunk} from '../../redux/store';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';
import {showHudThunk} from '../../Hud/hudThunks';

export const startShowHudAction = (): IThunk => dispatch => {
  batch(() => {
    dispatch(showHudThunk(false));
    dispatch(endAction());
  });
};

export const startHideHudAction = (): IThunk => dispatch => {
  batch(() => {
    dispatch(showHudThunk(true));
    dispatch(endAction());
  });
};
