import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import './styles/Item.scss';
import {useTypedSelector} from '../../../redux/store';
import {IVerb} from '../../../VerbMenu/verbMenuSlice';
import Poi from '../../../Poi/Poi';
import {getItemIndex, IInventoryItemId} from '../../inventorySlice';
import {TImagePath} from '../../../commons/types/types';
import {getUseWithAction} from '../../useWithActionSlice';
import {getCurrentPoiId} from '../../../redux/tempSliceSelectors';

interface IItem {
  id: IInventoryItemId;
  image: TImagePath;
  verbs: IVerb[];
  useWith?: boolean;
}

const ITEM_SIZE_WITH_SPACE_H = 142;
const ITEM_SIZE_WITH_SPACE_V = 138;
const ITEMS_IN_ROW = 5;
const HERBS_LEFT = 6 * ITEM_SIZE_WITH_SPACE_H - 30;
const HERBS_TOP = 60;

const Item: React.FC<IItem> = ({id, verbs, image, useWith}) => {
  //const dispatch = useTypedDispatch();
  const itemIndex = useTypedSelector(state => getItemIndex(state, id));
  const when = itemIndex !== -1;
  const useWithAction = useTypedSelector(getUseWithAction);
  const currentPoiId = useTypedSelector(getCurrentPoiId);
  const useWithActive = useWithAction && currentPoiId === id;

  const classes = classNames('Item', useWith && 'Item--useWith', useWith && useWithActive && 'Item--useWith--active');

  let styles: CSSProperties;
  if (itemIndex > 999) {
    styles = {
      left: HERBS_LEFT,
      top: HERBS_TOP + (itemIndex - 1000) * ITEM_SIZE_WITH_SPACE_V,
    };
  } else {
    styles = {
      left: (itemIndex % ITEMS_IN_ROW) * ITEM_SIZE_WITH_SPACE_H,
      top: Math.floor(itemIndex / ITEMS_IN_ROW) * ITEM_SIZE_WITH_SPACE_V,
    };
  }

  return <Poi id={id} verbs={verbs} image={image} style={styles} className={classes} when={when} />;
};

export default Item;
