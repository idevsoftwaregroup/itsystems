export const Succeed = (message, data) => {
  return {
    success: true,
    message: message ? message : "عملیات با موفقیت انجام شد",
    exMessage: null,
    data: data ? data : null,
  };
};
export const Failed = (message, exMessage, data) => {
  return {
    success: false,
    message: message ? message : "عملیات با مشکل مواجه شده است",
    exMessage: exMessage ? exMessage : null,
    data: data ? data : null,
  };
};
