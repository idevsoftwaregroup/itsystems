import axios from "axios";
import { Failed, Succeed } from "../../utilities/OperationHelper";

const baseUrl = process.env.REACT_APP_CHART_API_URL;
const controller = "SystemDetails";

export const GET = async (url) => {
  if (!url) {
    return Failed("آدرس بدرستی ارسال نشده است", null, null);
  }
  try {
    const { data } = await axios.get(
      `${baseUrl}${controller}${url.startsWith("/") ? url : `/${url}`}`
    );
    if (data && data.success !== null && data.success !== undefined) {
      if (data.success) {
        return Succeed(
          data.message ? data.message : null,
          data.object ? data.object : data.list ? data.list : null
        );
      }
      return Failed(
        data.message ? data.message : null,
        data.exMessage ? data.exMessage : null,
        data.object ? data.object : data.list ? data.list : null
      );
    }
    return Succeed("دریافت اطلاعات با موفقیت انجام شد", data);
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      return Failed(
        errorData.message ? errorData.message : null,
        errorData.exMessage ? errorData.exMessage : null,
        errorData.data ? errorData.data : null
      );
    }
    return Failed();
  }
};
export const POST = async (url, body) => {
  if (!url) {
    return Failed("آدرس بدرستی ارسال نشده است", null, null);
  }
  try {
    const { data } = await axios.post(
      `${baseUrl}${controller}${url.startsWith("/") ? url : `/${url}`}`,
      body
    );
    if (data && data.success !== null && data.success !== undefined) {
      if (data.success) {
        return Succeed(
          data.message ? data.message : null,
          data.object ? data.object : data.list ? data.list : null
        );
      }
      return Failed(
        data.message ? data.message : null,
        data.exMessage ? data.exMessage : null,
        data.object ? data.object : data.list ? data.list : null
      );
    }
    return Succeed("ثبت اطلاعات با موفقیت انجام شد", data);
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      return Failed(
        errorData.message ? errorData.message : null,
        errorData.exMessage ? errorData.exMessage : null,
        errorData.data ? errorData.data : null
      );
    }
    return Failed();
  }
};
export const PUT = async (url, body) => {
  if (!url) {
    return Failed("آدرس بدرستی ارسال نشده است", null, null);
  }
  try {
    const { data } = await axios.put(
      `${baseUrl}${controller}${url.startsWith("/") ? url : `/${url}`}`,
      body
    );
    if (data && data.success !== null && data.success !== undefined) {
      if (data.success) {
        return Succeed(
          data.message ? data.message : null,
          data.object ? data.object : data.list ? data.list : null
        );
      }
      return Failed(
        data.message ? data.message : null,
        data.exMessage ? data.exMessage : null,
        data.object ? data.object : data.list ? data.list : null
      );
    }
    return Succeed("بروزرسانی اطلاعات با موفقیت انجام شد", data);
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      return Failed(
        errorData.message ? errorData.message : null,
        errorData.exMessage ? errorData.exMessage : null,
        errorData.data ? errorData.data : null
      );
    }
    return Failed();
  }
};
export const DELETE = async (url, body) => {
  if (!url) {
    return Failed("آدرس بدرستی ارسال نشده است", null, null);
  }
  try {
    const { data } = await axios.delete(
      `${baseUrl}${controller}${url.startsWith("/") ? url : `/${url}`}`,
      {
        data: body,
      }
    );
    if (data && data.success !== null && data.success !== undefined) {
      if (data.success) {
        return Succeed(
          data.message ? data.message : null,
          data.object ? data.object : data.list ? data.list : null
        );
      }
      return Failed(
        data.message ? data.message : null,
        data.exMessage ? data.exMessage : null,
        data.object ? data.object : data.list ? data.list : null
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      return Failed(
        errorData.message ? errorData.message : null,
        errorData.exMessage ? errorData.exMessage : null,
        errorData.data ? errorData.data : null
      );
    }
    return Failed();
  }
};
// Function to fetch all systems
export const getAllSystems = async () => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_CHART_API_URL}${controller}/GetAllSystems`);
    if (data && data.success !== null && data.success !== undefined) {
      if (data.success) {
        return Succeed(
          data.message ? data.message : null,
          data.object ? data.object : data.list ? data.list : null
        );
      }
      return Failed(
        data.message ? data.message : null,
        data.exMessage ? data.exMessage : null,
        data.object ? data.object : data.list ? data.list : null
      );
    }
    return Succeed("دریافت اطلاعات با موفقیت انجام شد", data);
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      return Failed(
        errorData.message ? errorData.message : null,
        errorData.exMessage ? errorData.exMessage : null,
        errorData.data ? errorData.data : null
      );
    }
    return Failed();
  }
};