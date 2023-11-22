import React from 'react';
import Note from '../../../engine/notebook/components/Note/Note';
import {useGlobalState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import NOTEBOOK_NOTES from '../notebookNotes';

const RoomNotesBooks = () => {
  const t = useTranslation();
  const {organizedNotebook} = useGlobalState();

  return (
    <Note
      id={NOTEBOOK_NOTES.roomNotesBooks}
      style={
        organizedNotebook
          ? {}
          : {
              left: 100,
              top: 60,
              width: 180,
            }
      }
    >
      {t.notebook.notes.looseNotes.roomNotesBooks}
    </Note>
  );
};

export default RoomNotesBooks;
