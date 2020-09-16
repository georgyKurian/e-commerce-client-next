import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import SVGDownKey from '../../images/icons/keyboard_arrow_down.svg';

const DropDown = ({ isRight, buttonText, children }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const buttonRef = useRef();

  const handleDropDownOpen = () => {
    setIsDropDownOpen(true);
  };

  const handleDropDownClose = () => {
    setIsDropDownOpen(false);
  };

  useEffect(() => {
    if (isDropDownOpen) {
      document.addEventListener('click', handleDropDownClose);
    } else {
      document.removeEventListener('click', handleDropDownClose);
    }
    return () => { document.removeEventListener('click', handleDropDownClose); };
  }, [isDropDownOpen]);

  const handleKeyPress = useCallback((e) => {
    switch (e.key) {
      case 'Escape':
        handleDropDownClose();
        e.stopPropagation();
        e.preventDefault();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        handleDropDownOpen();
        e.stopPropagation();
        e.preventDefault();
        break;
      case 'Tab':
        handleDropDownClose();
        break;
      default:
    }
  }, [handleDropDownClose, handleDropDownOpen]);

  return (
    <li className="relative py-1" onKeyDown={handleKeyPress}>
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={isDropDownOpen}
        type="button"
        className={`relative flex items-center bg-white px-4 py-2 uppercase border border-transparent focus:outline-none ${isDropDownOpen ? 'z-20 border-black border-b-transparent' : 'focus:border-black hover:border-black'}`}
        onClick={handleDropDownOpen}
      >
        <span className="text-sm tracking-wider text-gray-700">{buttonText}</span>
        <SVGDownKey className={`w-2 h-2 ml-2 -mt-1 ${isDropDownOpen ? 'transform rotate-180' : ''}`} />
      </button>

      <div className={`absolute border border-black ${isRight ? 'left-0' : 'right-0'} z-10 bg-white -mt-px ${isDropDownOpen ? 'block' : 'hidden'}`}>
        <FocusLock disabled={!isDropDownOpen} returnFocus>
          {children}
        </FocusLock>
      </div>
    </li>
  );
};
DropDown.propTypes = {
  isRight: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

DropDown.defaultProps = {
  isRight: true,
};
export default DropDown;
