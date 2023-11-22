import React, {useState} from 'react';
import './styles/DevAdditionalStatesBoxes.scss';
import classNames from 'classnames';
import DevInvBox from './components/DevInvBox/DevInvBox';
import DevNotebookBox from './components/DevNotebookBox/DevNotebookBox';

interface IDevAdditionalStatesBoxes {}

const DevAdditionalStatesBoxes: React.FC<IDevAdditionalStatesBoxes> = () => {
  const [activeBox, setActiveBox] = useState<'I' | 'N' | 'H'>('I');

  return (
    <div className="devPanel DevAdditionalStatesBoxes">
      <div className="DevAdditionalStatesBoxes__header">
        <span
          onClick={() => {
            setActiveBox('I');
          }}
          className={classNames(
            'DevAdditionalStatesBoxes__header__tab',
            activeBox === 'I' && 'DevAdditionalStatesBoxes__header__tab--active'
          )}
        >
          Inv
        </span>
        <span
          onClick={() => {
            setActiveBox('N');
          }}
          className={classNames(
            'DevAdditionalStatesBoxes__header__tab',
            activeBox === 'N' && 'DevAdditionalStatesBoxes__header__tab--active'
          )}
        >
          Note
        </span>
      </div>
      {activeBox === 'I' && <DevInvBox />}
      {activeBox === 'N' && <DevNotebookBox />}
    </div>
  );
};

export default DevAdditionalStatesBoxes;
