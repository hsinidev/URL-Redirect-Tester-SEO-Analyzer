
import React, { useState } from 'react';
import Modal from './Modal';
import { MODAL_CONTENT } from '../constants';

type ModalType = keyof typeof MODAL_CONTENT | null;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);
  
  const navLinks: { label: string; modal: ModalType }[] = [
    { label: "About", modal: "about" },
    { label: "Contact", modal: "contact" },
    { label: "Guide", modal: "guide" },
    { label: "Privacy Policy", modal: "privacy" },
    { label: "Terms of Service", modal: "tos" },
    { label: "DMCA", modal: "dmca" },
  ];

  return (
    <div className="relative min-h-screen font-sans text-gray-200 bg-black">
      {/* Animated Galaxy Background */}
      <div className="galaxy-bg">
        <div className="nebula"></div>
        <div className="stars stars1"></div>
        <div className="stars stars2"></div>
        <div className="stars stars3"></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-4 px-4 sm:px-6">
          <nav className="container mx-auto flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => openModal(link.modal)}
                className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </header>
        
        <div className="flex-grow">
          {children}
        </div>

        <footer className="py-6 text-center text-sm text-gray-400">
          <div className="container mx-auto">
            <p className="mb-2">
              <span className="font-bold" style={{ color: '#FFD700' }}>Powered by HSINI MOHAMED</span> | 
              <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-purple-400 transition-colors">
                 GitHub
              </a>
            </p>
            <p>
              <a href="mailto:hsini.web@gmail.com" className="hover:text-purple-400 transition-colors">hsini.web@gmail.com</a>
              <span className="mx-2">|</span>
              <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">doodax.com</a>
            </p>
          </div>
        </footer>
      </div>

      {activeModal && (
        <Modal 
          isOpen={!!activeModal} 
          onClose={closeModal} 
          title={MODAL_CONTENT[activeModal].title}
        >
          {MODAL_CONTENT[activeModal].content}
        </Modal>
      )}
    </div>
  );
};

export default Layout;
