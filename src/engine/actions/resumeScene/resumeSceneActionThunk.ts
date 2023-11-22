import {batch} from 'react-redux';
import {IThunk} from '../../redux/store';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';
import {resumeScene} from '../../redux/tempSlice';

export const resumeSceneAction = (): IThunk => dispatch => {
  batch(() => {
    dispatch(resumeScene());
    dispatch(endAction());
  });
};
