import React from 'react';
import NotebookDefinition from '../../engine/notebook/components/NotebookDefinition/NotebookDefinition';
import NotebookPage from '../../engine/notebook/components/NotebookPage/NotebookPage';
import RoomNotesBooks from './notes/RoomNotesBooks';

const Notebook = () => {
  return (
    <NotebookDefinition>
      <NotebookPage type="looseNotes">
        <RoomNotesBooks />
      </NotebookPage>

      <NotebookPage type="todoList"></NotebookPage>

      <NotebookPage type="culinaryRecipes"></NotebookPage>

      <NotebookPage type="memories"></NotebookPage>
    </NotebookDefinition>
  );
};

export default Notebook;
