import React from 'react';
import './styles/InventoryItems.scss';
import GameInventory from '../../../../game/inventory/Inventory';

interface IInventoryItems {}

const InventoryItems: React.FC<IInventoryItems> = () => {
  return (
    <div className="InventoryItems">
      <GameInventory />
    </div>
  );
};

export default InventoryItems;
