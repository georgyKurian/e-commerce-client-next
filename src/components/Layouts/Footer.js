import Link from 'next/link';

const cssClasses = {};
const currentYear = new Date().getFullYear();
const Footer = () => (
  <footer className="h-32 py-5 text-xs outer-wrap bg-themeGray-200 text-themeGray-600">
    <div className="inner-wrap">
      <div>
        <Link href="/">
          <a className={cssClasses}>F1</a>
        </Link>
        <Link href="/about">
          <a className={cssClasses}>F2</a>
        </Link>
      </div>
      <div className="w-full pt-1 border-t border-themeGray-500">
        <span className="block text-themeGray-500">
          Copyright ©
          {' '}
          {currentYear}
          {' '}
          Georgi. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
