import React from 'react';
import classNames from 'classnames';
import styles from './styles/SaveGameSlot.module.scss';
import {ISceneId} from '../../scene/Scene/types';
import {useTranslation} from '../../translation';
import {ISaveGameSlotId} from '../../saveGameStorage/types';

interface ISaveGameSlot {
  id: ISaveGameSlotId;
  title: string;
  date: string;
  sceneId: ISceneId | '';
  onClick?: (id: ISaveGameSlotId, title: string) => void;
  className?: string;
}

const SaveGameSlot: React.FC<ISaveGameSlot> = ({id, title, date, sceneId, onClick, className}) => {
  const t = useTranslation();

  const emptyText = t.ui.saveGameSlot.empty;

  const classes = classNames(styles.root, !onClick ? styles.disabled : 'gem-hotspot', className);
  return (
    <div
      className={classes}
      {...(onClick && {
        onClick: () => {
          onClick(id, title);
        },
      })}
    >
      <div className={styles.thumb}>{sceneId && <div className={`saveThumb saveThumb--${sceneId}`} />}</div>
      <div className={styles.title}>{title || emptyText}</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export default SaveGameSlot;
