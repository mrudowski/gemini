import React from 'react';
import {IScriptMetaWrapper} from '../../../scene/Scene/types';
import useSimpleOnEnter from '../../../commons/hooks/useSimpleOnEnter';
import {getIsNotebookReady} from '../../notebookWidgetSlice';
import {useTypedSelector} from '../../../redux/store';

interface INotebookDefinition {
  onEnter?: IScriptMetaWrapper[];
}

const NotebookDefinition: React.FC<INotebookDefinition> = ({children, onEnter}) => {
  const isNotebookReady = useTypedSelector(getIsNotebookReady);

  useSimpleOnEnter({
    onEnter,
    ready: isNotebookReady,
  });

  return <>{children}</>;
};

export default NotebookDefinition;
