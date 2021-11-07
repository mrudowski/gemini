import React, {useCallback} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import CloseupWidget from './components/CloseupWidget/CloseupWidget';
import {getLookCloserSceneId} from './lookCloserActionSlice';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';

interface ICloseup {}

const Closeup: React.FC<ICloseup> = () => {
  const sceneId = useTypedSelector(getLookCloserSceneId);
  const dispatch = useTypedDispatch();
  // const [isShow, setShow] = useState(false);

  // useEffect(() => {
  //   setShow(!!closeupData);
  // }, [closeupData]);

  const onExitComplete = useCallback(() => {
    dispatch(endAction());
  }, [dispatch]);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>{sceneId && <CloseupWidget sceneId={sceneId} />}</AnimatePresence>
  );
};

export default Closeup;
