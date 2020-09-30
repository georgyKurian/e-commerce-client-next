import FocusTrap from 'focus-trap-react';
import ClientOnlyPortal from './ClientOnlyPortal';
import CloseSvg from '../../images/icons/close.svg';

const Modal = ({ title, headerContent, children }) => (
  <ClientOnlyPortal selector="#modal">
    <div className="absolute inset-0 z-50">
      <FocusTrap>
        <div className="relative w-full h-full">
          <div className="w-full h-full bg-black opacity-75" />
          <div className="absolute inset-0 flex">
            <div className="w-full h-full mx-auto my-auto bg-white md:rounded-lg md:w-1/2 md:h-auto">
              <header className="flex items-center justify-between w-full">
                <h5 className="p-4 mb-0 uppercase">
                  {title}
                  title
                </h5>
                <div>{headerContent}</div>
                <button type="button" className="px-6 py-4">
                  <CloseSvg className="w-5 text-gray-700 fill-current" />
                </button>
              </header>
              <main style={{ minHeight: '50vh' }}>
                {children}
              </main>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  </ClientOnlyPortal>
);

export default Modal;
