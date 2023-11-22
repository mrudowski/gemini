import React from 'react';
import {useTranslation} from '../../../engine/translation';
import INVENTORY_ITEMS from '../inventoryItems';
import ACTIONS from '../../../engine/actions/actions';
import Item from '../../../engine/Inventory/components/Item/Item';
import image from '../assets/images/bottleWine.png';

const BottleWine = () => {
  const t = useTranslation();

  return (
    <Item
      id={INVENTORY_ITEMS.bottleWine}
      image={image}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.inventory.bottleWine.examine})],
        },
      ]}
    />
  );
};

export default BottleWine;
