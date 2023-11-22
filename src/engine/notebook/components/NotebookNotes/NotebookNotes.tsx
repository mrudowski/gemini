import React from 'react';
import './styles/NotebookNotes.scss';
import classNames from 'classnames';
import backgroundImage from '../../assets/images/background.jpg';
import bookmark01Image from '../../assets/images/bookmark01.png';
import bookmark02Image from '../../assets/images/bookmark02.png';
import bookmark03Image from '../../assets/images/bookmark03.png';
import bookmarkDark01Image from '../../assets/images/bookmarkDark01.png';
import bookmarkDark02Image from '../../assets/images/bookmarkDark02.png';
import bookmarkDark03Image from '../../assets/images/bookmarkDark03.png';
import GameNotebook from '../../../../game/notebook/Notebook';
import {useGlobalState} from '../../../stateHooks/stateHooks';
import PreloadImages from '../../../Preload/PreloadImages';
import {useTypedDispatch} from '../../../redux/store';
import {setGlobalMultiState} from '../../../World/worldSlice';
import {INotebookPageId} from '../../types';
import NotebookTab from '../NotebookTab/NotebookTab';

const imageToPreload = [
  backgroundImage,
  bookmark01Image,
  bookmark02Image,
  bookmark03Image,
  bookmarkDark01Image,
  bookmarkDark02Image,
  bookmarkDark03Image,
];

interface INotebookNotes {}

const NotebookNotes: React.FC<INotebookNotes> = () => {
  const dispatch = useTypedDispatch();
  const {organizedNotebook, organizedNotebookActivePage} = useGlobalState();

  const changePage = (pageId: INotebookPageId) => {
    dispatch(setGlobalMultiState({stateToUpdate: {organizedNotebookActivePage: pageId}}));
  };

  return (
    <div
      className={classNames(
        'NotebookNotesWrapper',
        organizedNotebook && 'NotebookNotesWrapper--organized',
        `NotebookNotesWrapper--${organizedNotebookActivePage}`
      )}
    >
      <PreloadImages images={imageToPreload} />
      <div className="NotebookTabs">
        <NotebookTab id="todoList" active={organizedNotebookActivePage === 'todoList'} onSelect={changePage} />
        <NotebookTab
          id="culinaryRecipes"
          active={organizedNotebookActivePage === 'culinaryRecipes'}
          onSelect={changePage}
        />
        <NotebookTab id="memories" active={organizedNotebookActivePage === 'memories'} onSelect={changePage} />
      </div>
      <div className="NotebookTabsCut" />
      <div className="NotebookNotes">
        <GameNotebook />
      </div>
    </div>
  );
};

export default NotebookNotes;
