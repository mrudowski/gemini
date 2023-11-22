import React, {useCallback, useEffect} from 'react';
import {batch} from 'react-redux';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import UIWidget from '../commons/components/UIWidget/UIWidget';
import {turnOffGemLock, turnOnGemLock} from '../redux/tempSlice';
import {getIsNotebookVisible, hideNotebook, setNotebookAsReady} from './notebookWidgetSlice';
import NotebookNotes from './components/NotebookNotes/NotebookNotes';
import './styles/Notebook.scss';

interface INotebook {}

const Notebook: React.FC<INotebook> = () => {
  const dispatch = useTypedDispatch();
  const isNotebookVisible = useTypedSelector(getIsNotebookVisible);

  useEffect(() => {
    if (isNotebookVisible) {
      dispatch(turnOnGemLock());
    }
  }, [isNotebookVisible, dispatch]);

  const onClose = useCallback(() => {
    dispatch(hideNotebook());
  }, [dispatch]);

  const onOpenComplete = useCallback(() => {
    batch(() => {
      dispatch(setNotebookAsReady(true));
      dispatch(turnOffGemLock());
    });
  }, [dispatch]);

  const onCloseComplete = useCallback(() => {
    // do nothing
  }, []);

  return (
    <UIWidget
      className="UIWidget--Notebook"
      isOpen={isNotebookVisible}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      onOpenComplete={onOpenComplete}
      type="notebook"
    >
      <NotebookNotes />
    </UIWidget>
  );
};

export default Notebook;
