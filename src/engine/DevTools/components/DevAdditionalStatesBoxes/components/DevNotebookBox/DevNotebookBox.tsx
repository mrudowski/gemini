import React from 'react';
import './styles/DevNotebookBox.scss';
import {useTypedDispatch, useTypedSelector} from '../../../../../redux/store';
import {getIsNoteInNotebookMap} from '../../../../../notebook/notebookSlice';
import {parseState} from '../utils';

interface IDevNotebookBox {}

const DevNotebookBox: React.FC<IDevNotebookBox> = () => {
  const notes = useTypedSelector(getIsNoteInNotebookMap);
  const dispatch = useTypedDispatch();

  return (
    <div className="DevNotebookBox">
      <div className="devStateList">{parseState('notebook', notes, dispatch)}</div>
    </div>
  );
};

export default DevNotebookBox;
