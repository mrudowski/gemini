import React from 'react';
import './styles/NotebookPage.scss';
import classNames from 'classnames';
import {INotebookPageId} from '../../types';
import {useGlobalState} from '../../../stateHooks/stateHooks';

interface INotebookPage {
  type: INotebookPageId | 'looseNotes';
}

const NotebookPage: React.FC<INotebookPage> = ({type, children}) => {
  const {organizedNotebook} = useGlobalState();

  return (
    <div
      className={classNames(
        'NotebookPage',
        `NotebookPage--${type}`,
        type !== 'looseNotes' && organizedNotebook && 'NotebookPage--gridLayout'
      )}
    >
      {children}
    </div>
  );
};

export default NotebookPage;
