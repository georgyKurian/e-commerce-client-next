import {
  useCallback, useState, useEffect, useRef,
} from 'react';

export default function useRoveFocus(size, initialValue = 0) {
  const [currentFocus, setCurrentFocus] = useState(initialValue);
  const ref = useRef();

  const handleKeyDown = useCallback(
    (e) => {
      const lastIndex = size - 1;
      switch (e.key) {
        case 'Home':
          setCurrentFocus(0);
          e.stopPropagation();
          e.preventDefault();
          break;
        case 'End':
          setCurrentFocus(lastIndex);
          e.stopPropagation();
          e.preventDefault();
          break;
        case 'ArrowDown':
          setCurrentFocus(currentFocus === lastIndex ? 0 : currentFocus + 1);
          e.stopPropagation();
          e.preventDefault();
          break;
        case 'ArrowUp':
          setCurrentFocus(currentFocus === 0 ? lastIndex : currentFocus - 1);
          e.stopPropagation();
          e.preventDefault();
          break;
        default:
      }
    },
    [size, currentFocus, setCurrentFocus],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('keydown', handleKeyDown, false);
      return () => {
        ref.current.removeEventListener('keydown', handleKeyDown, false);
      };
    }
    return null;
  }, [handleKeyDown, ref.current]);

  return [currentFocus, ref, setCurrentFocus];
}
