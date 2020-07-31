import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SVGDownKey from '../../images/icons/keyboard_arrow_down.svg';

const DropDown = ({ isRight, buttonText, children }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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

  return (
    <li className="relative py-1">
      <button
        type="button"
        className={`relative flex items-center bg-white z-20 px-4 py-2 uppercase border border-transparent focus:outline-none ${isDropDownOpen ? 'border-black border-b-transparent' : 'hocus:border-black hover:border-black'}`}
        onClick={handleDropDownOpen}
      >
        <span className="text-sm tracking-wider text-gray-700">{buttonText}</span>
        <SVGDownKey className={`w-2 h-2 ml-2 -mt-1 ${isDropDownOpen ? 'transform rotate-180' : ''}`} />
      </button>

      <div className={`absolute border border-black ${isRight ? 'left-0' : 'right-0'} z-10 bg-white -mt-px ${isDropDownOpen ? 'block' : 'hidden'}`}>
        {children}
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
