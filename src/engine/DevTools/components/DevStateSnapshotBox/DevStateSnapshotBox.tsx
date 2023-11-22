import React from 'react';
import './styles/DevStateSnapshotBox.scss';
import {useTypedDispatch} from '../../../redux/store';
import {restoreGameFromSnapshotThunk} from '../../../redux/thunks';
import {STATE_SNAPSHOTS} from '../../../../game/stateSnapshots';

interface IDevLocationBox {}

const StateSnapshotOptions = () => (
  <>
    <option key="none" value="">
      -- select to replace --
    </option>
    {Object.keys(STATE_SNAPSHOTS).map(stateSnapshotId => (
      <option key={stateSnapshotId} value={stateSnapshotId}>
        {stateSnapshotId}
      </option>
    ))}
  </>
);

const DevStateSnapshotBox: React.FC<IDevLocationBox> = () => {
  const dispatch = useTypedDispatch();

  const loadSnapshot = e => {
    const snapshotId = e.target.value;
    if (snapshotId) {
      const stateSnapshot = STATE_SNAPSHOTS[snapshotId];
      if (stateSnapshot) {
        dispatch(restoreGameFromSnapshotThunk(stateSnapshot));
      }
    }
  };

  return (
    <div className="devPanel devStateSnapshotBox">
      <label>Replace state with snapshot</label>
      <select onChange={loadSnapshot} value="">
        <StateSnapshotOptions />
      </select>
    </div>
  );
};

export default DevStateSnapshotBox;
