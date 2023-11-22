import React, {CSSProperties} from 'react';
import classNames from 'classnames';
import {getNotesIndex, INotebookNoteId} from '../../notebookSlice';
import Poi from '../../../Poi/Poi';
import './styles/Note.scss';
import {TImagePath} from '../../../commons/types/types';
import {useTypedSelector} from '../../../redux/store';

interface INote {
  id: INotebookNoteId;
  image?: TImagePath;
  style: CSSProperties;
  done?: boolean;
}

const Note: React.FC<INote> = ({id, image, style, done, children}) => {
  const noteIndex = useTypedSelector(state => getNotesIndex(state, id));

  const when = noteIndex !== -1;
  const classes = classNames('Note', done && 'Note--done');

  const styleCombined = {
    order: noteIndex,
    ...style,
  };

  return (
    <Poi id={id} image={image} style={styleCombined} className={classes} when={when}>
      {children}
    </Poi>
  );
};

export default Note;
