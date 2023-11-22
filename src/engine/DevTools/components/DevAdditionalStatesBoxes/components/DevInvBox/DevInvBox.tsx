import React from 'react';
import './styles/DevInvBox.scss';
import {useTypedDispatch, useTypedSelector} from '../../../../../redux/store';
import {getIsItemInInventoryMap} from '../../../../../Inventory/inventorySlice';
import {parseState} from '../utils';

interface IDevInvBox {}

const DevInvBox: React.FC<IDevInvBox> = () => {
  const items = useTypedSelector(getIsItemInInventoryMap);
  const dispatch = useTypedDispatch();

  return (
    <div className="DevInvBox">
      <div className="devStateList">{parseState('inventory', items, dispatch)}</div>
    </div>
  );
};

export default DevInvBox;
