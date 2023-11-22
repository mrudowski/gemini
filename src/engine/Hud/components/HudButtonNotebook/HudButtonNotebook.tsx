import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/HudButtonNotebook.scss';
import HudButton from '../HudButton/HudButton';
import useSeekAttentionWhen from '../../../commons/hooks/useSeekAttentionWhen';
import {getIsNotebookTriggerActive} from '../../hudSlice';
import {getNotebookNotes} from '../../../notebook/notebookSlice';
import {hideNotebook, toggleNotebook} from '../../../notebook/notebookWidgetSlice';

interface IHudButtonNotebook {}

const HudButtonNotebook: React.FC<IHudButtonNotebook> = () => {
  const dispatch = useTypedDispatch();
  const notes = useTypedSelector(getNotebookNotes);
  const isNotebookTriggerActive = useTypedSelector(getIsNotebookTriggerActive);

  const seekAttention = useSeekAttentionWhen(notes);

  const showNotebookAction = (e: any) => {
    dispatch(toggleNotebook());
    e.preventDefault();
  };

  const closeNotebookAction = (e: any) => {
    dispatch(hideNotebook());
    e.preventDefault();
  };

  const hotKeysEnabled = {
    enabled: isNotebookTriggerActive,
  };

  useHotkeys('esc', closeNotebookAction, hotKeysEnabled);
  useHotkeys('n', showNotebookAction, hotKeysEnabled);

  return <HudButton className="hudButton--notebook" onClick={showNotebookAction} seekAttention={seekAttention} />;
};

export default HudButtonNotebook;
