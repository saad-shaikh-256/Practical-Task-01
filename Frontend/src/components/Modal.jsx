import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-xl shadow-2xl animate-fade-in transform transition-all scale-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <i className="hgi hgi-stroke hgi-cancel-01 text-xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
