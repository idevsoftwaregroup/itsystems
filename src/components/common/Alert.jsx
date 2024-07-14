import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../redux/features/alert/alertSlice";

const Alert = () => {
  const { state, title, message } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const hideAlertHandler = () => {
    dispatch(hideAlert());
  };
  useEffect(() => {
    if (state) {
      const timeout = setTimeout(() => {
        hideAlertHandler();
      }, 2500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state]);

  const getDataByState = () => {
    switch (state) {
      case "success":
        return {
          backgroundClass: "bg-gradient-to-tr from-green-700 to-green-500",
          colorClass: "text-white",
          icon: (
            <IoMdCheckmarkCircleOutline className="text-white text-[22px] md:text-[23px] drop-shadow-md" />
          ),
          backUpTitle: "عملیات موفق",
          backUpMessage: "عملیات با موفقیت انجام شد.",
        };
      case "error":
        return {
          backgroundClass: "bg-gradient-to-tr from-red-700 to-red-500",
          colorClass: "text-white",
          icon: (
            <CgDanger className="text-white text-[22px] md:text-[23px] drop-shadow-md" />
          ),
          backUpTitle: "عملیات ناموفق",
          backUpMessage: "عملیات با مشکل مواجه شده است.",
        };
      case "warning":
        return {
          backgroundClass: "bg-gradient-to-tr from-amber-500 to-yellow-400",
          colorClass: "text-slate-800",
          icon: (
            <IoWarningOutline className="text-slate-700 text-[22px] md:text-[23px] drop-shadow-md" />
          ),
          backUpTitle: "هشدار",
          backUpMessage: "عملیات موفق بوده، اما با هشدار مواجه شده است.",
        };
      default:
        return {
          backgroundClass: "",
          colorClass: "",
          icon: null,
          backUpTitle: "",
          backUpMessage: "",
        };
    }
  };

  return state ? (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed z-[150] bottom-[30px] w-[90%] sm:w-[500px] lg:w-[600px] sm:right-[30px] select-none"
      dir="rtl"
      initial={{ opacity: 0, display: "none" }}
      animate={{ opacity: 1, display: "flex" }}
      transition={{
        duration: 0.9,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <AnimatePresence mode="wait">
        {state && (
          <motion.div
            tabIndex="-1"
            aria-hidden="true"
            initial={{ opacity: 0, display: "none" }}
            animate={{ opacity: 1, display: "flex" }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={`${
              getDataByState().backgroundClass
            } rounded-xl py-2 px-3 shadow-lg flex flex-col gap-y-2`}
          >
            <div className="flex justify-between items-start gap-x-2">
              <div className="w-[calc(100%-30px)] md:w-[calc(100%-31px)] flex items-start gap-x-2">
                {getDataByState().icon}
                <div
                  className={`${
                    getDataByState().colorClass
                  } w-[calc(100%-30px)] md:w-[calc(100%-31px)] font-theme-semibold text-[14px] drop-shadow-md leading-6`}
                >
                  {title ? title : getDataByState().backUpTitle}
                </div>
              </div>
              <button
                onClick={() => hideAlertHandler()}
                className="w-[22px] h-[22px] md:w-[23x] md:h-[23px] rounded-full bg-transparent flex justify-center items-center !outline-none !border-none transition-all duration-200 hover:bg-slate-300 hover:bg-opacity-20 p-0"
              >
                <IoClose
                  className={`${
                    getDataByState().colorClass
                  } text-[19px] md:text-[20px] drop-shadow-md`}
                />
              </button>
            </div>
            <div
              className={`${
                getDataByState().colorClass
              } text-[13px] drop-shadow-md leading-6`}
            >
              {message ? message : getDataByState().backUpMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null;
};

export default Alert;
