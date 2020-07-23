import Link from 'next/link';
import PropTypes from 'prop-types';

const MobileMenu = ({
  isAdmin, isLoggedIn, onClose, isMenuClosing,
}) => (
  <section className={`mobile-fly-in-menu ${isMenuClosing ? 'close' : ''}`}>
    <header className="relative flex items-center justify-center h-16 px-5">
      <span>LOGO</span>
      <button type="button" onClick={onClose} className="absolute right-0 p-2 mr-1">X</button>
    </header>
    <nav aria-label="Shop Navigation">
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
      {isAdmin && (
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
      {isLoggedIn ? (
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
  </section>
);

MobileMenu.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMenuClosing: PropTypes.bool.isRequired.isRequired,
};

export default MobileMenu;
