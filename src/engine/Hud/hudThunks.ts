import {batch} from 'react-redux';
import {IThunk} from '../redux/store';
import {IHudId, showHudElement} from './hudSlice';

const isVisible = (hudToHide: boolean | IHudId[], hudId: IHudId) => {
  if (typeof hudToHide === 'boolean') {
    return !hudToHide;
  }
  return !hudToHide.includes(hudId);
};

export const showHudThunk =
  (hudToHide: boolean | IHudId[]): IThunk =>
  dispatch => {
    // (dispatch, getState) => {
    //   const state = getState();

    batch(() => {
      dispatch(showHudElement({hudElement: 'inGameMenu', visible: isVisible(hudToHide, 'inGameMenu')}));
      dispatch(showHudElement({hudElement: 'inventory', visible: isVisible(hudToHide, 'inventory')}));
      dispatch(showHudElement({hudElement: 'showPois', visible: isVisible(hudToHide, 'showPois')}));
      dispatch(showHudElement({hudElement: 'elmHazelSwitch', visible: isVisible(hudToHide, 'elmHazelSwitch')}));
      dispatch(showHudElement({hudElement: 'notebook', visible: isVisible(hudToHide, 'notebook')}));
      dispatch(showHudElement({hudElement: 'herbarium', visible: isVisible(hudToHide, 'herbarium')}));
    });
  };
