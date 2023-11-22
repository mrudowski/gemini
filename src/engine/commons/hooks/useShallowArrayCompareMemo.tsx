import _isEqual from 'lodash.isequal';
import useCustomCompareMemo from './useCustomCompareMemo';

function useShallowArrayCompareMemo<T>(value: T): T {
  return useCustomCompareMemo(value, _isEqual);
}

export default useShallowArrayCompareMemo;
