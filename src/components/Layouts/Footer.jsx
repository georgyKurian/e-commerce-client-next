import Link from 'next/link';

const cssClasses = 'px-4 border-r border-themeGray-500 text-themeGray-500 last:border-0';
const currentYear = new Date().getFullYear();
const Footer = () => (
  <footer className="h-32 py-5 text-xs outer-wrap bg-themeGray-800">
    <div className="flex justify-center inner-wrap">
      <div className="">
        <Link href="/">
          <a className={cssClasses}>F1</a>
        </Link>
        <Link href="/about">
          <a className={cssClasses}>F2</a>
        </Link>
        <span className={cssClasses}>
          {`© ${currentYear} georgi`}
        </span>

      </div>
    </div>
  </footer>
);

export default Footer;
