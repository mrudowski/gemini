import React from 'react';

export const StateKey = ({stateType, keyName, onClick, expanded}) => {
  if (stateType === 'arrayElement') {
    return <span>[{keyName}]</span>;
  }
  if (keyName === '0' && stateType === 'parent') {
    return <span>object</span>;
  }

  if (stateType === 'parent') {
    return (
      <span onClick={onClick}>
        {expanded ? '[+]' : '[-]'} {keyName}
      </span>
    );
  }

  return <span>{keyName}</span>;
};
