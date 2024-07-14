import React from "react";
const Input = ({
  width,
  height,
  label,
  withoutLabel,
  errorText,
  withoutErrorText,
  fontSize,
  placeholder,
  name,
  id,
  disabled,
  value,
  onChange,
  rows,
  dir,
  ...props
}) => {
  return (
    <div
      className={`${
        width ? width : "w-full"
      } flex flex-col gap-y-[6px] select-none`}
    >
      {withoutLabel ? null : (
        <label className="text-[14px] text-slate-700">
          {label ? label : <>&nbsp;</>}
        </label>
      )}
      {rows ? (
        <textarea
          rows={typeof rows === "number" ? rows : 3}
          onChange={onChange}
          value={value}
          disabled={disabled}
          id={id ? id : null}
          name={name ? name : null}
          placeholder={placeholder ? placeholder : ""}
          className={`${
            fontSize ? fontSize : "text-[14px] placeholder:text-[13.5px]"
          } ${
            withoutErrorText
              ? ""
              : errorText
              ? "border-red-600"
              : "border-gray-300"
          } border !outline-none leading-6 w-full resize-none rounded-[11px] px-2 py-1.5 transition-all duration-200 placeholder:text-gray-500 disabled:bg-gray-100 disabled:text-gray-600 placeholder:text-right`}
          dir={dir ? dir : "rtl"}
          {...props}
        />
      ) : (
        <input
          onChange={onChange}
          value={value}
          disabled={disabled}
          id={id ? id : null}
          name={name ? name : null}
          placeholder={placeholder ? placeholder : ""}
          className={`${height ? height : "h-[36px]"} ${
            fontSize ? fontSize : "text-[14px] placeholder:text-[13.5px]"
          } ${
            withoutErrorText
              ? ""
              : errorText
              ? "border-red-600"
              : "border-gray-300"
          } border !outline-none w-full rounded-[11px] px-2 transition-all duration-200 placeholder:text-gray-500 disabled:bg-gray-100 disabled:text-gray-600 placeholder:text-right`}
          dir={dir ? dir : "rtl"}
          {...props}
        />
      )}

      {withoutErrorText ? null : (
        <label className="text-[12px] text-red-600">
          {errorText ? errorText : <>&nbsp;</>}
        </label>
      )}
    </div>
  );
};

export default Input;
