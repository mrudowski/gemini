import React from 'react';
import {IScriptMetaWrapper} from '../../../scene/Scene/types';
import useSimpleOnEnter from '../../../commons/hooks/useSimpleOnEnter';
import {useTypedSelector} from '../../../redux/store';
import {getIsInventoryReady} from '../../inventoryWidgetSlice';

interface IInventoryDefinition {
  onEnter?: IScriptMetaWrapper[];
}

const InventoryDefinition: React.FC<IInventoryDefinition> = ({children, onEnter}) => {
  const isInventoryReady = useTypedSelector(getIsInventoryReady);

  useSimpleOnEnter({
    onEnter,
    ready: isInventoryReady,
  });

  return <>{children}</>;
};

export default InventoryDefinition;
