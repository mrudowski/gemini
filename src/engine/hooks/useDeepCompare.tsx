// import _isEqual from 'lodash.isequal';
import usePrevious from './usePrevious';

// hook to compare prev and current value (props or state)

const useDeepCompare = val => {
  const previousVal = usePrevious(val);
  return null;
  //return _isEqual(previousVal, val);
};

export default useDeepCompare;
