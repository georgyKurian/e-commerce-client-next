import {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { PropTypes } from 'prop-types';

const MenuBar = ({ children, className }) => {
  const [scrollY, setScrollY] = useState({ offset: 0, isGoingUp: true });
  const [isFixed, setFixed] = useState(false);
  const refMenu = useRef(null);

  function handleScroll() {
    const currentScrollPos = window.pageYOffset;
    if (scrollY.offset > currentScrollPos) {
      setScrollY({ offset: currentScrollPos, isGoingUp: true });
    } else {
      setScrollY({ offset: currentScrollPos, isGoingUp: false });
    }
  }

  const getScrollObserver = useCallback(
    () => new IntersectionObserver((entries) => {
      entries.forEach((eachEntry) => {
        if (eachEntry.intersectionRatio < 1) {
          setFixed(true);
        } else if (eachEntry.intersectionRatio === 1) {
          setFixed(false);
        }
      });
    },
    {
      threshold: 1,
      rootMargin: '-15px 0px 0px 0px',
    }),
  );

  useEffect(() => {
    let currentObserver;
    if (!currentObserver) {
      currentObserver = getScrollObserver();
    }
    currentObserver.disconnect();
    if (refMenu.current) {
      currentObserver.observe(refMenu.current);
    }
    return () => currentObserver?.disconnect();
  }, [refMenu]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="relative h-12">
      <div ref={refMenu} className="absolute w-full h-full" />
      <div className={`bg-white z-40 border-t border-b border-gray-500 ${className} ${isFixed ? 'fixed border inset-x-0 transition duration-300 delay-200 ease-in-out' : ''} ${scrollY.isGoingUp && isFixed ? 'transform translate-y-20' : ''}`} style={{ top: '10px' }}>
        {children}
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

MenuBar.defaultProps = {
  className: '',
};

export default MenuBar;
