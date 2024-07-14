import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, width, show, onHide, title }) => {
  const onHideHandler = async () => {
    await onHide();
  };
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 z-[100] bg-gray-800 bg-opacity-50 backdrop-blur-[2px] justify-center items-center`}
          dir="rtl"
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 1, display: "flex" }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div
            className={`${
              width ? width : "w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px]"
            } bg-gray-50 rounded-[16px] shadow-lg flex flex-col gap-y-1`}
          >
            <div className="w-full flex justify-between items-center p-3 rounded-t-[16px] border-b border-gray-300">
              <div className="w-[calc(100%-30px)] font-theme-bold text-gray-800">
                {title ? title : ""}
              </div>
              <button
                onClick={async () => await onHideHandler()}
                className="p-0 flex justify-center items-center !outline-none !border-none bg-transparent transition-all duration-200 hover:bg-gray-300 w-[25px] h-[25px] rounded-full border"
              >
                <IoMdClose size={20} className="text-gray-800" />
              </button>
            </div>
            <div className="p-3 min-h-[calc(20dvh)]  max-h-[calc(75dvh)] overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
