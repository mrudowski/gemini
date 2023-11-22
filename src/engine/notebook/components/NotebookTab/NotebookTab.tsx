import React from 'react';
import classNames from 'classnames';
import {useTranslation} from '../../../translation';
import {INotebookPageId} from '../../types';

interface INotebookTab {
  id: INotebookPageId;
  active: boolean;
  onSelect: (id: INotebookPageId) => void;
}

const NotebookTab: React.FC<INotebookTab> = ({id, active, onSelect}) => {
  const t = useTranslation();

  return (
    <div
      className={classNames('NotebookTab', active ? 'NotebookTab--active' : 'gem-hotspot', `NotebookTab--${id}`)}
      {...(!active && {onClick: () => onSelect(id)})}
    >
      {t.notebook.tabs[id]}
    </div>
  );
};

export default NotebookTab;
