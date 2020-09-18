import { useMediaQuery } from 'react-responsive';

const SM_SCREEN = 640;
const MD_SCREEN = 960;

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: MD_SCREEN });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: SM_SCREEN, maxWidth: MD_SCREEN - 1 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: SM_SCREEN - 1 });
  return isMobile ? children : null;
};
const TabletAndDesktop = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: MD_SCREEN });
  return isNotMobile ? children : null;
};

const MobileAndTablet = ({ children }) => {
  const isNotMobile = useMediaQuery({ maxWidth: MD_SCREEN - 1 });
  return isNotMobile ? children : null;
};

export {
  Desktop, Tablet, Mobile, TabletAndDesktop, MobileAndTablet,
};
