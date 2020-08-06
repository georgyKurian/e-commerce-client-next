import {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { PropTypes } from 'prop-types';

const MenuBar = ({ children }) => {
  const [isFixed, setFixed] = useState(false);
  const refMenu = useRef(null);

  const scrollObserver = useCallback((node) => {
    new IntersectionObserver((entries) => {
      entries.forEach((eachEntry) => {
        if (eachEntry.intersectionRatio < 0) {
          setFixed(true);
        }
      },
      {
        threshold: 0,
      });
    }).observe(node);
  }, [isFixed]);

  useEffect(() => {
    scrollObserver(refMenu);
  }, [scrollObserver, refMenu]);

  return (
    <div className={`w-full border-y ${isFixed ? 'fixed top-0' : ''}`} ref={refMenu}>
      {children}
    </div>
  );
};

MenuBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default MenuBar;
