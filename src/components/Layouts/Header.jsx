import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes, { element } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import HamburgerIcon from '../../images/icons/hamburger-icon.svg';
import ShoppingBag from '../../images/icons/shopping-bag.svg';
import SearchIcon from '../../images/icons/search-icon.svg';
import MobileMenu from './MobileMenu';

const linkDataList = [
  'help',
  'exchanges & returns',
  'order tracker',
  'newsletter signup',
  'creators club',
];

const Header = ({
  children, isFixed, itemsInCart, pageWrapperElement,
}) => {
  const [scrollY, setScrollY] = useState({ offset: 0, isGoingUp: true });
  const [isButtonToggled, setButtonToggled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuClosing, setMenuClosing] = useState(false);

  const user = useSelector((state) => state.auth?.user);

  function handleScroll() {
    const currentScrollPos = window.pageYOffset;
    if (scrollY.offset > currentScrollPos) {
      setScrollY({ offset: currentScrollPos, isGoingUp: true });
    } else {
      setScrollY({ offset: currentScrollPos, isGoingUp: false });
    }
  }

  function handleSearchToggleClick() {
    setButtonToggled(true);
  }

  function handleMenuOpenButtonClick() {
    setMenuOpen(true);
    pageWrapperElement.current.classList.add('fixed');
  }

  function handleMenuCloseButtonClick() {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 1000);

    pageWrapperElement.current.classList.remove('fixed');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header>
      {isMenuOpen
      && (
      <MobileMenu
        {...user}
        isMenuClosing={isMenuClosing}
        onClose={handleMenuCloseButtonClick}
      />
      )}
      <div className={`${isFixed ? 'fixed top-0 z-10' : ''} top-menu-bar ${!scrollY.isGoingUp ? 'hide' : ''} w-full xl:px-10 border-b border-gray-400 outer-wrap bg-white`}>
        <div className="">
          <nav className="justify-end hidden w-full lg:flex" aria-label="Secondary Navigation">
            <ul className="flex text-xs">
              {linkDataList.map((linkData) => (
                <li key={linkData}>
                  <Link href="/">
                    <a className="flex items-center h-8 px-3 text-gray-800 lowercase">{linkData}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center justify-between">
            <nav className="flex-1">
              <button aria-label="Open the menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu" className="overflow-hidden text-gray-800 lg:hidden" type="button" onClick={handleMenuOpenButtonClick}>
                <HamburgerIcon aria-hidden="true" className="w-16 h-12 p-3 stroke-current" />
              </button>
            </nav>
            <div>
              <div className="inset-y-0 left-0 flex items-center ml-5 lg:absolute">
                <span className="text-lg lg:text-5xl">LOGO</span>
                <span className="sr-only">Company Name</span>
              </div>
            </div>

            <div className="hidden lg:flex">
              <nav className="top-menu" aria-label="Shop Navigation">
                <div>
                  <Link href="/">
                    <a className="">Home</a>
                  </Link>
                </div>
                <div>
                  <Link href="/category/[categoryName]" as="/category/shoes">
                    <a>#Shoes</a>
                  </Link>
                </div>
                {user?.isAdmin && (
                <>
                  <div>
                    <Link href="/admin/users">
                      <a>Users</a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/admin/products">
                      <a>Products</a>
                    </Link>
                  </div>
                </>
                )}
                {user?.isLoggedIn ? (
                  <>
                    <div>
                      <Link href="/orders">
                        <a>Orders</a>
                      </Link>
                    </div>

                    <div>
                      <Link href="/logout">
                        <a>Logout</a>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
            <div className="flex justify-end flex-1">
              <div className="flex items-center">
                <div className="relative hidden mr-5 lg:block">
                  <form>
                    <>
                      <input aria-label="Search " className="h-8 pl-3 pr-8 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-sm" type="text" placeholder="To be implemented!" />
                      <button className="absolute right-0 px-2 py-2 mx-1 text-white" type="submit"><img src="/search-icon.svg" alt="Search Icon" /></button>
                    </>
                  </form>
                </div>
                <button type="button" className="p-2 mr-2 lg:hidden" onClick={handleSearchToggleClick}>
                  <SearchIcon role="img" aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>

              <Link href="/cart">
                <a className="flex items-center mr-5">
                  <div className="relative">
                    <ShoppingBag role="img" aria-label="Shopping Bag" className="inline w-8 h-8 p-1 text-gray-700 fill-current" />
                    {itemsInCart >= 1 ? (
                      <>
                        {' '}
                        <div className="absolute inset-y-0 right-0">
                          <div className="flex items-center justify-center w-4 h-4 -mr-1 text-xs text-center text-white bg-red-700 rounded-full leading-5">
                            {itemsInCart}
                          </div>
                        </div>
                      </>
                    ) : null }
                  </div>
                </a>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <div className={(isFixed) ? 'w-full mt-16 lg:mt-16 xl:mt-16' : ''} />
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  itemsInCart: PropTypes.number,
  isFixed: PropTypes.bool,
  pageWrapperElement: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(element) }),
  ]).isRequired,
};

Header.defaultProps = {
  children: null,
  itemsInCart: 0,
  isFixed: true,
};

export default connect(({ cart: { items: cartItems } }) => {
  const totalQuantity = cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0);
  return {
    itemsInCart: totalQuantity,
  };
})(Header);
