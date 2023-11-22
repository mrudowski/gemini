import {batch} from 'react-redux';
import {IStartCustomAction} from './custom';
import {CUSTOM_ACTIONS_THUNKS} from '../../../game/customActions';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';

export const startCustomAction: IStartCustomAction = action => dispatch => {
  const {
    payload: {action: thunkName},
  } = action;

  batch(() => {
    /**
     * - or we should do it (endAction) manually inside our custom thunk
     * - better not because we use it outside script to (onBeforeEnter > executeScriptAsOneSingleNotBlockingAction)
     *
     * TODO why here - we had a reason but to not put it at the end...
     *  - orders matters in batch, so it's not so batch...???
     *
     * NOT related any more? we have queue now!
     * Not really related to above but for now we cannot have
     * custom Action with setScript and continue the old one, thing to add?
     */
    dispatch(endAction()); // TODO why here - put it at the end
    dispatch(CUSTOM_ACTIONS_THUNKS[thunkName]());
  });
};
