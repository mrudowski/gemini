import React from 'react';
import InventoryDefinition from '../../engine/Inventory/components/InventoryDefinition/InventoryDefinition';
import BottleWine from './items/BottleWine';

const Inventory = () => {
  return (
    <InventoryDefinition>
      <BottleWine />
    </InventoryDefinition>
  );
};

export default Inventory;
