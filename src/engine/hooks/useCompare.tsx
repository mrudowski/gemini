import usePrevious from './usePrevious';

// hook to compare prev and current value (props or state)

const useCompare = val => {
  const previousVal = usePrevious(val);
  return previousVal === val;
};

export default useCompare;
