import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import HamburgerIcon from '../../images/icons/hamburger-icon.svg';
import ShoppingCart from '../../images/icons/shopping_cart.svg';

const cssClasses = 'text-center py-4 px-4 text-sm text-themeGray-700 hover:no-underline tracking-widest inline-block font-semibold hover:text-black hover:border-b-2 border-black';

const Header = ({ children, isFixed, itemsInCart }) => {
  const [isButtonToggled, setButtonToggled] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  function handleSearchToggleClick() {
    setButtonToggled(true);
  }

  return (
    <header className="w-full">
      <div className={`${isFixed ? 'fixed top-0 z-10' : ''} w-full  border-b border-gray-400 outer-wrap bg-white`}>
        <div className="flex flex-wrap items-center justify-center inner-wrap">
          <nav className="hidden uppercase lg:block top-menu" aria-label="Shop Navigation">
            <div>
              <Link href="/">
                <a className={cssClasses}>Home</a>
              </Link>
            </div>
            <div>
              <Link href="/shop">
                <a className={cssClasses}>Shop</a>
              </Link>
            </div>
            <div>
              <Link href="/category/[categoryName]" as="/category/shoes">
                <a className={cssClasses}>Shoes</a>
              </Link>
            </div>
            {user?.isAdmin && (
            <>
              <div>
                <Link href="/admin/users">
                  <a className={cssClasses}>Users</a>
                </Link>
              </div>
              <div>
                <Link href="/admin/products">
                  <a className={cssClasses}>Products</a>
                </Link>
              </div>
            </>
            )}
          </nav>
          <nav className="uppercase">
            {user?.isLoggedIn ? (
              <>

                <div>
                  <Link href="/orders">
                    <a className={cssClasses}>Orders</a>
                  </Link>
                </div>

                <div>
                  <Link href="/logout">
                    <a className={cssClasses}>Logout</a>
                  </Link>
                </div>
              </>
            ) : (
              <Link href="/login">
                <a className={cssClasses}>Login</a>
              </Link>
            )}
          </nav>
          <div className="relative flex items-center my-2">
            {isButtonToggled ? (
              <>
                <input aria-label="search" className="h-8 pl-3 pr-8 text-gray-700 rounded-full" type="text" placeholder="To be implemented!" />
                <button className="absolute right-0 px-2 py-2 mx-1 text-white" type="submit"><img src="/search-icon.svg" alt="Search Icon" /></button>
              </>
            )
              : (
                <button type="button" onClick={handleSearchToggleClick}><img src="/search-icon.svg" alt="Search Icon" /></button>
              )}
          </div>
          <button className="text-gray-400 lg:hidden" type="button" aria-label="Open mobile menu"><HamburgerIcon className="fill-current" /></button>
          {itemsInCart >= 0 ? (
            <Link href="/cart">
              <a className={cssClasses}>
                <div className="relative">
                  <ShoppingCart className="inline w-6 h-6 fill-current" />
                  {' '}
                  {itemsInCart > 0 ? (
                    <div className="absolute inset-y-0 right-0">
                      <div className="w-5 h-5 -mr-2 text-center text-white bg-red-700 rounded-full leading-5">
                        {itemsInCart}
                      </div>
                    </div>
                  ) : ''}
                </div>
              </a>
            </Link>
          ) : null}
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
