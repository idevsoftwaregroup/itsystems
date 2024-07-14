const Avatar = ({ data }) => {
  const name = data.firstName + " " + data.lastName;
  const fileStorage = process.env.REACT_APP_FILESTORAGE_API_URL;
  return (
    <div className="flex relative h-screen w-screen min-w-[375px] max-w-[375px] overflow-hidden mx-auto">
      <div className="object-cover w-full absolute top-0 left-0">
        <img
          src={fileStorage + data.pictureUrl}
          alt="person-image"
          className="w-full h-auto"
        />
      </div>
      {/* <div className="text-center text-yellow p-2 mt-2">پروفایل</div> */}
      <div className="object-cover w-full h-2/3 absolute bottom-0 left-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="936"
          height="1600"
          viewBox="0 0 936 1600"
          className="w-full h-auto"
        >
          <defs>
            <clipPath id="clip-Web_1920_1">
              <rect width="936" height="1600" />
            </clipPath>
          </defs>
          <g id="Web_1920_1" data-name="Web 1920 – 1">
            <path
              id="Path_1"
              data-name="Path 1"
              d="M8650.816,397.637l1,1582h-937V847.9Z"
              transform="translate(-7714.817 -379.637)"
              stroke="#707070"
            />
            <path
              id="Path_2"
              data-name="Path 2"
              d="M7681.972,894.412v-342l2.982-10.236,490.018,112.236h0"
              transform="translate(-7681.972 -422.412)"
              fill="#373737"
              stroke="#606060"
            />
            <path
              id="Path_3"
              data-name="Path 3"
              d="M7684.973,397.927V506.446l489,104.481Z"
              transform="translate(-7684.973 -379.927)"
              fill="#8a8a8a"
              stroke="#707070"
            />
          </g>
        </svg>
      </div>
      <div className="absolute inset-x-1/2 inset-y-1/2 bottom-0 transform translate-x-(-50%) h-auto flex flex-col items-center justify-center gap-4 text-stone-300">
        <h3 className="text-4xl text-nowrap">{name}</h3>
        <div className="text-stone-400 opacity-80 text-nowrap">{data.role}</div>
        <div className="flex justify-center">
          <div className="text-start text-nowrap">کد پرسنلی:</div>
          <div className="text-end ms-4 "> {data.personalCode} </div>
        </div>
        <div className="flex justify-center">
          <div className="text-start text-nowrap">تاریخ شروع همکاری:</div>
          <div className="text-start ms-4">{data.employmentDate}</div>
        </div>
        <div className="flex justify-center">
          <div className="text-start text-nowrap">محل فعالیت:</div>
          <div className="text-start text-nowrap ms-4">
            {data.activityLocation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
