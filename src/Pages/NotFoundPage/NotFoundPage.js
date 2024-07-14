import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-full sm:w-[80%] md:w-[70%] xl:w-[65%] flex flex-col justify-center items-center">
      <img
        alt="404 page not found"
        src="/404-NotFound.svg"
        className="w-[75%] sm:w-[400px] md:w-[500px] lg:w-[550px]"
      />
      <div className="text-lg text-[#263238] mt-[-1em]">
        صفحه مورد نظر پیدا نشد
      </div>
    </div>
  );
};

export default NotFoundPage;
